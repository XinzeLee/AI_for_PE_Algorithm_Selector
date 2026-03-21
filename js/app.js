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
  getArticleSections,
  getRepoArticleAlignment,
  FURTHER_READING,
} from "./data.js";

/** @typedef {Record<string, string>} State */

const state = /** @type {State} */ ({});

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
 * Convert **bold** and *italic* to HTML. If `html` is true, string may already contain tags — only apply markdown spans.
 * @param {string} raw
 * @param {{ html?: boolean }} [opts]
 */
function formatRichText(raw, opts = {}) {
  if (raw == null) return "";
  const s = String(raw);
  if (opts.html) {
    return applyInlineMarkdown(s);
  }
  return applyInlineMarkdown(
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
  );
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

  rec.articleSections = getArticleSections(state, rec);
  rec.repoAlignment = getRepoArticleAlignment(state, rec);
  return rec;
}

/**
 * Top-down report block: skip empty content.
 * @param {string} title
 * @param {string} innerHtml
 */
function reportBlock(title, innerHtml) {
  const t = String(innerHtml ?? "").trim();
  if (!t) return "";
  return `<section class="report-section">
    <h3 class="report-h3">${title}</h3>
    <div class="report-section-body">${innerHtml}</div>
  </section>`;
}

/**
 * Tutorial article excerpts: subsection titles + paragraphs (body may contain multiple \\n\\n).
 * @param {{ title: string, body: string }[] | undefined} sections
 */
function renderArticleSections(sections) {
  if (!sections?.length) return "";
  const blocks = sections
    .map((sec, i) => {
      const paras = String(sec.body)
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${formatRichText(p)}</p>`)
        .join("");
      return `<section class="article-snippet" aria-labelledby="article-snippet-${i}">
        <h4 class="article-snippet-title" id="article-snippet-${i}">${escapeHtml(sec.title)}</h4>
        <div class="article-snippet-body">${paras}</div>
      </section>`;
    })
    .join("");
  return reportBlock(
    "Discussion in the tutorial article",
    `${blocks}<p class="article-cite"><cite>Excerpts abridged from the invited tutorial: Xinze Li et al., “Fundamentals of Artificial Intelligence for Power Electronics,” <em>IEEE Trans. Ind. Electron.</em>, 2026.</cite></p>`
  );
}

/**
 * @param {{ folder: string, sections: string, href: string }[] | undefined} rows
 */
function renderRepoAlignment(rows) {
  if (!rows?.length) return "";
  const tbody = rows
    .map(
      (r) =>
        `<tr><td><a href="${r.href}" target="_blank" rel="noopener">${escapeHtml(r.folder)}</a></td><td>${escapeHtml(r.sections)}</td></tr>`
    )
    .join("");
  const note = `<p class="repo-alignment-note">Matches the <strong>Alignment with the tutorial article</strong> section in the course repo README, filtered to folders relevant to this recommendation (modalities, technique flags, and notebook links).</p>
    <p class="repo-alignment-note"><a href="${ghBlob("README.md")}" target="_blank" rel="noopener">Fundamentals_of_AI_for_PE — root README</a> · <a href="${REPO_ROOT}" target="_blank" rel="noopener">Repository</a></p>`;
  return reportBlock(
    "Course repository ↔ tutorial article",
    `<table class="repo-alignment-table" role="table">
      <thead><tr><th scope="col">Course repo folder</th><th scope="col">Tutorial article (sections)</th></tr></thead>
      <tbody>${tbody}</tbody>
    </table>${note}`
  );
}

function renderResults(rec) {
  el("results-panel").hidden = false;
  el("wizard-panel").querySelector("#step-container").innerHTML = "";
  el("btn-next").hidden = true;
  el("btn-back").hidden = true;
  el("btn-restart").hidden = false;

  const pathLine =
    rec.pathId != null
      ? `<div class="path-badge" title="Tutorial path enumeration">Path ${rec.pathId} · enumerated in the tutorial</div>`
      : `<div class="path-badge">Workflow branch (not a single numbered path)</div>`;

  const summary = el("results-summary");

  const pills = [];
  if (rec.flags?.nn) pills.push(`<span class="pill nn">Neural networks</span>`);
  if (rec.flags?.mha) pills.push(`<span class="pill mha">Meta-heuristics</span>`);
  if (rec.flags?.tinyml) pills.push(`<span class="pill tinyml">TinyML / edge</span>`);
  if (rec.flags?.piml) pills.push(`<span class="pill piml">Physics-informed ML</span>`);
  const pillsHtml = pills.length ? `<div class="flag-strip">${pills.join("")}</div>` : "";

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

  const hero = `<header class="report-hero">
    <h3 class="report-title">${escapeHtml(rec.title || "Report")}</h3>
    ${pathLine}
  </header>`;

  summary.innerHTML = `${hero}
    ${reportBlock("Situation & goal", rec.summary ? `<p class="report-lede">${formatRichText(rec.summary)}</p>` : "")}
    ${reportBlock("Label / data regime", rec.scarceHtml ? formatRichText(rec.scarceHtml, { html: true }) : "")}
    ${reportBlock("Techniques in scope", pillsHtml)}
    ${reportBlock("Standard workflow (tutorial)", rec.tutorialPipelineHtml ? formatRichText(rec.tutorialPipelineHtml, { html: true }) : "")}
    ${renderArticleSections(rec.articleSections)}
    ${renderRepoAlignment(rec.repoAlignment)}
    ${reportBlock("This modality path in detail", pathDetailHtml)}
    ${reportBlock("Paper cross-checks", rec.reviewContextHtml ? formatRichText(rec.reviewContextHtml, { html: true }) : "")}`;

  const flagsEl = el("results-flags");
  flagsEl.innerHTML = "";
  flagsEl.hidden = true;

  const body = el("results-body");
  let h = "";

  const hasAlgos = (rec.algorithms || []).length > 0;
  if (hasAlgos) {
    h += `<div class="report-body-intro">
      <h2 class="report-part-title">Techniques & course materials</h2>
      <p class="report-part-lede">Below: one card per recommended family—read <strong>role</strong> first, then <strong>tuning</strong>, then <strong>resources</strong>. Cross-cutting notebooks follow the cards.</p>
    </div>`;
  } else {
    h += `<div class="report-body-intro">
      <h2 class="report-part-title">Resources</h2>
      <p class="report-part-lede">No algorithm cards for this branch—see sections above and the links below.</p>
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
    const tricksH = a.tricks ? formatRichText(a.tricks) : "";
    const caseH = formatRichText(a.caseStudy || "");
    const paperH = formatRichText(a.paper || "");
    const tricksSecRendered = a.tricks
      ? `<section class="algo-sec"><h4 class="algo-h4">Practical tips</h4><p>${tricksH}</p></section>`
      : "";
    h += `<article class="algo-card">
      <h3 class="algo-title">${escapeHtml(a.name)}</h3>
      <section class="algo-sec"><h4 class="algo-h4">Role & when to use</h4><p>${introH}</p></section>
      <section class="algo-sec"><h4 class="algo-h4">Tuning & validation</h4><p>${tuningH}</p></section>
      ${tricksSecRendered}
      <section class="algo-sec"><h4 class="algo-h4">Tutorial case</h4><p>${caseH}</p></section>
      <section class="algo-sec"><h4 class="algo-h4">Paper alignment</h4><p class="paper-note">${paperH}</p></section>
      <section class="algo-sec"><h4 class="algo-h4">Course repository</h4><ul class="link-list">${links || "<li><em>No bundled notebook — use external links.</em></li>"}</ul></section>
      ${ext ? `<section class="algo-sec"><h4 class="algo-h4">External references</h4><ul class="link-list">${ext}</ul></section>` : ""}
    </article>`;
  });

  if (rec.customBlocks) {
    rec.customBlocks.forEach((b) => {
      h += `<div class="extras-box">${formatRichText(b.html || "", { html: true })}</div>`;
    });
  }

  /* Extras: NN good practices */
  if (rec.extras?.nn) {
    h += `<div class="extras-box">
      <h3 class="extras-h3">Neural networks — cross-cutting course notes</h3>
      <p>${formatRichText(GLOSSARY.nn_practice)}</p>
      <ul class="link-list">
        <li><a href="${ghBlob("4_Neural_Network/Good_Practices/good_practice_NN.ipynb")}" target="_blank" rel="noopener">good_practice_NN.ipynb</a> — regularization, normalization, train/val/test, hyperparameter workflow</li>
        <li><a href="${ghBlob("4_Neural_Network/Signal_Domain/rnn_basics.ipynb")}" target="_blank" rel="noopener">rnn_basics.ipynb</a> — RNN/LSTM/GRU/CNN/Transformer building blocks for sequences</li>
        <li><a href="${ghBlob("4_Neural_Network/Fundamentals/NN_basics.ipynb")}" target="_blank" rel="noopener">NN_basics.ipynb</a> — MLP fundamentals</li>
      </ul>
    </div>`;
  }

  if (rec.extras?.mha) {
    h += `<div class="extras-box">
      <h3 class="extras-h3">Meta-heuristics — cross-cutting course notes</h3>
      <p>${formatRichText(GLOSSARY.mha_tuning)}</p>
      <ul class="link-list">
        <li><a href="${ghBlob("1_MHA/Single_Objective_MHA/pso_hyp_tuning.ipynb")}" target="_blank" rel="noopener">pso_hyp_tuning.ipynb</a></li>
        <li><a href="${ghBlob("1_MHA/Single_Objective_MHA/sing_obj_MHA.ipynb")}" target="_blank" rel="noopener">sing_obj_MHA.ipynb</a></li>
        <li><a href="${ghBlob("1_MHA/Single_Objective_MHA/algorithm_stats_compare.ipynb")}" target="_blank" rel="noopener">algorithm_stats_compare.ipynb</a> — statistical comparison</li>
        <li><a href="${ghBlob("1_MHA/Multi_Objective_MHA/multi_obj_MHA_master.ipynb")}" target="_blank" rel="noopener">multi_obj_MHA_master.ipynb</a></li>
        <li><a href="${ghBlob("1_MHA/README.md")}" target="_blank" rel="noopener">1_MHA/README.md</a></li>
      </ul>
    </div>`;
  }

  if (rec.extras?.tinyml) {
    h += `<div class="extras-box">
      <h3 class="extras-h3">TinyML & edge deployment</h3>
      <p>Prefer shallow-wide networks at similar parameter counts for latency; consider quantization, pruning with <strong>L1</strong>, ONNX Runtime / TensorFlow Lite — as in the tutorial’s adaptive modulation example.</p>
      <ul class="link-list">
        <li><a href="${ghBlob("9_Case_Studies_PE/DAB_Design/Adaptive_Modulation/TinyML.ipynb")}" target="_blank" rel="noopener">TinyML.ipynb</a></li>
        <li><a href="${ghBlob("9_Case_Studies_PE/DAB_Design/Performance_Modeling_and_Design/one_stop_AI_DAB_modulation.ipynb")}" target="_blank" rel="noopener">one_stop_AI_DAB_modulation.ipynb</a> (related workflow)</li>
      </ul>
    </div>`;
  }

  if (rec.extras?.piml) {
    h += `<div class="extras-box">
      <h3 class="extras-h3">Physics-informed ML — course entry points</h3>
      <p>${formatRichText(GLOSSARY.piml)}</p>
      <ul class="link-list">
        <li><a href="${ghBlob("5_PIML/PINN/pinn_ode.ipynb")}" target="_blank" rel="noopener">pinn_ode.ipynb</a></li>
        <li><a href="${ghBlob("5_PIML/PINN/prior_integration_example.ipynb")}" target="_blank" rel="noopener">prior_integration_example.ipynb</a></li>
        <li><a href="${ghBlob("5_PIML/PANN/README.md")}" target="_blank" rel="noopener">PANN/README.md</a></li>
        <li><a href="${ghBlob("5_PIML/README.md")}" target="_blank" rel="noopener">5_PIML/README.md</a></li>
      </ul>
    </div>`;
  }

  h += `<div class="extras-box extras-further">
    <h3 class="extras-h3">Further reading</h3>
    <ul class="link-list">
      ${FURTHER_READING.map((x) => `<li><a href="${x.href}" target="_blank" rel="noopener">${x.label}</a></li>`).join("")}
      <li><a href="${REPO_ROOT}" target="_blank" rel="noopener">Public course repo (when released)</a></li>
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

flow = buildFlow();
renderStep();
