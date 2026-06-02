import {
  GLOSSARY,
  ghBlob,
  REPO_ROOT,
  buildModelingRecommendation,
  buildOptimizationRecommendation,
  buildProcessRecommendation,
  buildControlRecommendation,
  buildFDDRecommendation,
  buildRULRecommendation,
  FURTHER_READING,
  getRepoArticleAlignment,
} from "./data.js";

/** @typedef {Record<string, string>} State */

const state = /** @type {State} */ ({});

const GENAI_GPT_URL =
  "https://chatgpt.com/g/g-698618895c2481919e113c49bafe23ee-fundamentals-of-ai-for-pe";

/** @type {ReturnType<typeof computeResults> | null} */
let lastRec = null;

let stepIndex = 0;
/** @type {string[]} */
let flow = [];

function el(id) {
  const n = document.getElementById(id);
  if (!n) throw new Error(`Missing #${id}`);
  return n;
}

function buildFlow() {
  const f = ["phase"];
  if (!state.phase) return f;

  if (state.phase === "design") {
    f.push("design_goal");
    if (state.designGoal === "modeling") {
      f.push("model_in", "model_out", "model_scarce");
    } else if (state.designGoal === "optimization") {
      f.push("opt_dim");
      if (state.optDim === "high") f.push("rl_space");
      else if (state.optDim === "low") f.push("opt_moo", "opt_space");
    } else if (state.designGoal === "process") {
      f.push("process_kind");
    }
  } else if (state.phase === "control") {
    f.push("control_mode");
    if (state.controlMode === "controller") {
      f.push("control_policy", "control_deploy");
    } else if (state.controlMode === "assist") {
      f.push("assist_branch");
      if (state.assistBranch === "modeling") {
        f.push("model_in", "model_out", "model_scarce");
      } else if (state.assistBranch === "optimization") {
        f.push("opt_dim");
        if (state.optDim === "high") f.push("rl_space");
        else if (state.optDim === "low") f.push("opt_moo", "opt_space");
      }
    }
  } else if (state.phase === "maintenance") {
    f.push("maint_kind");
    if (state.maintKind === "fdd") {
      f.push("fdd_sup");
      if (state.fddSup === "labeled") {
        f.push("fdd_task", "fdd_modality");
      } else if (state.fddSup === "unlabeled" || state.fddSup === "ssl") {
        f.push("fdd_modality");
      }
    } else if (state.maintKind === "sid") {
      f.push("sid_in", "sid_out", "sid_scarce");
    } else if (state.maintKind === "rul") {
      f.push("rul_in", "rul_prob");
    }
  }
  return f;
}

function currentStepId() {
  return flow[stepIndex] || "phase";
}

function renderProgress() {
  const ol = el("progress-steps");
  ol.innerHTML = "";
  const labels = {
    phase: "1. Lifecycle",
    design_goal: "2. Design goal",
    model_in: "Input modality",
    model_out: "Output modality",
    model_scarce: "Data availability",
    opt_dim: "Optimization scale",
    rl_space: "RL action space",
    opt_moo: "Objectives",
    opt_space: "Search space",
    process_kind: "Automation type",
    control_mode: "2. Control role",
    control_policy: "Policy type",
    control_deploy: "Deployment",
    assist_branch: "Assist target",
    maint_kind: "2. Maintenance task",
    fdd_sup: "Supervision",
    fdd_task: "FDD task",
    fdd_modality: "Data modality",
    sid_in: "SID input",
    sid_out: "SID output",
    sid_scarce: "SID data",
    rul_in: "RUL inputs",
    rul_prob: "Uncertainty",
  };
  flow.forEach((id, i) => {
    const li = document.createElement("li");
    li.textContent = labels[id] || id;
    if (i === stepIndex) li.classList.add("active");
    ol.appendChild(li);
  });
}

/**
 * Render `\(...\)`, `\[...\]`, `$...$`, and `$$...$$` with KaTeX when available.
 * @param {string} html
 */
function renderMath(html) {
  const renderTex = (tex, displayMode) => {
    const trimmed = tex.trim();
    const katexLib = typeof window !== "undefined" ? window.katex : null;
    if (katexLib) {
      try {
        return katexLib.renderToString(trimmed, {
          displayMode,
          throwOnError: false,
          strict: "ignore",
        });
      } catch {
        /* fall through */
      }
    }
    const fallback = escapeHtml(trimmed);
    return displayMode
      ? `<span class="math-fallback math-display">${fallback}</span>`
      : `<span class="math-fallback math-inline">${fallback}</span>`;
  };

  return String(html)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => `<span class="math-display">${renderTex(tex, true)}</span>`)
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, tex) => `<span class="math-display">${renderTex(tex, true)}</span>`)
    .replace(/\\\(([\s\S]+?)\\\)/g, (_, tex) => renderTex(tex, false))
    .replace(/(^|[^\\$])\$([^$\n]+?)\$(?!\$)/g, (_, prefix, tex) => `${prefix}${renderTex(tex, false)}`);
}

/**
 * Convert **bold** and *italic* to HTML. If `html` is true, string may already contain tags — only apply markdown spans.
 * @param {string} raw
 * @param {{ html?: boolean }} [opts]
 */
function formatRichText(raw, opts = {}) {
  if (raw == null) return "";
  const s = String(raw);
  const escaped = opts.html
    ? s
    : s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return applyInlineMarkdown(renderMath(escaped));
}

/** @param {string} s */
function applyInlineMarkdown(s) {
  return String(s)
    .replace(/\*\*([\s\S]+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+?)\*([^*]|$)/g, "$1<em>$2</em>$3");
}

function tooltipHtml(key) {
  const raw = GLOSSARY[key] || "";
  return formatRichText(raw);
}

function bindTooltips(container) {
  container.querySelectorAll(".help-trigger").forEach((btn) => {
    const k = btn.getAttribute("data-glossary");
    const tip = k ? tooltipHtml(k) : "";
    const layer = el("tooltip-layer");

    const show = (e) => {
      btn.setAttribute("aria-expanded", "true");
      layer.innerHTML = `<div class="tooltip-bubble" role="tooltip">${tip}</div>`;
      const bubble = layer.querySelector(".tooltip-bubble");
      const rect = btn.getBoundingClientRect();
      const x = Math.min(rect.left, window.innerWidth - 440);
      const y = rect.bottom + 8;
      layer.style.left = `${Math.max(8, x)}px`;
      layer.style.top = `${y}px`;
      layer.style.pointerEvents = "none";
    };
    const hide = () => {
      btn.setAttribute("aria-expanded", "false");
      layer.innerHTML = "";
    };
    btn.addEventListener("mouseenter", show);
    btn.addEventListener("mouseleave", hide);
    btn.addEventListener("focus", show);
    btn.addEventListener("blur", hide);
  });
}

function fieldLabel(text, glossaryKey) {
  return `
    <div class="field-label">
      <span>${text}</span>
      <button type="button" class="help-trigger" data-glossary="${glossaryKey}" aria-label="Explain ${text}" aria-expanded="false">?</button>
    </div>`;
}

function optionRow(name, value, title, desc, checked = false) {
  return `
    <label class="option">
      <input type="radio" name="${name}" value="${value}" ${checked ? "checked" : ""} />
      <span class="option-body">
        <strong>${title}</strong>
        <span>${desc}</span>
      </span>
    </label>`;
}

function renderStep() {
  const id = currentStepId();
  const container = el("step-container");
  let html = "";

  const mk = (title, inner) => {
    html += `<h2 class="step-title">${title}</h2>${inner}`;
  };

  if (id === "phase") {
    mk(
      "Where are you in the power-electronics lifecycle?",
      `${fieldLabel("Lifecycle phase", "phase")}
      <div class="options" role="radiogroup">
        ${optionRow("phase", "design", "Design", "Surrogate modeling, optimization, or simulation/agentic automation")}
        ${optionRow("phase", "control", "Control", "Learned controllers or assistive control design")}
        ${optionRow("phase", "maintenance", "Maintenance", "FDD, system identification, or RUL")}
      </div>`
    );
  } else if (id === "design_goal") {
    mk(
      "What is your design-phase goal?",
      `${fieldLabel("Goal", "design_goal")}
      <div class="options">
        ${optionRow("designGoal", "modeling", "Surrogate modeling", "Learn mappings between inputs and outputs (metrics, waveforms, fields)")}
        ${optionRow("designGoal", "optimization", "Optimization", "Tune parameters with MHAs or RL")}
        ${optionRow("designGoal", "process", "Process automation", "Batch simulations or agentic AI workflows")}
      </div>`
    );
  } else if (id === "model_in" || id === "sid_in") {
    const name = id === "model_in" ? "modelIn" : "sidIn";
    mk(
      id === "model_in" ? "Modeling: input data modality" : "System ID: input modality",
      `${fieldLabel("Input modality", "io_modality_in")}
      <div class="options">
        ${optionRow(name, "tabular", "Tabular", "Design variables, ratings, operating conditions as columns")}
        ${optionRow(name, "signal", "Signal-domain", "Waveforms or spectra (scopes, analyzers)")}
        ${optionRow(name, "graph", "Graph", "Topology, PCB, module connectivity")}
        ${optionRow(name, "field", "Field", "2D/3D multi-physics grids")}
        ${optionRow(name, "hybrid", "Hybrid", "Mix of tabular, signal, graph, field…")}
      </div>`
    );
  } else if (id === "model_out" || id === "sid_out") {
    const name = id === "model_out" ? "modelOut" : "sidOut";
    mk(
      id === "model_out" ? "Modeling: output modality" : "System ID: output modality",
      `${fieldLabel("Output modality", "io_modality_out")}
      <div class="options">
        ${optionRow(name, "tabular", "Tabular", "Scalars or small vectors (efficiency, ripple, loss)")}
        ${optionRow(name, "signal", "Signal-domain", "Predicted waveforms or spectra")}
        ${optionRow(name, "graph", "Graph", "Generated or corrected graphs (topology, layout)")}
        ${optionRow(name, "field", "Field", "Spatial field maps")}
        ${optionRow(name, "hybrid", "Hybrid", "Multiple simultaneous output types")}
      </div>`
    );
  } else if (id === "model_scarce" || id === "sid_scarce") {
    const name = id === "model_scarce" ? "modelScarce" : "sidScarce";
    mk(
      "How abundant is labeled data?",
      `${fieldLabel("Supervised data", "data_abundance")}
      <div class="options">
        ${optionRow(name, "0", "Abundant", "Enough labels for supervised training across operating space")}
        ${optionRow(name, "1", "Scarce", "Few labels — need augmentation, physics, or transfer")}
      </div>`
    );
  } else if (id === "opt_dim") {
    mk(
      "Optimization problem size",
      `${fieldLabel("Dimensionality", "opt_dimension")}
      <div class="options">
        ${optionRow("optDim", "low", "Low-dimensional", "Typical converter parameter vectors — MHAs (paths 54–59)")}
        ${optionRow("optDim", "high", "High-dimensional (>100D)", "Large policy vectors — deep RL (paths 51–53)")}
      </div>`
    );
  } else if (id === "rl_space") {
    mk(
      "RL action space type",
      `${fieldLabel("Action space", "opt_space")}
      <div class="options">
        ${optionRow("rlSpace", "cont", "Continuous", "DDPG, SAC, …")}
        ${optionRow("rlSpace", "disc", "Discrete", "DQN, …")}
        ${optionRow("rlSpace", "hyb", "Hybrid", "Parameterized action spaces")}
      </div>`
    );
  } else if (id === "opt_moo") {
    mk(
      "Single vs multiple objectives",
      `${fieldLabel("Objectives", "opt_objectives")}
      <div class="options">
        ${optionRow("optMoo", "0", "Single objective", "One scalar cost / figure of merit")}
        ${optionRow("optMoo", "1", "Multi-objective", "Pareto trade-offs (efficiency, volume, cost, …)")}
      </div>`
    );
  } else if (id === "opt_space") {
    mk(
      "Search space structure",
      `${fieldLabel("Variable types", "opt_space")}
      <div class="options">
        ${optionRow("optSpace", "cont", "Continuous", "PSO, DE (single-obj) or NSGA-II/MOSPO (multi-obj)")}
        ${optionRow("optSpace", "disc", "Discrete", "SA, ACO; discrete NSGA-II variants")}
        ${optionRow("optSpace", "hyb", "Hybrid mixed", "GA; NSGA-II for multi-objective hybrid")}
      </div>`
    );
  } else if (id === "process_kind") {
    mk(
      "Process automation focus",
      `${fieldLabel("Automation", "process_auto")}
      <div class="options">
        ${optionRow("processKind", "sim", "Simulation automation", "LTspice, PLECS, MATLAB batching")}
        ${optionRow("processKind", "agent", "Agentic AI", "LLM + tools + RAG (PE-GPT style)")}
      </div>`
    );
  } else if (id === "control_mode") {
    mk(
      "Control assistance type",
      `${fieldLabel("Role", "control_role")}
      <div class="options">
        ${optionRow("controlMode", "controller", "AI as controller", "RL or imitation NN policies")}
        ${optionRow("controlMode", "assist", "Assist control design", "Model plant/tune gains — maps to modeling or optimization")}
      </div>`
    );
  } else if (id === "control_policy") {
    mk(
      "Controller learning paradigm",
      `${fieldLabel("Policy", "policy_type")}
      <div class="options">
        ${optionRow("controlPolicy", "rl", "RL (new trajectories)", "Learn from rewards in an environment / simulator")}
        ${optionRow("controlPolicy", "imitation", "Imitation / supervised NN", "Clone MPC, expert, or surrogate")}
      </div>`
    );
  } else if (id === "control_deploy") {
    mk(
      "Deployment target",
      `${fieldLabel("Deployment", "deployment")}
      <div class="options">
        ${optionRow("controlDeploy", "online", "Online on hardware / edge", "Real-time inference — see TinyML guidance")}
        ${optionRow("controlDeploy", "offline", "Offline / lab analysis", "Training, HIL without tight MCU constraints")}
      </div>`
    );
  } else if (id === "assist_branch") {
    mk(
      "What should we assist first?",
      `${fieldLabel("Assist target", "design_goal")}
      <div class="options">
        ${optionRow("assistBranch", "modeling", "Control performance modeling", "Surrogate of dynamics / performance")}
        ${optionRow("assistBranch", "optimization", "Control optimization", "Tune PI/MPC weights with MHAs or RL")}
      </div>`
    );
  } else if (id === "maint_kind") {
    mk(
      "Maintenance objective",
      `${fieldLabel("Task", "maint_fdd")}
      <div class="options">
        ${optionRow("maintKind", "fdd", "Fault detection & diagnosis", "Map data to health / fault classes")}
        ${optionRow("maintKind", "sid", "System identification", "Estimate parameters — same modality flow as surrogate modeling")}
        ${optionRow("maintKind", "rul", "Remaining useful life", "Time-to-failure / degradation")}
      </div>`
    );
  } else if (id === "fdd_sup") {
    mk(
      "Label availability",
      `${fieldLabel("Supervision", "maint_fdd")}
      <div class="options">
        ${optionRow("fddSup", "labeled", "Labeled faults / health states", "Supervised classifiers")}
        ${optionRow("fddSup", "unlabeled", "Mostly unlabeled", "Anomaly detection on normal data")}
        ${optionRow("fddSup", "ssl", "Few labels + abundant unlabeled", "Semi-supervised pipelines")}
      </div>`
    );
  } else if (id === "fdd_task") {
    mk(
      "FDD task type",
      `${fieldLabel("Task type", "maint_fdd")}
      <div class="options">
        ${optionRow("fddTask", "binary", "Binary", "Normal vs fault")}
        ${optionRow("fddTask", "multiclass", "Multi-class", "Mutually exclusive fault categories")}
        ${optionRow("fddTask", "multilabel", "Multi-label", "Multiple simultaneous fault modes")}
      </div>`
    );
  } else if (id === "fdd_modality") {
    mk(
      "Measurement modality",
      `${fieldLabel("Modality", "fdd_modality")}
      <div class="options">
        ${optionRow("fddModality", "tabular", "Tabular", "Features extracted per window / cycle")}
        ${optionRow("fddModality", "signal", "Signal-domain", "Raw or filtered time series / spectra")}
        ${optionRow("fddModality", "graph", "Graph", "Circuit or thermal graph features")}
        ${optionRow("fddModality", "unstructured", "Unstructured", "Images, text logs, thermal photos")}
      </div>`
    );
  } else if (id === "rul_in") {
    mk(
      "RUL model inputs",
      `${fieldLabel("Input type", "maint_rul")}
      <div class="options">
        ${optionRow("rulIn", "tabular", "Tabular", "Engineered health indicators")}
        ${optionRow("rulIn", "signal", "Signal-domain", "Degradation trajectories, sensor streams")}
        ${optionRow("rulIn", "hybrid", "Hybrid", "Mixed modalities")}
      </div>`
    );
  } else if (id === "rul_prob") {
    mk(
      "Uncertainty quantification",
      `${fieldLabel("RUL output", "maint_rul")}
      <div class="options">
        ${optionRow("rulProb", "1", "Probabilistic", "Mean + variance, mixture heads (NLL)")}
        ${optionRow("rulProb", "0", "Deterministic", "Point estimate only")}
      </div>`
    );
  }

  container.innerHTML = html;
  bindTooltips(container);

  // Dynamic glossary for modality steps
  if (["model_in", "model_out", "sid_in", "sid_out"].includes(id)) {
    const which = id.includes("in") ? (id.startsWith("sid") ? "sidIn" : "modelIn") : id.startsWith("sid") ? "sidOut" : "modelOut";
    const r = container.querySelector(`input[name="${which}"]:checked`);
    if (r) {
      state[which] = r.value;
    }
  }

  el("btn-next").hidden = false;
  el("btn-back").hidden = stepIndex === 0;
  el("btn-restart").hidden = true;
  el("results-panel").hidden = true;
  renderProgress();
}

function readRadio(name) {
  const r = document.querySelector(`input[name="${name}"]:checked`);
  return r ? r.value : null;
}

function persistStep() {
  const id = currentStepId();
  if (id === "phase") state.phase = readRadio("phase");
  if (id === "design_goal") state.designGoal = readRadio("designGoal");
  if (id === "model_in") state.modelIn = readRadio("modelIn");
  if (id === "model_out") state.modelOut = readRadio("modelOut");
  if (id === "model_scarce") state.modelScarce = readRadio("modelScarce") === "1";
  if (id === "opt_dim") state.optDim = readRadio("optDim");
  if (id === "rl_space") state.rlSpace = readRadio("rlSpace");
  if (id === "opt_moo") state.optMoo = readRadio("optMoo") === "1";
  if (id === "opt_space") state.optSpace = readRadio("optSpace");
  if (id === "process_kind") state.processKind = readRadio("processKind");
  if (id === "control_mode") state.controlMode = readRadio("controlMode");
  if (id === "control_policy") state.controlPolicy = readRadio("controlPolicy");
  if (id === "control_deploy") state.controlDeploy = readRadio("controlDeploy");
  if (id === "assist_branch") state.assistBranch = readRadio("assistBranch");
  if (id === "maint_kind") state.maintKind = readRadio("maintKind");
  if (id === "fdd_sup") state.fddSup = readRadio("fddSup");
  if (id === "fdd_task") state.fddTask = readRadio("fddTask");
  if (id === "fdd_modality") state.fddModality = readRadio("fddModality");
  if (id === "sid_in") state.sidIn = readRadio("sidIn");
  if (id === "sid_out") state.sidOut = readRadio("sidOut");
  if (id === "sid_scarce") state.sidScarce = readRadio("sidScarce") === "1";
  if (id === "rul_in") state.rulIn = readRadio("rulIn");
  if (id === "rul_prob") state.rulProb = readRadio("rulProb") === "1";
}

function validateStep() {
  const id = currentStepId();
  const names = {
    phase: "phase",
    design_goal: "designGoal",
    model_in: "modelIn",
    model_out: "modelOut",
    model_scarce: "modelScarce",
    opt_dim: "optDim",
    rl_space: "rlSpace",
    opt_moo: "optMoo",
    opt_space: "optSpace",
    process_kind: "processKind",
    control_mode: "controlMode",
    control_policy: "controlPolicy",
    control_deploy: "controlDeploy",
    assist_branch: "assistBranch",
    maint_kind: "maintKind",
    fdd_sup: "fddSup",
    fdd_task: "fddTask",
    fdd_modality: "fddModality",
    sid_in: "sidIn",
    sid_out: "sidOut",
    sid_scarce: "sidScarce",
    rul_in: "rulIn",
    rul_prob: "rulProb",
  };
  const n = names[id];
  if (n && !readRadio(n)) {
    alert("Please select an option to continue.");
    return false;
  }
  return true;
}

function computeResults() {
  let rec;

  if (state.phase === "design" && state.designGoal === "modeling") {
    rec = buildModelingRecommendation(state.modelIn, state.modelOut, state.modelScarce);
  } else if (state.phase === "design" && state.designGoal === "optimization") {
    const rs = state.rlSpace === "hyb" ? "hyb" : state.rlSpace === "disc" ? "disc" : "cont";
    const os = state.optSpace === "hyb" ? "hyb" : state.optSpace === "disc" ? "disc" : "cont";
    rec = buildOptimizationRecommendation(state.optDim, rs, state.optMoo, os);
  } else if (state.phase === "design" && state.designGoal === "process") {
    rec = buildProcessRecommendation(state.processKind === "sim" ? "sim" : "agent");
  } else if (state.phase === "control" && state.controlMode === "controller") {
    rec = buildControlRecommendation(state.controlPolicy, state.controlDeploy);
  } else if (state.phase === "control" && state.controlMode === "assist" && state.assistBranch === "modeling") {
    rec = buildModelingRecommendation(state.modelIn, state.modelOut, state.modelScarce);
  } else if (state.phase === "control" && state.controlMode === "assist" && state.assistBranch === "optimization") {
    const rs = state.rlSpace === "hyb" ? "hyb" : state.rlSpace === "disc" ? "disc" : "cont";
    const os = state.optSpace === "hyb" ? "hyb" : state.optSpace === "disc" ? "disc" : "cont";
    rec = buildOptimizationRecommendation(state.optDim, rs, state.optMoo, os);
  } else if (state.phase === "maintenance" && state.maintKind === "fdd") {
    const task =
      state.fddSup === "labeled"
        ? state.fddTask
        : state.fddSup === "unlabeled"
          ? "unlabeled"
          : "ssl";
    rec = buildFDDRecommendation(task, state.fddModality || "tabular");
  } else if (state.phase === "maintenance" && state.maintKind === "sid") {
    rec = buildModelingRecommendation(state.sidIn, state.sidOut, state.sidScarce);
  } else if (state.phase === "maintenance" && state.maintKind === "rul") {
    rec = buildRULRecommendation(state.rulIn, state.rulProb);
  } else {
    rec = { title: "Result", summary: "", algorithms: [], flags: {}, extras: {}, scarceHtml: "" };
  }

  return rec;
}

/**
 * Top-down report block: skip empty content.
 * @param {string} title
 * @param {string} innerHtml
 * @param {string} [sectionClass] extra class on section (e.g. report-section--recommend)
 */
function reportBlock(title, innerHtml, sectionClass) {
  const t = String(innerHtml ?? "").trim();
  if (!t) return "";
  const cls = sectionClass ? `report-section ${sectionClass}` : "report-section";
  return `<section class="${cls}">
    <h3 class="report-h3">${title}</h3>
    <div class="report-section-body">${innerHtml}</div>
  </section>`;
}

/** First ~2 sentence units from tuning text for the at-a-glance block (keeps markdown). */
function tuningExcerptForGlance(md) {
  if (!md) return "";
  const s = String(md).trim();
  const parts = s.split(/\.\s+/);
  if (parts.length <= 2) return s;
  return parts.slice(0, 2).join(". ") + ".";
}

function algorithmSectionRefs(algorithm) {
  const text = stripMarkdown(`${algorithm.paper || ""} ${algorithm.caseStudy || ""}`);
  const secRefs = new Set();
  const secPattern = /Sec\.\s*[IVX0-9]+(?:-[A-Z])?/gi;
  for (const m of text.matchAll(secPattern)) secRefs.add(m[0].replace(/\s+/g, " ").trim());
  return [...secRefs].slice(0, 3);
}

function algorithmCategory(algorithm) {
  const text = `${algorithm.name || ""} ${algorithm.intro || ""} ${algorithm.paper || ""}`.toLowerCase();
  if (text.includes("reinforcement") || text.includes("ddpg") || text.includes("dqn") || text.includes("sac")) return "rl";
  if (text.includes("pso") || text.includes("genetic algorithm") || text.includes("nsga") || text.includes("annealing") || text.includes("meta-heur")) return "mha";
  if (text.includes("xgboost") || text.includes("random forest") || text.includes("svm") || text.includes("knn") || text.includes("classic ml")) return "classic";
  if (text.includes("pinn") || text.includes("pann") || text.includes("physics-informed")) return "piml";
  if (text.includes("graph") || text.includes("gcn") || text.includes("gat")) return "gnn";
  if (text.includes("rul")) return "rul";
  if (text.includes("fdd") || text.includes("fault") || text.includes("anomaly")) return "fdd";
  return "nn";
}

function reviewAlignmentSummary(algorithm, rec) {
  if (algorithm.reviewAlignment) return algorithm.reviewAlignment;
  const refs = algorithmSectionRefs(algorithm);
  const refsText = refs.length ? ` (${refs.join(", ")})` : "";
  const cat = algorithmCategory(algorithm);
  const source = stripMarkdown(`${algorithm.name || ""} ${algorithm.caseStudy || ""} ${algorithm.paper || ""}`);
  const lower = source.toLowerCase();
  const caseBits = [];
  if (lower.includes("buck")) caseBits.push("buck converter design/control");
  if (lower.includes("dab")) caseBits.push("DAB modulation, stress, ZVS, or time-domain modeling");
  if (lower.includes("tinyml")) caseBits.push("DAB TinyML deployment");
  if (lower.includes("igbt") || lower.includes("rul")) caseBits.push("IGBT RUL prognostics");
  if (lower.includes("magnet")) caseBits.push("magnetic core-loss modeling");
  if (lower.includes("field_temperature") || lower.includes("thermal")) caseBits.push("3-D thermal field prediction");
  if (lower.includes("pe-gpt") || lower.includes("agentic")) caseBits.push("PE-GPT-style tool workflows");
  const appText = caseBits.length ? ` The directly related application context is ${caseBits.join("; ")}.` : "";
  const scarceText = rec?.scarceHtml ? " Because this branch may involve scarce labels, the review article points toward simpler baselines, transfer, or physics constraints before larger models." : "";
  const summaryMap = {
    rl: `The review article discusses RL as reward-driven controller or optimizer learning, so this recommendation should be read through state/action design, reward terms, safe constraints, and repeated-seed evaluation${refsText}.${appText}`,
    mha: `The review article discusses MHA use in PE design search where objective/constraint definition, exploration-exploitation scheduling, and statistical comparison decide whether an apparent optimum is trustworthy${refsText}.${appText}`,
    classic: `The review article uses classic ML and ensembles as practical baselines for structured PE data; EDA, feature scaling, operating-region coverage, and calibration often matter as much as model choice${refsText}.${appText}${scarceText}`,
    piml: `The review article discusses physics-informed learning as a way to combine sparse data with known PE laws; for this recommendation, loss-term weighting and boundary/initial condition consistency are central${refsText}.${appText}`,
    gnn: `The review article motivates graph methods when PE topology, layout, or connectivity cannot be reduced to a single categorical label; validation should preserve node/edge meaning and multi-hop effects${refsText}.${appText}`,
    fdd: `The review article frames FDD around task definition and data representation first: label type, false-alarm cost, class imbalance, and modality choice determine how this algorithm should be evaluated${refsText}.${appText}`,
    rul: `The review article discusses RUL as degradation-trajectory modeling where uncertainty and split strategy matter; this recommendation should be checked against sparse regimes and trajectory-level validation${refsText}.${appText}`,
    nn: `The review article ties NN choice to PE data modality and learning target: define input structure, network body, output/loss, and validation split before increasing model complexity${refsText}.${appText}${scarceText}`,
  };
  return summaryMap[cat];
}

function reviewTuningGuide(algorithm) {
  const cat = algorithmCategory(algorithm);
  const tuneMap = {
    rl: "Tune reward terms first (tracking, loss, constraints), then stabilize training with replay/target updates and repeated-seed comparison before hardware tests.",
    mha: "Tune population size/step schedules around exploration→exploitation; evaluate robustness by repeated runs and use statistics for fair algorithm comparison.",
    classic:
      "Start with EDA-driven feature cleanup and scaling, then tune model complexity with validation splits that reflect operating regimes; check calibration, not accuracy alone.",
    piml:
      "Tune data-loss vs physics-loss weighting and boundary/initial condition terms together; monitor both physical consistency and prediction error during training.",
    gnn:
      "Tune depth/readout to avoid over-smoothing; keep node/edge feature definitions physically meaningful and validate graph-size generalization.",
    fdd:
      "Tune thresholds and class weights against false-alarm cost; for multi-label tasks, calibrate per-label decision thresholds instead of one global cutoff.",
    rul:
      "Tune sequence window length and split strategy by degradation trajectory; for probabilistic heads, verify calibration and uncertainty growth in sparse regions.",
    nn: "Tune baseline width/depth with early stopping and regularization first; only add complexity after clear validation gains across operating conditions.",
  };
  return tuneMap[cat];
}

/**
 * @param {string | { input?: string, hidden?: string, outputLoss?: string } | undefined} architecture
 * @param {"glance" | "card"} variant
 */
function renderArchitectureHtml(architecture, variant) {
  if (!architecture) return "";
  const wrapClass = variant === "card" ? "algo-architecture" : "recommend-glance-arch";
  if (typeof architecture === "string") {
    return `<div class="${wrapClass} ${wrapClass}--legacy"><span class="recommend-glance-k">Architecture (legacy)</span><p>${formatRichText(architecture)}</p></div>`;
  }
  const input = architecture.input || "";
  const hidden = architecture.hidden || "";
  const out = architecture.outputLoss || "";
  const blocks = [
    { k: "Inputs (what you measure or set)", t: input },
    { k: "Core model (how it learns patterns)", t: hidden },
    { k: "Outputs and training target", t: out },
  ].filter((x) => String(x.t).trim());
  if (!blocks.length) return "";
  return `<div class="${wrapClass}">${blocks
    .map(
      ({ k, t }) =>
        `<div class="arch-block"><span class="recommend-glance-k">${k}</span><p>${formatRichText(t)}</p></div>`
    )
    .join("")}</div>`;
}

/**
 * Highlighted block: algorithm names + role + tuning excerpt, or full path detail when there are no cards.
 * @param {object} rec
 * @param {string} pathDetailHtml
 * @param {boolean} promotePathOnly when true, path detail is shown only here (not repeated below)
 */
function renderRecommendedAlgorithmsBlock(rec, pathDetailHtml, promotePathOnly) {
  const algos = rec.algorithms || [];
  if (algos.length) {
    const items = algos
      .map((a, i) => {
        const ex = a.tuning ? tuningExcerptForGlance(a.tuning) : "";
        const arch = renderArchitectureHtml(a.architecture, "glance");
        return `<li class="recommend-glance-item">
        <span class="recommend-glance-n" aria-hidden="true">${i + 1}</span>
        <div class="recommend-glance-main">
          <strong class="recommend-glance-title">${escapeHtml(a.name)}</strong>
          <div class="recommend-glance-role"><p>${formatRichText(a.intro || "")}</p></div>
          ${arch}
          ${
            ex
              ? `<div class="recommend-glance-tuning"><span class="recommend-glance-k">Tuning & validation (essentials)</span><p>${formatRichText(ex)}</p></div>`
              : ""
          }
        </div>
      </li>`;
      })
      .join("");
    return reportBlock(
      "Recommended algorithms",
      `<ol class="recommend-glance-list">${items}</ol>`,
      "report-section--recommend"
    );
  }
  if (promotePathOnly && String(pathDetailHtml).trim()) {
    return reportBlock(
      "Recommended approaches for this path",
      `<p class="recommend-glance-lede">This branch has no separate algorithm cards—the items below are your <strong>primary</strong> guidance (model families, workflow, pitfalls).</p>
      <div class="recommend-glance-path-wrap">${pathDetailHtml}</div>`,
      "report-section--recommend"
    );
  }
  return "";
}

function dedupeLinks(links) {
  const seen = new Set();
  return (links || []).filter((l) => {
    if (!l?.href || seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
}

function renderReadingSequence(rec) {
  const repoRows = getRepoArticleAlignment(state, rec);
  const algoLinks = dedupeLinks((rec.algorithms || []).flatMap((a) => a.links || []));
  const notebookLinks = algoLinks.filter((l) => /\.ipynb/i.test(`${l.href} ${l.label}`));
  const readmeLinks = algoLinks.filter((l) => !notebookLinks.includes(l));
  const repoList = repoRows
    .map(
      (r) =>
        `<li><a href="${r.href}" target="_blank" rel="noopener">${escapeHtml(r.folder)}</a> <span class="reading-meta">${escapeHtml(
          r.sections
        )}</span></li>`
    )
    .join("");
  const notebookList = [...notebookLinks, ...readmeLinks]
    .map((l) => `<li><a href="${l.href}" target="_blank" rel="noopener">${escapeHtml(l.label)}</a></li>`)
    .join("");

  return `<div class="extras-box reading-sequence-box">
    <h3 class="extras-h3">Recommended review article and GitHub reading path</h3>
    <ol class="reading-sequence">
      <li><strong>What (Sec. I–II):</strong> Start with the What–Which–How framework and PE data modalities. Identify your lifecycle phase (design / control / maintenance), specific task, and data format (tabular, signal, field, graph, hybrid).</li>
      <li><strong>Which (Sec. III–VI):</strong> Use the algorithm card to check input representation, model body, output head, and loss against your PE objective. Match the recommended model family to your data modality and learning type.</li>
      <li><strong>How (Sec. III–VI):</strong> Open each card's <strong>Tuning & validation (full)</strong> box and follow the review-article tuning checklist. Apply PE-specific practices: feature scaling, EDA, physics-informed constraints, and statistical comparison across runs.</li>
      <li><strong>Case studies (Sec. VII):</strong> Finish with the closest D1–D7 notebook and reproduce the end-to-end workflow before adapting it to your hardware or dataset.</li>
    </ol>
    ${
      repoList
        ? `<div class="report-subsection"><h4 class="report-h4">Relevant review sections and repo folders</h4><ol class="reading-link-list">${repoList}</ol></div>`
        : ""
    }
    ${
      notebookList
        ? `<div class="report-subsection"><h4 class="report-h4">Notebook / README order for this result</h4><ol class="reading-link-list">${notebookList}</ol></div>`
        : ""
    }
  </div>`;
}

function renderResults(rec) {
  lastRec = rec;
  el("results-panel").hidden = false;
  el("wizard-panel").querySelector("#step-container").innerHTML = "";
  el("btn-next").hidden = true;
  el("btn-back").hidden = true;
  el("btn-restart").hidden = false;

  const summary = el("results-summary");

  let pathDetailHtml = "";
  if (rec.pathEnumAbundant || rec.pathEnumScarce || rec.pathWorkflow || rec.pathPitfalls) {
    if (rec.pathEnumAbundant) {
      pathDetailHtml += `<p class="paper-note path-enumeration">${formatRichText(rec.pathEnumAbundant)}</p>`;
    }
    if (rec.pathEnumScarce) {
      pathDetailHtml += `<p class="paper-note scarce-path"><strong>Scarce-data branch:</strong> ${formatRichText(rec.pathEnumScarce)}</p>`;
    }
    if (rec.pathWorkflow) {
      pathDetailHtml += `<div class="report-subsection"><h4 class="report-h4">Workflow</h4><p>${formatRichText(rec.pathWorkflow)}</p></div>`;
    }
    if (rec.pathPitfalls) {
      pathDetailHtml += `<div class="report-subsection"><h4 class="report-h4">Pitfalls & checks</h4><p>${formatRichText(rec.pathPitfalls)}</p></div>`;
    }
  }
  const hasAlgoCards = (rec.algorithms || []).length > 0;
  const promotePathOnly = !hasAlgoCards && String(pathDetailHtml).trim().length > 0;

  const hero = `<header class="report-hero">
    <h3 class="report-title">${escapeHtml(rec.title || "Report")}</h3>
  </header>`;

  summary.innerHTML = `${hero}
    ${renderRecommendedAlgorithmsBlock(rec, pathDetailHtml, promotePathOnly)}
    ${reportBlock("Situation & goal", rec.summary ? `<p class="report-lede">${formatRichText(rec.summary)}</p>` : "")}
    ${reportBlock("Label / data regime", rec.scarceHtml ? formatRichText(rec.scarceHtml, { html: true }) : "")}`;

  const flagsEl = el("results-flags");
  flagsEl.innerHTML = "";
  flagsEl.hidden = true;

  const body = el("results-body");
  let h = "";

  if (hasAlgoCards) {
    h += `<div class="report-body-intro">
      <h2 class="report-part-title">Algorithm details & GitHub Jupyter Notebook materials</h2>
    </div>`;
  } else {
    h += `<div class="report-body-intro">
      <h2 class="report-part-title">Deeper context & resources</h2>
      <p class="report-part-lede">Your main path guidance is in <strong>Recommended approaches for this path</strong> above. Below: further reading and GitHub Jupyter Notebook materials.</p>
    </div>`;
  }

  (rec.algorithms || []).forEach((a) => {
    const links = (a.links || [])
      .map((l) => `<li><a href="${l.href}" target="_blank" rel="noopener">${l.label}</a></li>`)
      .join("");
    const ext = (a.external || [])
      .map((l) => `<li><a href="${l.href}" target="_blank" rel="noopener">${l.label}</a></li>`)
      .join("");
    const introH = formatRichText(a.intro || "");
    const tuningH = formatRichText(a.tuning || "");
    const tuningHint = a.tuning ? formatRichText(tuningExcerptForGlance(a.tuning)) : "";
    const tuningGuideH = formatRichText(reviewTuningGuide(a));
    const caseH = formatRichText(a.caseStudy || "");
    const paperH = formatRichText(reviewAlignmentSummary(a, rec));
    const archSec = a.architecture
      ? `<section class="algo-sec algo-sec--arch"><h4 class="algo-h4">Architecture & learning objective</h4>${renderArchitectureHtml(a.architecture, "card")}</section>`
      : "";
    h += `<article class="algo-card">
      <h3 class="algo-title">${escapeHtml(a.name)}</h3>
      <section class="algo-sec"><h4 class="algo-h4">What to use & why</h4><p>${introH}</p></section>
      ${archSec}
      <details class="algo-details algo-details--tuning">
        <summary>Tuning & validation (full)</summary>
        <div class="algo-details-body">
          <p>${tuningH}</p>
          <p class="paper-note"><strong>Review article tuning guide:</strong> ${tuningGuideH}</p>
          ${tuningHint ? `<p class="paper-note paper-note--extra"><strong>Quick tuning checklist:</strong> ${tuningHint}</p>` : ""}
          <p class="paper-note paper-note--extra"><strong>Validation check:</strong> compare against a simple baseline, use operating-range-aware splits, and confirm conclusions on held-out PE conditions.</p>
        </div>
      </details>
      <section class="algo-sec"><h4 class="algo-h4">GitHub notebook example</h4><p>${caseH}</p></section>
      <section class="algo-sec"><h4 class="algo-h4">Review article alignment</h4><p class="paper-note">${paperH}</p></section>
      <section class="algo-sec"><h4 class="algo-h4">GitHub Jupyter Notebook Materials</h4><ul class="link-list">${links || "<li><em>No bundled notebook — use external links.</em></li>"}</ul></section>
      ${ext ? `<section class="algo-sec"><h4 class="algo-h4">External references</h4><ul class="link-list">${ext}</ul></section>` : ""}
    </article>`;
  });

  h += renderReadingSequence(rec);

  if (rec.customBlocks) {
    rec.customBlocks.forEach((b) => {
      h += `<div class="extras-box">${formatRichText(b.html || "", { html: true })}</div>`;
    });
  }

  h += `<div class="extras-box extras-further">
    <h3 class="extras-h3">Further reading</h3>
    <ul class="link-list">
      ${FURTHER_READING.map((x) => `<li><a href="${x.href}" target="_blank" rel="noopener">${x.label}</a></li>`).join("")}
      <li><a href="${REPO_ROOT}" target="_blank" rel="noopener">Fundamentals_of_AI_for_PE on GitHub</a></li>
    </ul>
  </div>`;

  body.innerHTML = h;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function goNext() {
  if (!validateStep()) return;
  persistStep();
  flow = buildFlow();
  /* Finish when the current step is the last in the flow (after persisting). */
  if (stepIndex >= flow.length - 1) {
    const rec = computeResults();
    renderResults(rec);
    return;
  }
  stepIndex += 1;
  renderStep();
}

function goBack() {
  if (stepIndex <= 0) return;
  stepIndex -= 1;
  renderStep();
}

function restart() {
  Object.keys(state).forEach((k) => delete state[k]);
  lastRec = null;
  stepIndex = 0;
  flow = buildFlow();
  el("results-panel").hidden = true;
  el("btn-restart").hidden = true;
  el("btn-next").hidden = false;
  renderStep();
}

el("btn-next").addEventListener("click", goNext);
el("btn-back").addEventListener("click", goBack);
el("btn-restart").addEventListener("click", restart);

/** Strip markdown markers for plain-text assistant prompts. */
function stripMarkdown(raw) {
  return String(raw || "")
    .replace(/\*\*([\s\S]+?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*([^*\n]+?)\*/g, "$1")
    .replace(/\\(\(|\)|\[|\])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Human-readable labels for wizard answers. */
function describeWizardStep(stepId, s) {
  const modality = {
    tabular: "Tabular",
    signal: "Signal-domain",
    graph: "Graph",
    field: "Field",
    hybrid: "Hybrid",
  };

  /** @type {Record<string, [string, string | undefined]>} */
  const map = {
    phase: ["Lifecycle phase", { design: "Design", control: "Control", maintenance: "Maintenance" }[s.phase]],
    design_goal: [
      "Design-phase goal",
      { modeling: "Surrogate modeling", optimization: "Optimization", process: "Process automation" }[s.designGoal],
    ],
    model_in: ["Modeling — input modality", modality[s.modelIn]],
    model_out: ["Modeling — output modality", modality[s.modelOut]],
    model_scarce: ["Modeling — labeled data", s.modelScarce ? "Scarce" : s.modelScarce === false ? "Abundant" : undefined],
    opt_dim: ["Optimization scale", s.optDim === "high" ? "High-dimensional (>100D) — RL" : s.optDim === "low" ? "Low-dimensional — MHAs" : undefined],
    rl_space: [
      "RL action space",
      { cont: "Continuous (DDPG, SAC, …)", disc: "Discrete (DQN, …)", hyb: "Hybrid" }[s.rlSpace],
    ],
    opt_moo: ["Optimization objectives", s.optMoo ? "Multi-objective (Pareto)" : s.optMoo === false ? "Single objective" : undefined],
    opt_space: [
      "Search space structure",
      { cont: "Continuous (PSO, DE, NSGA-II/III, …)", disc: "Discrete (SA, ACO, …)", hyb: "Hybrid mixed (GA, …)" }[s.optSpace],
    ],
    process_kind: [
      "Process automation focus",
      s.processKind === "sim" ? "Simulation automation (LTspice, PLECS, MATLAB batching)" : s.processKind === "agent" ? "Agentic AI (LLM + tools + RAG)" : undefined,
    ],
    control_mode: [
      "Control role",
      s.controlMode === "controller" ? "AI as controller" : s.controlMode === "assist" ? "Assist control design" : undefined,
    ],
    control_policy: [
      "Controller learning paradigm",
      s.controlPolicy === "rl" ? "RL (new trajectories from rewards)" : s.controlPolicy === "imitation" ? "Imitation / supervised NN" : undefined,
    ],
    control_deploy: [
      "Deployment target",
      s.controlDeploy === "online" ? "Online on hardware / edge (TinyML considerations)" : s.controlDeploy === "offline" ? "Offline / lab analysis" : undefined,
    ],
    assist_branch: [
      "Assist-control branch",
      s.assistBranch === "modeling" ? "Control performance modeling" : s.assistBranch === "optimization" ? "Control optimization" : undefined,
    ],
    maint_kind: [
      "Maintenance objective",
      { fdd: "Fault detection & diagnosis", sid: "System identification", rul: "Remaining useful life (RUL)" }[s.maintKind],
    ],
    fdd_sup: [
      "FDD label availability",
      {
        labeled: "Labeled faults / health states",
        unlabeled: "Mostly unlabeled (anomaly detection)",
        ssl: "Few labels + abundant unlabeled (semi-supervised)",
      }[s.fddSup],
    ],
    fdd_task: [
      "FDD task type",
      { binary: "Binary (normal vs fault)", multiclass: "Multi-class", multilabel: "Multi-label (co-occurring faults)" }[s.fddTask],
    ],
    fdd_modality: [
      "FDD measurement modality",
      {
        tabular: "Tabular features",
        signal: "Signal-domain (waveforms / spectra)",
        graph: "Graph (topology / layout)",
        unstructured: "Unstructured (images, text, thermal photos)",
      }[s.fddModality],
    ],
    sid_in: ["System ID — input modality", modality[s.sidIn]],
    sid_out: ["System ID — output modality", modality[s.sidOut]],
    sid_scarce: ["System ID — labeled data", s.sidScarce ? "Scarce" : s.sidScarce === false ? "Abundant" : undefined],
    rul_in: [
      "RUL model inputs",
      { tabular: "Tabular health indicators", signal: "Signal-domain degradation trajectories", hybrid: "Hybrid modalities" }[s.rulIn],
    ],
    rul_prob: ["RUL uncertainty", s.rulProb ? "Probabilistic (mean + variance / mixture)" : s.rulProb === false ? "Deterministic point estimate" : undefined],
  };

  const row = map[stepId];
  if (!row || !row[1]) return null;
  return `- ${row[0]}: ${row[1]}`;
}

/** @param {State} s @param {ReturnType<typeof computeResults> | null} rec */
function buildGenAiPrompt(s, rec) {
  const flowSteps = buildFlow();
  const selectionLines = flowSteps.map((stepId) => describeWizardStep(stepId, s)).filter(Boolean);

  const parts = [
    "I'm using the Fundamentals of AI for PE — Algorithm Selector (companion to the IEEE TIE review article and the Fundamentals_of_AI_for_PE GitHub Jupyter Notebook Materials repo).",
    "",
    "## My wizard selections",
    ...(selectionLines.length ? selectionLines : ["- (No selections recorded yet — please complete the wizard first.)"]),
  ];

  if (rec) {
    parts.push("", "## Selector report");
    if (rec.pathId != null) parts.push(`- Path ID: ${rec.pathId}`);
    if (rec.title) parts.push(`- Report title: ${stripMarkdown(rec.title)}`);
    if (rec.summary) parts.push(`- Situation & goal: ${stripMarkdown(rec.summary)}`);

    const flags = [];
    if (rec.flags?.nn) flags.push("Neural networks");
    if (rec.flags?.mha) flags.push("Meta-heuristics");
    if (rec.flags?.tinyml) flags.push("TinyML / edge deployment");
    if (rec.flags?.piml) flags.push("Physics-informed ML");
    if (flags.length) parts.push(`- Technique flags: ${flags.join("; ")}`);

    if (rec.algorithms?.length) {
      parts.push("", "## Recommended algorithms (from selector)");
      rec.algorithms.forEach((a, i) => {
        parts.push(`${i + 1}. ${a.name}`);
        if (a.intro) parts.push(`   Why: ${stripMarkdown(a.intro)}`);
        if (a.tuning) parts.push(`   Tuning essentials: ${stripMarkdown(a.tuning)}`);
        parts.push(`   Review-article tuning guide: ${stripMarkdown(reviewTuningGuide(a))}`);
        parts.push(`   Review article alignment summary: ${stripMarkdown(reviewAlignmentSummary(a, rec))}`);
        if (a.caseStudy) parts.push(`   GitHub notebook example: ${stripMarkdown(a.caseStudy)}`);
      });
    }

    const readingRows = getRepoArticleAlignment(s, rec);
    const algoLinks = dedupeLinks((rec.algorithms || []).flatMap((a) => a.links || []));
    if (readingRows.length || algoLinks.length) {
      parts.push("", "## Recommended review article and GitHub reading path");
      parts.push("1. Basics: use review article Sec. I–II for What–Which–How and PE data modalities.");
      parts.push("2. Structure/loss: inspect each algorithm card's input, model body, output head, and loss.");
      parts.push("3. Tuning: use each algorithm's review-article tuning guide before comparing methods.");
      parts.push("4. Case studies: reproduce the closest Fundamentals_of_AI_for_PE notebook before adapting.");
      readingRows.forEach((r) => parts.push(`- Review/repo folder: ${r.folder} (${r.sections})`));
      algoLinks.slice(0, 8).forEach((l) => parts.push(`- Material: ${l.label} — ${l.href}`));
    }
  } else {
    parts.push("", "Note: I have not reached the final selector report yet — use the selections above only.");
  }

  parts.push(
    "",
    "## Please help me with",
    "1. (What) Confirm my lifecycle phase, task type, and data modality. Identify any ambiguities or mismatches.",
    "2. (Which) An end-to-end workflow tailored to my selections (data acquisition → EDA/preprocessing → model choice → validation → deployment for power electronics).",
    "3. (How) A practical tuning checklist for each recommended algorithm with PE-specific constraints (feature scaling, EDA, physics-informed constraints, statistical comparison).",
    "4. Which Fundamentals_of_AI_for_PE GitHub Jupyter notebooks and READMEs I should open first, in what order, and why.",
    "5. Key pitfalls and review-article section references (for example Sec. III-B, Sec. V, Sec. VII-F) most relevant to my path.",
    "6. A reading sequence: What (Sec. I–II) → Which (Sec. III–VI) → How (Sec. III–VI) → Case studies (Sec. VII).",
    "7. Clarifying questions only if critical information is still missing.",
    "",
    "Respond in structured sections. Ground advice in the review article What–Which–How framework and the GitHub Jupyter Notebook materials."
  );

  return parts.join("\n");
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

function initGenAiButtons() {
  const copyBtn = document.getElementById("btn-gpt-copy");
  const openBtn = document.getElementById("btn-gpt-open");
  const hint = document.getElementById("gpt-promo-hint");
  const defaultHint =
    "After completing the wizard, copy a filled prompt with your selections, then open ChatGPT and paste (Ctrl+V).";

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const prompt = buildGenAiPrompt(state, lastRec);
      try {
        await copyTextToClipboard(prompt);
        if (hint) {
          hint.textContent = "Prompt copied — open ChatGPT and paste (Ctrl+V).";
          window.setTimeout(() => {
            hint.textContent = defaultHint;
          }, 5000);
        }
      } catch {
        if (hint) hint.textContent = "Could not copy prompt — try again or copy from browser devtools.";
      }
    });
  }

  if (openBtn) {
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(GENAI_GPT_URL, "_blank", "noopener,noreferrer");
    });
  }
}

/** Keep the assistant widget viewport-fixed (direct child of body). */
function initFloatingAssistant() {
  const dock = document.querySelector(".gpt-float");
  if (!dock) return;

  if (dock.parentElement !== document.body) {
    document.body.appendChild(dock);
  }

  Object.assign(dock.style, {
    position: "fixed",
    top: "auto",
    left: "auto",
    right: "1.25rem",
    bottom: "1.25rem",
    zIndex: "1100",
    width: "min(22rem, calc(100vw - 2rem))",
    margin: "0",
    padding: "0",
    pointerEvents: "none",
  });

  const inner = dock.querySelector(".gpt-float__inner");
  if (inner) {
    inner.style.pointerEvents = "auto";
  }
}

initFloatingAssistant();
initGenAiButtons();
window.addEventListener("load", initFloatingAssistant);

flow = buildFlow();
renderStep();
