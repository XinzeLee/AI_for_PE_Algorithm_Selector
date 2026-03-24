/**
 * Content aligned with the TIE tutorial paper and Fundamentals_of_AI_for_PE repo.
 * Public repo URL (per user): https://github.com/XinzeLee/Fundamentals_of_AI_for_PE
 */

export const REPO_ROOT = "https://github.com/XinzeLee/Fundamentals_of_AI_for_PE";

export function ghBlob(repoPath) {
  return `${REPO_ROOT}/blob/main/${repoPath}`;
}

export function ghTree(folderPath) {
  return `${REPO_ROOT}/tree/main/${folderPath}`;
}

/**
 * Structured NN description for the report UI: how modalities enter the net, what invariants
 * the hidden stack encodes, and how outputs + loss match the learning task.
 * @param {string} inputModality
 * @param {string} hiddenInvariants
 * @param {string} outputLossTask
 */
function arch(inputModality, hiddenInvariants, outputLossTask) {
  return { input: inputModality, hidden: hiddenInvariants, outputLoss: outputLossTask };
}

/** @type {Record<string, string>} */
export const GLOSSARY = {
  phase:
    "Lifecycle perspective used in the tutorial: **Design** (modeling & optimization), **Control** (policies & assistive design), **Maintenance** (health, identification, RUL). This mirrors how AI is applied across converter lifecycles.",
  design_goal:
    "**Surrogate modeling** learns input→output mappings (efficiency, waveforms, fields). **Optimization** searches design or control parameters using MHAs or RL. **Process automation** couples simulators/tools with scripts or agentic workflows.",
  io_modality_in:
    "Choose how **inputs** are encoded: **tabular** columns, **signal** waveforms/spectra, **graph** connectivity, **field** grids, or **hybrid** fusion of several—this drives encoder choice (MLP, RNN, GNN, CNN, multi-branch).",
  io_modality_out:
    "Choose how **outputs** should be represented: **tabular** metrics/vectors, **signal** trajectories, **graph** structures, **field** maps, or **hybrid**—must match your labels or simulation targets.",
  modality_tabular:
    "Structured rows/columns: ratings, parameters, efficiency targets. Columns are **rotation-variant**—permutation breaks meaning. Tree models and FNNs are typical; the paper contrasts this with sequences and images.",
  modality_signal:
    "**Time- or frequency-domain** sequences from scopes, analyzers. Locality, multi-scale structure, and **causality** matter; naive sliding-window tabularization can break temporal dependencies (see tutorial).",
  modality_graph:
    "**Nodes/edges**: topologies, PCBs, modules. Captures connectivity and multi-hop effects; graph neural layers are appropriate when relational structure is essential.",
  modality_field:
    "**2D/3D multi-physics** samples (flux, temperature). Geometry and PDE structure matter; CNNs or PINNs are common; treating fields as plain images may ignore physics.",
  modality_hybrid:
    "Multiple representations jointly (e.g., tabular + waveform + image). Use **multi-branch** encoders and fusion (concat, gating, attention).",
  data_abundance:
    "**Abundant**: enough labeled samples for supervised training. **Scarce**: prioritize **transfer learning**, **semi-supervised** or **generative** augmentation, and **physics-informed** constraints as in the paper—right-size the model to the label budget.",
  opt_dimension:
    "**Low-dimensional** design spaces often suit MHAs (PSO, GA, NSGA-II). **High-dimensional** (>100D) control or policy search is often cast as **RL** with deep actors/critics.",
  opt_space:
    "**Continuous** variables suit PSO/DE (vector arithmetic). **Discrete** combinatorial choices align with SA/ACO-style operators. **Hybrid** mixed spaces frequently use **GA**.",
  opt_objectives:
    "**Single-objective** returns one score. **Multi-objective** PE problems (efficiency vs. density vs. cost) use Pareto methods—e.g. NSGA-II/III with non-dominated sorting.",
  process_auto:
    "**Simulation automation** batches netlists/schematics (LTspice, PLECS, MATLAB APIs). **Agentic AI** uses LLM reasoning, RAG memory, and tool calls (e.g. PE-GPT paradigm).",
  control_role:
    "**AI as controller** embeds learned policies (RL or imitation NN). **Assist control design** builds surrogates or tunes gains—maps back to modeling or optimization branches.",
  policy_type:
    "**RL** learns from environment interaction and rewards (Markov decision process). **Imitation** learns to mimic an existing controller or surrogate—often an NN trained offline then optionally deployed.",
  deployment:
    "**Online** runs on hardware/MCU/FPGA with latency and memory limits—consider **TinyML**: quantization, pruning, shallow-wide nets, ONNX Runtime/TFLite as in the tutorial case study.",
  maint_fdd:
    "**Fault detection & diagnosis** maps measurements to health states. Supervision level (labels), task type (binary, multi-class, multi-label), and modality drive algorithm choice.",
  fdd_modality:
    "Pick how measurements are represented: **tabular** features per cycle, **signal** waveforms/spectra, **graph** circuit/topology features, or **unstructured** images/text—this determines classic ML vs. sequence models vs. GNN vs. CNN.",
  maint_sid:
    "**System identification** estimates parameters (L, R, etc.). Formulated like surrogate learning with physics consistency; inverse PINNs/PANNs appear in the paper’s examples.",
  maint_rul:
    "**Remaining useful life** often uses temporal models with **uncertainty** (Gaussian or mixture heads) when data are sparse—uncertainty grows in under-sampled regimes per the tutorial.",
  piml:
    "**Physics-informed ML** embeds governing equations or constraints via losses, architectures (PINN, PANN), or hybrid data—reduces data needs and improves trustworthiness.",
  mha_tuning:
    "Balance **exploration vs. exploitation** (e.g. PSO inertia schedules); customize when landscape is multi-modal (niching) or steep (gradient hints). Compare runs with **statistical tests** (t-test / ANOVA).",
  nn_practice:
    "Feature **scaling**, train/val/test splits, BatchNorm/LayerNorm placement, residual paths, early stopping, regularization (L1/L2), and architecture ablation—detailed in the tutorial and in course notebooks.",
};

const PAPER = {
  mha_explore:
    "The tutorial emphasizes early **global exploration** then **local exploitation** (e.g. decreasing PSO inertia); landscape-aware niching for multi-modal objectives.",
  mha_stats:
    "Use **t-tests** for two algorithms or **ANOVA** for multiple; report p-values and which mean is better.",
  nn_scaling:
    "PE features can differ by orders of magnitude—**standardization/normalization** avoids one feature dominating gradients (DAB example in the paper).",
  tinyml:
    "Case study: prefer **shallow-wide** over **deep-narrow** NNs at similar parameter counts for latency; **ONNX Runtime** gave ~5× speedup; quantization/pruning for MCUs.",
  signal_window:
    "Sliding-window **tabularization** of waveforms is common but can break causality and long-range dependencies—prefer recurrent or 1D CNN architectures when sequences matter.",
  piml_loss:
    "Combine data loss with **physics residuals**; weighting is problem-specific; PINNs can complement FEM for multi-physics.",
  eda:
    "**EDA:** histograms (spread, skew, modality), correlation maps (redundant features, latent equality constraints), **t-SNE** for manifold / transfer scenarios; from-to-viz catalog for plot choice.",
  transfer:
    "**Transfer learning:** reuse source-domain clusters; if target lies between clusters (interpolation gap), accuracy may suffer—partition data or fine-tune (DAB t-SNE example).",
  moo_pe:
    "**Multi-objective PE:** decomposition (weighted subproblems—normalize scales) vs. population Pareto methods (**NSGA-II/III**, non-dominated sorting). NSA exact on small discrete spaces; curse of dimensionality on continuous grids.",
  graph_invariants:
    "Graphs encode **topological connectivity**, **locality**, **multi-hop dependency**—suited to layouts, topologies, PCBs vs. naive categorical encoding.",
  fdd_multilabel:
    "**Multi-label** allows co-occurring faults (e.g. wire-bond liftoff + thermal runaway); use sigmoid + BCE per class, not softmax exclusivity.",
  agentic_stack:
    "**Agentic AI:** LLM + episodic/semantic/procedural **memory** (RAG), **tools** (simulation, parsing), **planning** (CoT, ReAct, plan-and-execute); PE-GPT exemplar.",
};

/** From algorithm_paths_extracted.txt — modality pairing + scarce branch */
export const PATH_ENUM_PAIRS = {
  tabular_tabular: {
    abundant:
      "**Paths 1–2 (tabular→tabular):** Tabular data are **rotation-variant**—column order matters. Strong fits: **classic ML**, **ensembles (XGBoost, RF)**, **feedforward NNs**; advanced: **Tabular Transformer**. *Enumeration doc:* XGBoost trains fast but **piecewise** surfaces can **extrapolate poorly** in sparse regions; **Tanh MLPs** tend to **smoother** surrogate landscapes.",
    scarce:
      "Keep models from Path 1; add **transfer learning**, **generative** augmentation, **semi-supervised** learning, **domain adaptation**, or **physics-informed** losses—**avoid oversized models** with few labels.",
    workflow:
      "**Paper workflow:** acquisition → **EDA** (correlation, t-SNE) → preprocessing (scaling, outliers) → train → hyperparameter tuning → deployment; steps 2–4 iterate when mispredictions reveal bad data.",
    pitfalls:
      "Skipping **feature scaling** when magnitudes span orders of magnitude distorts SVM/NN training (DAB example). Ignoring **correlation structure** leaves dependent or useless inputs (e.g. redundant phase-shift variables).",
  },
  tabular_signal: {
    abundant:
      "**Paths 3–4:** Use **FNN** on inputs, then **recurrent**, **1D CNN**, or **causal Transformer** blocks on outputs. *Enumeration:* sequence generator—tabular in, **waveform/spectrum out**.",
    scarce: "Same as Path 3; add **TL**, **physics priors**, or **targeted augmentation** on the sequence side.",
    workflow: "Encode static design/context with MLP; decode time or frequency with sequence layers respecting **causality** (masks for conv/attention if predicting future samples).",
    pitfalls: "Do not flatten long outputs into independent tabular slots—breaks temporal structure emphasized in the tutorial.",
  },
  tabular_graph: {
    abundant:
      "**Paths 5–6:** **FNN** front → **GNN** decoder (GCN, GAT, GraphSAGE, temporal GNN). *Enumeration:* **graph generative** models conditioned on tabular inputs (e.g. candidate topologies).",
    scarce: "Same backbone; add TL or graph-regularized losses when graph labels are rare.",
    workflow: "Tabular conditioning vector → graph decoder; validate generated graphs against design rules.",
    pitfalls: "Treating topology as a single categorical ID discards connectivity—**graph section** of the paper vs. relational modeling.",
  },
  tabular_field: {
    abundant:
      "**Paths 7–8:** FNN → **CNN** field head, **PINN** with coupled physics, or **FNN-on-flattened** field. *Enumeration:* field modeling from parameters—efficiency, loss density maps.",
    scarce: "PINN with physics residuals; blend sparse experiments with **physics-informed** regularization under small label sets.",
    workflow: "Parameter vector → decoder grid; PINN: add PDE residual + boundary terms to data loss.",
    pitfalls: "Pure image-CNN on fields may ignore **geometry and multi-physics coupling**—open research vs. PINN/geometry-aware operators.",
  },
  tabular_hybrid: {
    abundant:
      "**Paths 9–10:** **Modular NNs:** per-modality encoders → **concat / attention / gating** → mixed heads. *Enumeration:* performance modeling, control, RUL-style tabular targets from heterogeneous inputs.",
    scarce: "Modular fusion + TL; pretrain encoders per modality when possible.",
    workflow: "Branch → fused embedding → task head; ablation per branch (Occam’s razor in paper).",
    pitfalls: "Over-parameterized fusion without enough data—regularize and validate each branch.",
  },
  signal_tabular: {
    abundant:
      "**Paths 11–12:** **RNN/LSTM/GRU/BiLSTM**, **1D CNN**, **attention**, state-space (**Mamba**); output **FNN**. *Enumeration:* **locality + causality**; **BiLSTM** only if backward context is **physically allowed** (no leakage); 1D CNN needs **dilation/stacking** for long range; **causal masks** for conv/attention when predicting hidden future samples.",
    scarce: "Same encoders + TL/PIML; align waveforms to switching edges to reduce phase ambiguity (tutorial DAB time-series).",
    workflow: "Sequence encoder → pooling → scalar/vector head; EDA on waveforms before windowing.",
    pitfalls: "**Sliding-window + tabular ML** alone can break long-range dependencies and causality—paper Dataset III vs. recurrent models.",
  },
  signal_signal: {
    abundant:
      "**Paths 13–14:** Full **seq2seq**: RNN/LSTM/GRU/BiLSTM, 1D CNN, attention, Mamba; **PANN** if physics is explicit—*enumeration:* large data/model reduction when physics is embedded. Encoder–decoder structure.",
    scarce: "PANN/PINN priors; augment or structure sequences with physics-consistent synthetic or masked modeling where helpful.",
    workflow: "Encoder–decoder or shared-body seq2seq; teacher forcing / scheduled sampling as needed.",
    pitfalls: "PANN requires **correct physics structure**—misspecification hurts (paper).",
  },
  signal_graph: {
    abundant:
      "**Paths 15–16:** Temporal encoder → **GNN** (graph gen conditioned on signals—e.g. waveform-in, topology-out).",
    scarce: "TL on graph decoder; constrain generation to feasible topologies.",
    workflow: "Encode waveform → latent → graph decoder; tie-break with domain rules.",
    pitfalls: "High complexity—validate on small graph sizes first.",
  },
  signal_field: {
    abundant:
      "**Paths 17–18:** Temporal encoder → **CNN** field or **PINN** coupling measurements to PDE-governed maps.",
    scarce: "Physics loss + sparse field labels.",
    workflow: "Time-series branch + field decoder; multi-physics loss weighting.",
    pitfalls: "Balancing temporal vs. spatial losses requires tuning.",
  },
  signal_hybrid: {
    abundant:
      "**Paths 19–20:** Temporal encoder → **modular fusion** → mixed heads (gating/attention).",
    scarce: "Per-branch pretraining + TL into fusion module.",
    workflow: "Align time indices across branches before fusion.",
    pitfalls: "Modalities at different rates need resampling or separate encoders.",
  },
  graph_tabular: {
    abundant:
      "**Paths 21–22:** **GNN** layers → **FNN** head. *Enumeration:* **connectivity, locality, multi-hop** dependency; graphs **directed or undirected**.",
    scarce: "Graph contrastive / TL from large graph corpora when labels are few.",
    workflow: "Message passing → graph readout (pool) → tabular prediction.",
    pitfalls: "**Over-smoothing** in deep GNNs—depth and skip connections matter.",
  },
  graph_signal: {
    abundant:
      "**Paths 23–24:** GNN → **RNN/1D CNN/Transformer** (causal) for sequences. Graph-defined structure, sequence output.",
    scarce: "Pretrain GNN on topology-only tasks if available.",
    workflow: "Spatio-temporal stacking: GNN per time step or coupled ST-GNN.",
    pitfalls: "Memory when graph × time is large—sampling and windowing.",
  },
  graph_graph: {
    abundant:
      "**Paths 25–26:** End-to-end **GNN** (graph-to-graph): editing, matching, generation.",
    scarce: "Regularize with validity constraints; few-shot graph adaptation.",
    workflow: "Encoder–decoder on graphs; validity loss on edges/nodes.",
    pitfalls: "Combinatorial output space—constrained decoding helps.",
  },
  graph_field: {
    abundant:
      "**Paths 27–28:** GNN → **CNN/PINN** field head—field from relational structure.",
    scarce: "Couple graph embedding with physics residuals on field grid.",
    workflow: "Graph encoder supplies global/context features to field network.",
    pitfalls: "Registering graph nodes to field coordinates may need attention or projection.",
  },
  graph_hybrid: {
    abundant:
      "**Paths 29–30:** GNN + **modular fusion** for hybrid outputs.",
    scarce: "Modality dropout / TL per branch.",
    workflow: "Parallel graph + other encoders → fusion → multi-head outputs.",
    pitfalls: "Balance parameter counts across branches to avoid one modality dominating.",
  },
  field_tabular: {
    abundant:
      "**Paths 31–32:** **CNN** or flattened **FNN** on fields → **FNN** head; **PINN** when physics known. *Enumeration:* CNN gives locality but **geometry + coupled multi-physics** embedding remains **open research**.",
    scarce: "PINN + sparse labels; **multi-fidelity** or blended sources when available—physics residuals remain primary.",
    workflow: "Field tensor → global pooling → regression; or PINN collocation + labels.",
    pitfalls: "Treating field as plain image may miss **boundary conditions** and **PDE structure**.",
  },
  field_signal: {
    abundant:
      "**Paths 33–34:** Field encoder → **RNN/1D CNN** decoder (**field-to-signal** encoder–decoder).",
    scarce: "Physics-informed temporal losses.",
    workflow: "Encode spatial snapshot sequence if dynamics evolve; else CNN→1D for sequences from static fields.",
    pitfalls: "Temporal alignment between field frames and output sequence.",
  },
  field_graph: {
    abundant:
      "**Paths 35–36:** Field CNN → **GNN** (e.g. **hardware synthesis**: target field performance → graph structure).",
    scarce: "Constrained graph generation from partial field observations.",
    workflow: "Field embedding conditions graph decoder; rule checks post-hoc.",
    pitfalls: "Inverse mapping ill-posed—needs strong priors or human-in-the-loop.",
  },
  field_field: {
    abundant:
      "**Paths 37–38:** CNN/FNN + **PINN** for **field→field** (super-resolution, cross-physics).",
    scarce: "Physics-regularized training with very few paired fields.",
    workflow: "Shared encoder or U-Net; PINN: PDE residual between predicted and observed fields.",
    pitfalls: "Loss weighting between data and PDE terms—sensitive (paper).",
  },
  field_hybrid: {
    abundant:
      "**Paths 39–40:** Field branch + **modular fusion** to hybrid outputs.",
    scarce: "Per-modality denoising + fusion with uncertainty weighting.",
    workflow: "Normalize field tensors vs. tabular scales before fusion.",
    pitfalls: "High-dimensional fusion overfits easily—strong val monitoring.",
  },
  hybrid_tabular: {
    abundant:
      "**Paths 41–42:** **Modular encoders** → concat embeddings → **FNN**. *Enumeration:* performance modeling, control, **RUL** with heterogeneous measurements.",
    scarce: "SSL/TL on abundant unlabeled multimodal data + few labels.",
    workflow: "Branch per modality → fusion → head; optional auxiliary losses per branch.",
    pitfalls: "Missing modality at inference—train with dropout of branches.",
  },
  hybrid_signal: {
    abundant:
      "**Paths 43–44:** Modular → **RNN/1D CNN/Transformer** sequence outputs.",
    scarce: "Sequence TL + masked modeling on partial modalities.",
    workflow: "Time-align branches; causal decoding for online settings.",
    pitfalls: "Sequence length mismatch across sensors—resample or attention alignment.",
  },
  hybrid_graph: {
    abundant:
      "**Paths 45–46:** Modular → **GNN** (graph gen conditioned on hybrid inputs).",
    scarce: "Graph pretraining on topology-only data.",
    workflow: "Fuse to latent → graph decoder with feasibility checks.",
    pitfalls: "Graph output validity under combined noise sources.",
  },
  hybrid_field: {
    abundant:
      "**Paths 47–48:** Modular → **CNN/PINN** field heads.",
    scarce: "Physics losses + multimodal missingness handling.",
    workflow: "Field branch at appropriate resolution; fuse before or after field decode (design choice).",
    pitfalls: "GPU memory for high-res fields + other branches.",
  },
  hybrid_hybrid: {
    abundant:
      "**Paths 49–50:** End-to-end **modular fusion**—all modalities to mixed heads.",
    scarce: "Heavy use of TL, self-supervised pretraining per encoder.",
    workflow: "Staged training: encoders frozen → finetune fusion → optional end-to-end.",
    pitfalls: "Highest overfitting risk—**Occam’s razor** and ablations (paper).",
  },
};

/** Shown on modeling / maintenance flows — tutorial §IV, tightened */
export const TUTORIAL_ML_PIPELINE = `
<p><strong>Workflow (top-down):</strong> acquire data → <strong>EDA & preprocess</strong> (histograms, correlations, scaling, outliers, t-SNE when structure matters) → train → tune → deploy. Treat steps 2–4 as a <em>loop</em>: bad errors usually mean bad data or leakage.</p>
<p><strong>Framing:</strong> <em>When</em> is learning justified? <em>What</em> modality and model class fit? <em>How</em> will you validate (hold-outs; for stochastic search, statistical tests across runs)?</p>
`;

/** Optimization paths 51–59 — concise */
export const OPTIMIZATION_REVIEW_HTML = `
<ul class="report-list">
  <li><strong>51–53 (high-D RL):</strong> match action space (continuous vs discrete vs hybrid); reward design, sim-to-real, and safety matter more than algorithm labels—compare seeds and report spread.</li>
  <li><strong>54–59 (low-D MHA):</strong> PSO/DE on continuous vectors; GA/SA/ACO on discrete/hybrid; NSGA-II/III for Pareto fronts—<strong>normalize objectives</strong> before weighted sums or crowding.</li>
</ul>`;

/** Maintenance — FDD/RUL cross-checks */
export const MAINTENANCE_REVIEW_HTML = `
<ul class="report-list">
  <li><strong>EDA:</strong> same as modeling—correlation for redundancy, t-SNE for regimes and transfer gaps.</li>
  <li><strong>Multi-label faults:</strong> sigmoid + BCE per class (not softmax) when faults co-occur.</li>
</ul>`;

const NB = {
  package: "0_To_Get_Started/package_install.ipynb",
  singMha: "1_MHA/Single_Objective_MHA/sing_obj_MHA.ipynb",
  buckPso: "1_MHA/Single_Objective_MHA/buck_design_PSO.ipynb",
  psoTune: "1_MHA/Single_Objective_MHA/pso_hyp_tuning.ipynb",
  algoStats: "1_MHA/Single_Objective_MHA/algorithm_stats_compare.ipynb",
  moo: "1_MHA/Multi_Objective_MHA/multi_obj_MHA_master.ipynb",
  mhaReadme: "1_MHA/README.md",
  classic: "2_Classic_ML/classic_ML.ipynb",
  ensemble: "3_Ensemble_Learning/ensemle_learning.ipynb",
  nnBasics: "4_Neural_Network/Fundamentals/NN_basics.ipynb",
  nnGood: "4_Neural_Network/Good_Practices/good_practice_NN.ipynb",
  rnn: "4_Neural_Network/Signal_Domain/rnn_basics.ipynb",
  mdn: "4_Neural_Network/Multi_Modal_Distribution/mixture_density_net_ensemble_learning.ipynb",
  pinnOde: "5_PIML/PINN/pinn_ode.ipynb",
  pinn1: "5_PIML/PINN/prior_integration_example.ipynb",
  pinn2: "5_PIML/PINN/prior_integration_example2.ipynb",
  pimlReadme: "5_PIML/README.md",
  pannReadme: "5_PIML/PANN/README.md",
  agentic: "6_Agentic_AI/README.md",
  rl: "7_Reinforcement_Learning/README.md",
  ltspice: "8_PE_Simulation_Automation/LTspiceAutomation/LTspiceAtuomate.ipynb",
  plecs: "8_PE_Simulation_Automation/PlecsAutomation/Data acquisition.ipynb",
  simReadme: "8_PE_Simulation_Automation/README.md",
  buckFull: "9_Case_Studies_PE/Buck_Design/buck_comprehensive_case_study.ipynb",
  buckNn: "9_Case_Studies_PE/Buck_Design/buck_modeling_NN.ipynb",
  buckXgb: "9_Case_Studies_PE/Buck_Design/xgboost_buck_modeling.ipynb",
  dabOne: "9_Case_Studies_PE/DAB_Design/Performance_Modeling_and_Design/one_stop_AI_DAB_modulation.ipynb",
  dabTs: "9_Case_Studies_PE/DAB_Design/Time_Domain_Modeling/time_series_modeling.ipynb",
  tinyml: "9_Case_Studies_PE/DAB_Design/Adaptive_Modulation/TinyML.ipynb",
  magnetFnn: "9_Case_Studies_PE/Magnetic_Modeling/magnet_fnn.ipynb",
  magnetLstm: "9_Case_Studies_PE/Magnetic_Modeling/magnet_lstm.ipynb",
  rul: "9_Case_Studies_PE/IGBT_Maintenance/rul_prediction.ipynb",
  caseReadme: "9_Case_Studies_PE/README.md",
  graphNN: "4_Neural_Network/Graph_NN/README.md",
};

function repoLinks(paths, labels) {
  return paths.map((p, i) => ({
    label: labels?.[i] || p.split("/").pop(),
    href: ghBlob(p),
  }));
}

/** @param {number} inIdx 0..4 */
/** @param {number} outIdx 0..4 */
export function modelingPathId(inIdx, outIdx, scarce) {
  return 1 + inIdx * 10 + outIdx * 2 + (scarce ? 1 : 0);
}

const MOD_LABELS = ["Tabular", "Signal-domain", "Graph", "Field", "Hybrid"];

/**
 * @returns {{ pathId: number, title: string, summary: string, algorithms: object[], flags: object, extras: object, scarceHtml?: string, tutorialPipelineHtml?: string, pathEnumAbundant?: string, pathEnumScarce?: string, pathWorkflow?: string, pathPitfalls?: string, reviewContextHtml?: string }}
 */
export function buildModelingRecommendation(inKey, outKey, scarce) {
  const idx = { tabular: 0, signal: 1, graph: 2, field: 3, hybrid: 4 };
  const i = idx[inKey];
  const o = idx[outKey];
  const pathId = modelingPathId(i, o, scarce);
  const tin = MOD_LABELS[i];
  const tout = MOD_LABELS[o];

  const scarceNote = scarce
    ? `<p class="paper-note"><strong>Scarce labels:</strong> favor <strong>transfer learning</strong>, <strong>semi-supervised</strong> or <strong>generative</strong> augmentation, and <strong>physics-informed</strong> constraints (${ghBlob(
        NB.pinn1
      )}) where applicable; <strong>avoid oversized models</strong> for the label budget.</p>`
    : "";

  const pe = PATH_ENUM_PAIRS[`${inKey}_${outKey}`];
  const pathExtra = pe
    ? {
        pathEnumAbundant: pe.abundant,
        pathEnumScarce: scarce ? pe.scarce : "",
        pathWorkflow: pe.workflow,
        pathPitfalls: pe.pitfalls,
      }
    : {};

  const base = MODEL_PAIRS[`${inKey}_${outKey}`];
  if (!base) {
    return {
      pathId,
      title: `Modeling — ${tin} → ${tout}${scarce ? " (scarce)" : " (abundant)"}`,
      summary: "See tutorial for modality pairing.",
      algorithms: [],
      flags: { nn: true, mha: false, tinyml: false, piml: false },
      extras: { nn: true, mha: false, tinyml: false, piml: false },
      scarceHtml: scarceNote,
      tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
      reviewContextHtml: scarce ? `<p class="paper-note">${PAPER.transfer}</p>` : "",
      ...pathExtra,
    };
  }

  return {
    pathId,
    title: `Path ${pathId}: ${tin} → ${tout}${scarce ? " — scarce data" : " — abundant data"}`,
    summary: base.summary,
    algorithms: base.algorithms,
    flags: base.flags,
    extras: base.extras,
    scarceHtml: scarceNote,
    tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
    /* EDA lives in TUTORIAL_ML_PIPELINE; only add transfer when scarce */
    reviewContextHtml: scarce ? `<p class="paper-note">${PAPER.transfer}</p>` : "",
    ...pathExtra,
  };
}

/** Pair-specific content (abundant branch); scarce adds generic note */
const MODEL_PAIRS = {
  tabular_tabular: {
    summary:
      "Surrogate mapping from design/operating features to performance metrics. Tree ensembles align with **rotation-variant** tabular structure; FNNs yield smoother surrogates (tutorial buck/DAB examples).",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "XGBoost / Random Forest",
        intro:
          "Gradient-boosted trees and bagged trees are strong **baselines** on tabular PE data: they respect column semantics and handle nonlinearities; piecewise surfaces may **extrapolate poorly** in sparse regions.",
        architecture: arch(
          "The **input layer** is a fixed-order **tabular vector**: scaled numeric features plus encoded categoricals. The modality interface is column-wise and **rotation-variant** (column order carries meaning), which matches PE design tables and operating-condition datasets.",
          "The **hidden structure** is an ensemble of trees. Each split creates piecewise regions in feature space, revealing invariants as **axis-aligned decision rules** and feature-threshold interactions. Boosting adds residual correction across trees; bagging stabilizes variance through bootstrap aggregation.",
          "The **output layer** aggregates leaf values: weighted sums for regression or logits/probabilities for classification. **Loss** follows the learning task: squared error/Huber for supervised regression, logistic loss or cross-entropy for supervised classification. The training objective directly ties to labeled tabular outputs."
        ),
        tuning:
          "Depth, estimators, learning rate (XGBoost); subsample/colsample; **class imbalance** handling for FDD. Paper: correlation/t-SNE-driven feature pruning (DAB example).",
        tricks:
          "Plot **feature importance** and **SHAP**-style attributions to catch spurious columns; in **sparse** regions prefer **targeted augmentation** or smooth MLPs over deep trees.",
        caseStudy:
          "**Buck** efficiency/ripple modeling and **DAB** current stress / ZVS classification in the tutorial case studies.",
        paper: PAPER.nn_scaling,
        links: repoLinks(
          [NB.buckXgb, NB.ensemble, NB.dabOne],
          ["xgboost_buck_modeling.ipynb", "ensemle_learning.ipynb", "one_stop_AI_DAB_modulation.ipynb"]
        ),
        external: [
          { label: "Why tree models excel on tabular data (Grinsztajn et al., arXiv) — cited in paper", href: "https://arxiv.org/abs/2111.01889" },
        ],
      },
      {
        name: "Feedforward neural networks (MLP)",
        intro:
          "Universal approximators for **tabular → tabular** surrogates: each column is a physically meaningful coordinate, so the **input** is the full feature row after **scaling/normalization**. The tutorial contrasts **piecewise tree** surfaces with **smoother** MLP landscapes—often **Tanh** or SiLU—for interpolation between simulation or lab points.",
        architecture: arch(
          "The **input layer** is one **vector** per sample: length = number of **tabular** fields after **scaling/normalization**, plus **one-hot** or **small embeddings** for categoricals. This is exactly how **tabular modality** is interfaced—each component maps to a **named physical variable** (rating, duty, loss, etc.); **permuting columns would corrupt meaning**, so the net sees a **fixed-order** design vector, matching the paper’s **rotation-variance** point.",
          "**Hidden** layers are **fully connected** stacks (**2–4** blocks, widths often **32–512**) with **Tanh/SiLU**. That stack **encodes** an invariant of **smooth, composable nonlinear maps** over the operating envelope (unlike **axis-aligned tree** splits). **LayerNorm** and **residual** FC paths help when features span **orders of magnitude** after scaling—aligning with the tutorial’s emphasis on **feature scaling** before NNs.",
          "The **output layer** is **affine**: **one unit per continuous KPI** for **regression** or **C logits** for **C-way classification** (**softmax**). **Loss** is **MSE/Huber** when targets are real-valued efficiencies/stresses (**supervised regression**), or **cross-entropy** when targets are discrete labels (**supervised classification**)—each loss directly scores mismatch against **labeled outputs** for the task. **Weight decay** and **early stopping** regularize optimization but are not part of the forward I/O contract."
        ),
        tuning:
          "Depth/width, early stopping, **L1/L2**, learning rate schedules; always **scale features** for PE magnitudes.",
        tricks:
          "**Residual** connections and **LayerNorm** stabilize deeper MLPs on heterogeneous scales; compare against **Tabular Transformer** when column interactions are subtle.",
        caseStudy: "DAB and buck NN surrogates vs. XGBoost in tutorial §VII.",
        paper: PAPER.nn_scaling,
        links: repoLinks([NB.buckNn, NB.nnBasics, NB.dabOne]),
        external: [{ label: "PyTorch documentation — MLP", href: "https://pytorch.org/docs/stable/generated/torch.nn.Linear.html" }],
      },
    ],
  },
  tabular_signal: {
    summary:
      "Sequence generation or regression from static features—use recurrent or 1D conv **decoders**; avoid treating generated sequences as independent tabular slots.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Encoder–decoder (FNN + RNN/CNN/Transformer)",
        intro:
          "Maps **static tabular context** (design, setpoints) to a **sequence** (waveform, spectrum, time series of losses). A **tabular encoder** summarizes context; a **sequence decoder** must respect **causality** and **locality** along time or frequency—do not treat output samples as unrelated scalar slots.",
        architecture: arch(
          "**Input** has two roles: (1) **tabular encoder input**—a **scaled feature vector** (design, setpoint, ambient) that **conditions** the whole sequence; (2) **decoder inputs**—during training, **previous output tokens** or **teacher-forced** targets; at inference, **autoregressive** feedback. **Signal-domain modality** appears only in the **decoder path** as **ordered** time or frequency bins—**not** as independent scalar slots—so the interface respects **sequence structure**.",
          "The **hidden** stack is an **MLP encoder** → **context vector** **z**, then a **decoder** of **LSTM/GRU**, **causal 1D CNN**, or **masked Transformer** blocks. That design **enforces invariants** of **locality** and **causality** along the sequence axis (what the paper stresses vs. naive windowing). **Bi-directionality** belongs only where **future context** is physically known (e.g. offline spectra); otherwise **causal masks** preserve **physical time order**.",
          "**Outputs** are **per-step linear** projections: **real amplitudes** (**regression**) or **logits** (**classification**) for each time/frequency index. **Loss** sums **MSE/CE** over **valid** positions (and **masks** padding)—directly aligning with **supervised sequence** targets such as a waveform template or spectral envelope. The learning task is **conditional generation** of **signal modality** from **tabular context**."
        ),
        tuning: "Sequence length, hidden size, mask causal conv/attention for forecasting tasks.",
        tricks:
          "If outputs are **spectra**, treat frequency bins as sequence or use **1D CNN** with appropriate padding; align phase with a **reference edge** (switching instant) when waveforms are misaligned.",
        caseStudy: "Tutorial warns against **sliding-window-only** pipelines for long dependencies.",
        paper: PAPER.signal_window,
        links: repoLinks([NB.rnn, NB.dabTs]),
        external: [{ label: "Attention Is All You Need (Vaswani et al.)", href: "https://arxiv.org/abs/1706.03762" }],
      },
    ],
  },
  tabular_graph: {
    summary:
      "Graph outputs from tabular conditioning—graph decoders / autoregressive graph generation; **no dedicated GNN notebook** in the public repo yet.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Graph neural networks (GCN, GAT, GraphSAGE)",
        intro:
          "Generate or refine **graphs** (nodes/edges = devices, nets, layout) **conditioned** on tabular design specs. The paper stresses **connectivity** and **multi-hop** effects for layouts and EMI—decoders are often **autoregressive** (add edge/node) or **one-shot** matrix heads with validity constraints.",
        architecture: arch(
          "**Input layer** fuses **tabular modality** (global specs as a vector, sometimes **broadcast** onto nodes or concatenated to each node state) with **graph modality**: **node features** (device types, ratings, pins) and **edge features** (net class, parasitic tags) plus **topology** (**adjacency**). The interface is **relational**: the same net sees **who connects to whom**, not a single categorical **layout ID**.",
          "**Hidden** layers are **message-passing** (**GCN**, **GraphSAGE**, **GAT**): each step **aggregates neighbors**, revealing invariants of **connectivity**, **local neighborhoods**, and **multi-hop influence**—the tutorial’s graph invariants. Depth trades **receptive field** vs. **over-smoothing**; **attention** (GAT) weights which edges matter for EMI or stress paths.",
          "**Outputs** are **logits** over **edges/nodes** (**BCE/CE**) for **discrete** structure, or **linear** heads for **continuous** attributes. **Loss** matches the **generative or refinement task**: e.g. **cross-entropy** on supervised topology, **MSE** on continuous attributes, plus optional **soft penalties** for **Kirchhoff** or **design rules**—linking optimization to **feasible** PE graphs."
        ),
        tuning: "Layers, heads (GAT), neighbor sampling for large graphs.",
        tricks:
          "Validate generated graphs with **design rules** (netlists, clearance) before trusting optimizers; combine **graph VAE / autoregressive** decoders with constraint penalties.",
        caseStudy: "Paper cites graph-based layout/EMI motivation; PE-GPT can orchestrate tools.",
        paper: "See graph data subsection and **Circuit-to-Graph** reference in the tutorial.",
        links: repoLinks([NB.graphNN, NB.agentic], ["Graph_NN/README.md", "6_Agentic_AI/README.md (workflow context)"]),
        external: [
          { label: "PyTorch Geometric", href: "https://pytorch-geometric.readthedocs.io/" },
          { label: "IEEE Access — GNN opportunities in PE (Li et al.)", href: "https://ieeexplore.ieee.org/document/10273109" },
        ],
      },
    ],
  },
  tabular_field: {
    summary:
      "Field prediction from parameters—**PINNs** couple data with PDE residuals; CNN decoders possible but may miss explicit physics.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Physics-informed neural networks (PINN)",
        intro:
          "A scalar or vector field **u** (temperature, potential, flux-related quantity) is represented by an MLP or CNN over **coordinates** (and parameters). Training blends **supervised** points with **PDE residuals** at **collocation** points so the net respects governing equations; supports **inverse** mode to identify unknown coefficients.",
        architecture: arch(
          "**Input layer** concatenates **field modality** support—**coordinates** **(x,y,z,t)** (often **normalized**)—with optional **tabular/design parameters** (material, geometry knobs) so the same network can **condition** the field on the converter instance. **Collocation points** are additional **inputs** used only in the **PDE term**, not as supervised labels.",
          "**Hidden** trunk is an **MLP** (or **conv** on structured grids) that approximates **u(x,…)**. Its role is to be **flexible** enough to fit data while **PDE residuals** in the loss **impose invariants** of **governing equations** and **boundaries**—the **physics-informed** invariant rather than pure **translation equivariance** of a blind CNN.",
          "**Output** is field value(s) **u** (or **multi-channel** fields); **inverse PINNs** also expose **trainable scalars** (**R**, **k**) that enter the **residual**. **Loss** = **MSE** on **measured** points (**supervised** fit to **field or probe data**) + **λ**·**‖PDE(u)‖²** (+ **BC/IC** terms). **λ** balances **data vs. physics**; the learning task is **regression under PDE constraints**, not classification."
        ),
        tuning: "Loss weighting data vs. PDE terms; learning rate; many epochs may be needed.",
        caseStudy: "Tutorial apparent-power constraint example; thermal/EM PDE contexts.",
        paper: PAPER.piml_loss,
        links: repoLinks([NB.pinnOde, NB.pinn1, NB.pinn2, NB.pimlReadme]),
        external: [{ label: "Physics-informed ML — Nature Reviews Physics survey (cited in paper)", href: "https://www.nature.com/articles/s42254-021-00314-5" }],
      },
      {
        name: "CNN / FNN field decoders",
        intro:
          "When explicit **PDE residuals** are optional, treat **gridded** field data as **2D/3D tensors**: a **CNN encoder–decoder** (or U-Net) maps **parameter vector** or **coarse field** to **fine field**; alternatively **flatten** voxels and use an **MLP** (loses locality but simple for small grids).",
        architecture: arch(
          "**Input** couples **tabular modality** (parameters as an **MLP** vector, sometimes **broadcast** or **FiLM**-scaled into conv feature maps) with **field modality** as a tensor **(C×H×W)**—channels may be **material IDs**, **sources**, or **coarse** physics fields. The **interface** is **hybrid**: static **design context** modulates **spatial** computation.",
          "**Hidden** **encoder–decoder** (**U-Net**-style or stacked **conv**) assumes **local spatial correlation** (**CNN invariants**: locality, weight sharing across space) but **does not** embed **PDE** unless you add a **PINN** term. Skip links preserve **multi-scale** structure (fine hotspots inside coarse envelopes)—useful for **thermal/flux** patterns.",
          "**Output** is a **field tensor** aligned with targets (same **H×W** or a **super-resolution** target). **Loss** is **MSE/L1** on pixels (**supervised field regression**); optional **gradient** loss sharpens **interfaces**. Adding **PDE residuals** later turns the training objective into **physics-regularized** regression."
        ),
        tuning: "Convolution kernel sizes, depth; normalization layers.",
        caseStudy: "**Magnetic modeling** notebooks use NN field mappings.",
        paper: "Field data section contrasts image-like treatment vs. geometry-aware modeling.",
        links: repoLinks([NB.magnetFnn]),
        external: [],
      },
    ],
  },
  tabular_hybrid: {
    summary:
      "Multi-branch encoders per modality → fusion (concat / attention / gating) → mixed heads. **DAB one-stop** notebook is closest end-to-end.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Modular deep networks",
        intro:
          "Each **modality** (tabular, waveform snippet, image, graph) has its own **encoder**; **fusion** (concat, **attention**, **gating**) forms a joint embedding before **task heads**. Matches heterogeneous PE datasets (e.g. operating point + scope capture + thermal image).",
        architecture: arch(
          "Each **modality** has its own **input interface**: **tabular** → **MLP** input vector; **signal** → **1D** tensor; **field** → **2D/3D** grid; **graph** → **node/edge** tensors. **No early concatenation** of raw pixels with scalars—each branch **encodes** its native structure first, which preserves **per-modality invariants** before fusion.",
          "**Hidden** stacks are **parallel encoders** → embeddings **e₁, e₂, …**; **fusion** (**concat+MLP**, **gating**, or **cross-attention**) learns **which modality** drives which regime. Invariants: **tabular rotation-variance** stays inside the **MLP**; **translation/ locality** stays inside **CNN**; **causality** inside **RNN/1D CNN**; **connectivity** inside **GNN**.",
          "**Output heads** are **task-specific**: **linear** scalars (**MSE**), **softmax** (**CE**), etc. **Loss** is typically **Σ wᵢ Lᵢ** over tasks plus optional **auxiliary** self-supervised terms per branch—explicitly tying training to **multi-task** PE objectives (efficiency + hotspot + classification) when labels exist."
        ),
        tuning: "Per-branch widths, dropout, fusion choice; ablation recommended in paper.",
        caseStudy: "**one_stop_AI_DAB_modulation.ipynb** multi-model workflow.",
        paper: PAPER.nn_practice,
        links: repoLinks([NB.dabOne, NB.buckFull]),
        external: [],
      },
    ],
  },
  signal_tabular: {
    summary:
      "Waveforms/spectra → scalar or vector outputs (efficiency, RMS stress). Recurrent or 1D CNN **encoders**; BiLSTM only if backward context is physically admissible.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "LSTM / GRU / 1D CNN / Transformer encoders",
        intro:
          "Maps **waveform or spectrum** to **tabular** labels (efficiency class, fault, RMS stress). The encoder must respect **order** along time or frequency; the tutorial contrasts this with **sliding-window + MLP** that drops long-range and causal structure.",
        architecture: arch(
          "The **input layer** presents **signal-domain** data as a **tensor (batch, channels, length)**: channels are **voltage/current** traces, **harmonic amplitudes**, or **spectral bins**. **Interface to modality:** the **ordering** along **length** is **meaningful** (time or frequency index)—you **normalize** amplitude and often **align** to a **switching edge** so phase is comparable across samples. This is **not** tabular: shuffling positions destroys **causality** and **locality**.",
          "**Hidden** layers are **LSTM/GRU** stacks, **dilated 1D CNNs**, or **Transformer** blocks with **causal masks** where **future** must not leak into the representation. They **encode invariants** of **sequential locality** (neighboring samples related), **multi-scale** structure (ringing inside envelopes), and **causal** propagation—what the tutorial contrasts with **windowed MLPs**. **BiLSTM** only if **backward** context is **physically observable** (e.g. offline batch). **Pooling** (last state, **attention**, or **GAP**) **collapses** time to a **vector** for **tabular-style** targets.",
          "The **output layer** is **linear** on the pooled embedding: **K** units for **K-way softmax** (**classification** of health mode / efficiency bin) or **one** unit per **regression** target (**MSE/Huber** loss). **Loss** directly implements the **supervised task**: match **labels** (fault class, RMS stress, efficiency). **Weighted CE** or **focal loss** address **rare** fault classes—still **supervised**, not generative."
        ),
        tuning: "Hidden size, layers, bidirectionality (check leakage), calibration to switching edges.",
        tricks:
          "Align windows to **switching edges** or fundamental frequency to reduce **phase ambiguity**; use **causal** masks for conv/Transformer when predicting **future** samples the system has not yet seen.",
        caseStudy: "**time_series_modeling.ipynb** (DAB); RUL waveform inputs.",
        paper: PAPER.signal_window,
        links: repoLinks([NB.dabTs, NB.rnn]),
        external: [],
      },
      {
        name: "PANN (physics-in-architecture RNN)",
        intro:
          "Instead of a generic LSTM, **states and transitions** follow **converter equations** (switching, averaged, or hybrid models) with **trainable parameters**—reduces data needs when the **structure** matches the real hardware (see PANN README).",
        architecture: arch(
          "**Input** is **signal + control modality**: time-aligned **measurements** (and **duty/commands**) fed into a **template-specific** interface; some formulations need **initial states**. Unlike a generic RNN, the **input ports** are tied to **defined physical variables** in the PANN structure (state, input, output of the **average/switching** model).",
          "**Hidden** “layers” are **state updates** prescribed by **converter physics** (averaged, switched, or hybrid), with **trainable** parameters inside—**not** free **LSTM** gates. The **invariant** is **consistency with assumed dynamics**: the representation **propagates** like the **true system** up to learnable **R, L, C**, etc. Wrong **template** breaks this before **loss** choice matters.",
          "**Output** heads read **predicted waveforms**, **internal states**, or **identified parameters**. **Loss** is **MSE** (or **Huber**) against **measured** traces—**supervised** **regression** of time series—plus optional **L2** on parameters. The **task** is **identification** or **simulation matching**, not softmax classification."
        ),
        tuning: "Physics fidelity vs. expressiveness trade-off.",
        caseStudy: "Paper §VII parameter identification with PANN-style inverse training.",
        paper: "PANN section + case study figures.",
        links: [{ label: "5_PIML/PANN/README.md", href: ghBlob(NB.pannReadme) }],
        external: [],
      },
    ],
  },
  signal_signal: {
    summary:
      "**Seq2Seq** modeling—encoder–decoder LSTMs, waveform-to-waveform; PANN for physics-consistent waveforms.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Seq2Seq RNN / causal Transformer",
        intro:
          "**Input trajectory** (e.g. reference command, grid disturbance) maps to **output trajectory** (current, voltage) with **shared** or **autoregressive** decoding so time alignment is explicit.",
        architecture: arch(
          "**Input** is **signal → signal**: **source** sequence **(T_in × C)** (e.g. reference, disturbance). **Modality interface:** both ends are **ordered** along time or frequency; **channels** are **physically defined** measurements or references.",
          "**Hidden** **encoder** (**RNN/1D CNN/Transformer**) builds a **context** over the **input** invariant to **naive permutation** (it respects **order**). **Decoder** is **autoregressive** (**RNN** with previous output) or **cross-attention** to encoder states, with **causal** masks for **generation**. Invariants: **local smoothness**, **causality**, and often **multi-scale** transients inside slower envelopes.",
          "**Output** is a **linear** projection **per step** to **target** **(T_out × C')**. **Loss:** **MSE/MAE** per step for **regression** of trajectories (**supervised seq2seq**); **CE** if each step is a **class**. **Scheduled sampling** bridges train/inference **exposure bias**—still tied to **predicting** a **known** target sequence."
        ),
        tuning: "Teacher forcing, attention masks, sequence lengths.",
        caseStudy: "Dataset III in tutorial; **time_series_modeling.ipynb**.",
        paper: PAPER.signal_window,
        links: repoLinks([NB.dabTs, NB.rnn]),
        external: [],
      },
      {
        name: "PANN",
        intro:
          "Seq2seq **waveform → waveform** (or identification) with **embedded** switching/averaged dynamics and **learnable** physical parameters—use when a template matches your converter class.",
        architecture: arch(
          "**Input/output** are **aligned waveform channels** on the **signal modality**; the **graph** of computations is fixed by the **PANN template** (which converter class you assumed). **Interface:** each sample is a **time series** with **defined** channel semantics (node voltages, inductor currents, etc.).",
          "**Hidden** dynamics are **physics-structured state equations** with **learnable** parameters—not a generic **LSTM**. **Invariants:** **conservation** and **switching/averaging** assumptions baked into the **recurrence**; capacity to **fit** data is limited by **correctness** of that structure.",
          "**Output** heads emit **waveforms** or **parameter** estimates. **Loss** = **MSE** vs. **measured** channels (**supervised** **trajectory regression**). The **learning task** is **match experiment** under **hard** physics **constraints** in the **hidden** update."
        ),
        tuning: "See PANN README for architecture constraints.",
        caseStudy: "Tutorial PANN identification case.",
        paper: "PANN fundamentals in review.",
        links: [{ label: "PANN README", href: ghBlob(NB.pannReadme) }],
        external: [],
      },
    ],
  },
  signal_graph: {
    summary: "Sequence encoders → graph decoder/generator—limited **local course notebooks**; use PyG/DGL externally.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Temporal GNN / encoder + graph decoder",
        intro:
          "**Waveform encoder** produces a **latent** used to **condition** a **graph decoder** (autoregressive edge/node additions or one-shot adjacency logits)—for “given spectrum, suggest topology” style tasks.",
        architecture: arch(
          "**Input** fuses **signal modality** (windowed **1D** waveform/spectrum) through a **temporal encoder** into vector **z**, optionally concatenated with **tabular** context. **z** **interfaces** to a **graph decoder**—the **modality shift** is explicit: **continuous time series** → **discrete structure** logits.",
          "**Hidden:** **1D CNN/LSTM** respects **sequential invariants** (locality, causality) in **z**; **decoder** (**autoregressive RNN** over **edges/nodes** or **masked** matrix logits) builds **relational** structure; optional **GNN** refines a **partial** graph, encoding **connectivity** invariants.",
          "**Output:** **probabilities** over **next edge/node** or **adjacency** entries. **Loss:** **BCE/CE** on **supervised** graph elements (**supervised structure learning**) + **validity** penalties—linking **loss** to **feasible topology**. Research setups may add **GAN**/**VAE** terms; core task remains **matching** a **target** graph or **distribution**."
        ),
        tuning: "Temporal windowing + graph size constraints.",
        caseStudy: "Conceptual in selector doc; repo gap for full demo—see **Graph_NN/README** for GNN stack references.",
        paper: "Graph data + signal sections.",
        links: repoLinks([NB.graphNN, NB.rnn], ["Graph_NN/README.md", "rnn_basics.ipynb"]),
        external: [{ label: "Deep Graph Library", href: "https://www.dgl.ai/" }],
      },
    ],
  },
  signal_field: {
    summary: "Temporal encoder → spatial decoder (CNN) or **PINN** coupling time series to field PDEs.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "PINN / hybrid CNN–RNN",
        intro:
          "**Time series** (excitation, duty, load) conditions a **field** predictor; **PINN** adds **spatial PDE** residuals, while **CNN–RNN** stacks treat the problem as **latent dynamics** + **spatial decoder**.",
        architecture: arch(
          "**Input** couples **signal** (time series of excitations, duties, loads) and/or **tabular** context with **field modality** (**grid** or **(x,y,t)** samples). **Interface:** **time** is **ordered**; **space** is **structured** on a mesh or grid—two **different** modality axes that must be **registered** (same timestep ↔ field snapshot).",
          "**Hidden:** **RNN/1D CNN** on **time** yields **latent** **h_t** that **modulates** a **2D conv** decoder (**FiLM**/broadcast)—**invariant**: **temporal** evolution drives **spatial** patterns; **PINN** path uses an **MLP** on **(x,y,t)** to **couple** **PDE** structure across **space–time**.",
          "**Output:** **field tensor** per time or **steady** map. **Loss:** **MSE** on **probes/pixels** (**supervised field regression**) + optional **λ**·**PDE residual**; **weighted sum** balances **data fit** vs. **physics**. **Task:** predict **fields** driven by **time-varying inputs**."
        ),
        tuning: "Multi-physics loss weights.",
        caseStudy: "Magnetic + PINN tutorials complementary.",
        paper: PAPER.piml_loss,
        links: repoLinks([NB.pinn2, NB.magnetLstm]),
        external: [],
      },
    ],
  },
  signal_hybrid: {
    summary: "Multi-branch temporal encoders + fusion; see **one-stop DAB** for heterogeneous workflow patterns.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Modular temporal–tabular fusion",
        intro:
          "**Two (or more) encoders:** one for **scope data**, one for **static context** (rating, command, temperature bin); **fusion** then **multi-task** heads—same pattern as hybrid DAB workflows.",
        architecture: arch(
          "**Input** has two **native** interfaces: **tabular** vector (setpoints, ratings) → **MLP** first layer; **signal** **(T×C)** → **1D CNN/LSTM** first layers. **Modalities** stay **separate** until **fusion**—avoid flattening the **sequence** into arbitrary **columns** without **encoder** structure.",
          "**Hidden:** parallel encoders produce **z_tab**, **z_seq**; **concat** or **cross-attention** (tabular **queries** **waveform tokens**) **fuses** them—**invariant**: model learns **when** static context vs. **dynamic** waveform drives the decision; **asymmetric dropout** can **regularize** dominant modality.",
          "**Output** heads: **linear** regression or **softmax**. **Loss:** **MSE/CE** on the **task**; **multi-task** sums **L_i** with learned or fixed **weights** (**uncertainty weighting**). **Task:** **joint** prediction from **static + temporal** evidence."
        ),
        tuning: "Asymmetric dropout per branch; attention fusion.",
        caseStudy: "**one_stop_AI_DAB_modulation.ipynb**.",
        paper: PAPER.nn_practice,
        links: repoLinks([NB.dabOne, NB.rnn]),
        external: [],
      },
    ],
  },
  graph_tabular: {
    summary: "GNN encoder → MLP head for classification/regression on topology/layout.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Graph convolution / attention networks",
        intro:
          "**Graph-level** or **node-level** prediction: **message passing** aggregates neighbor features so the model sees **loops, parasitics paths, and layout** rather than a single categorical “layout ID”.",
        architecture: arch(
          "**Input layer** ingests **graph modality**: **node feature matrix** **X**, **edge index** or **adjacency**, optional **edge features**—each row of **X** is a **device/pad** with **physical attributes** (type, rating, sensor). The **interface** is **relational**: the model **indexes neighbors** through **edges**, not a fixed **grid**.",
          "**Hidden:** **K** **message-passing** layers (**GCN/SAGE/GAT**) **aggregate** neighborhood information—this **encodes invariants** of **connectivity**, **local coupling**, and **multi-hop** influence (tutorial graph section). **Residual** links mitigate **over-smoothing**. **Readout** (**sum/mean/max** or **attention pool**) maps **variable-size** graphs to a **fixed vector** while **permutation** of node IDs is handled by **equivariant** ops + **invariant** pooling.",
          "**Output:** **softmax** (**graph classification**), **sigmoids** (**multi-label** faults), or **linear** (**regression** of KPI). **Loss** matches the **task**: **CE** for **exclusive** classes, **BCE** for **co-occurring** faults, **MSE** for **scalar** targets—each compares **head outputs** to **labels** for **supervised** learning on **graphs**."
        ),
        tuning: "Depth, over-smoothing mitigation, batching of graphs.",
        caseStudy: "Conceptual; **no GNN training notebook** in repo—use **Graph_NN/README** for surveys + external PyG/DGL.",
        paper: PAPER.graph_invariants,
        links: repoLinks([NB.graphNN, "4_Neural_Network/README.md"], ["Graph_NN/README.md", "4_Neural_Network/README.md"]),
        external: [{ label: "PyTorch Geometric tutorials", href: "https://pytorch-geometric.readthedocs.io/en/latest/notes/colabs.html" }],
      },
    ],
  },
  graph_signal: {
    summary: "Spatio-temporal GNN or GNN+RNN stacks—limited local notebooks.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Temporal GNN",
        intro:
          "Each **time step** (or window) has a **graph** with **time-varying node features**—combine **GNN** with **RNN** over time or use **spatio-temporal** message passing.",
        architecture: arch(
          "**Input** is a **time series of graphs**: each **G_t** carries **node features** **X_t**—**modalities** are **graph** (topology may be **fixed** or **slowly changing**) plus **time** **index** **t**.",
          "**Hidden:** **Option A:** **GNN** at each **t** → **sequence model** (**LSTM**) on **pooled** or **per-node** traces—**invariants**: **spatial** coupling via **GNN**, **temporal** dependence via **RNN**. **Option B:** **spatio-temporal GNN** layers couple **neighbors across time** in one stack.",
          "**Output:** **labels** per window, **per-node** **forecasts**, or **next-step** **graph** attributes. **Loss:** **MSE** for **continuous** **trajectories**; **CE** for **discrete** **events**—**task** is **supervised prediction** on **spatio-temporal** PE data."
        ),
        tuning: "Window length, message-passing steps.",
        caseStudy: "Research frontier; pair with **rnn_basics** concepts.",
        paper: "Signal + graph sections.",
        links: repoLinks([NB.rnn]),
        external: [],
      },
    ],
  },
  graph_graph: {
    summary: "Graph-to-graph models (autoencoders, iterative refinement).",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "GNN autoencoder / iterative editors",
        intro:
          "**Encoder** maps graph → **latent**; **decoder** proposes **edited** graph (refinement, rewiring, component swap) for **co-design** or **what-if** exploration.",
        architecture: arch(
          "**Input** is **graph modality** **G** (and optional **noise** / **conditioning** vector for **VAE** variants). **Interface:** **node/edge** tensors the same as **classification** GNNs, but the **target** is another **graph** or **edit sequence**.",
          "**Encoder:** **GNN** → **latent** **z** (**invariant** pooling). **Decoder:** **MLP** on **z** emits **edge/node logits**, or **autoregressive** **RNN** emits **one edit** at a time—**hidden** structure must **respect** **feasibility** (often via **masking** illegal edges).",
          "**Output:** **distribution** over **graphs** or **deterministic** **refined** **G'**. **Loss:** **BCE/CE** vs. **target** **adjacency** (**supervised** **reconstruction** / **matching**) + **validity** terms; **RL** uses **reward** instead of **fixed** labels when **searching** **topologies**."
        ),
        tuning: "Validity constraints on generated graphs.",
        caseStudy: "Not covered by local `.ipynb` — use **Graph_NN/README** for pointers; external graph-to-graph libraries.",
        paper: PAPER.graph_invariants,
        links: [{ label: "Graph_NN/README.md (surveys & links)", href: ghBlob(NB.graphNN) }],
        external: [{ label: "GraphGPS / graph transformer survey resources", href: "https://github.com/topics/graph-neural-networks" }],
      },
    ],
  },
  graph_field: {
    summary: "GNN encoder + CNN/PINN decoder for field quantities on structures tied to graphs.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Hybrid GNN + field network",
        intro:
          "**GNN** summarizes **layout/topology**; a **CNN (or PINN) head** predicts **field** on a grid **conditioned** on that embedding—links **relational** and **spatial** views.",
        architecture: arch(
          "**Input** couples **graph modality** ( **GNN** on layout ) with **field modality** (**grid** or **(x,y)** samples). **g** is a **global layout embedding**; **coordinates** are **local** **spatial** inputs—**interface** links **relational** structure to **spatial** **maps**.",
          "**Hidden:** **GNN** → **g** **modulates** **2D conv** (**FiLM**/broadcast) so **field** patterns **depend** on **topology** **invariant** captured in **g**; **PINN** path **concat**s **g** to **(x,y)** **MLP** inputs to **embed** **layout** in **u(x,y)**.",
          "**Output:** **field** **u** on **grid**. **Loss:** **MSE** on **measured** **field/sensor** (**supervised**) + optional **λPDE** + **consistency** if **multi-task** ties **graph** **predictions** to **field** **behavior**."
        ),
        tuning: "Coupling losses between graph embedding and field supervision.",
        caseStudy: "Use PINN notebooks for field half.",
        paper: "Field + graph discussion.",
        links: repoLinks([NB.pinn1]),
        external: [],
      },
    ],
  },
  graph_hybrid: {
    summary: "Multi-encoder fusion (graph + tabular/signal) — align with **modular NN** guidance.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Fusion architectures",
        intro:
          "**Parallel encoders** (graph + tabular/signal/field) → **gated** or **attentive** fusion so the model learns **when** to trust topology vs. measurements.",
        architecture: arch(
          "**Input:** **parallel** **interfaces**—**graph** → **GNN** first layer; **tabular/signal/field** → **MLP/CNN/RNN** first layers. **Modalities** are **not** raw-concatenated at **pixels** and **adjacency** without **encoding**.",
          "**Hidden:** **pooled** **graph** vector **g** and **other** embedding **h** **fuse** via **gating** or **cross-attention**—**invariant**: learn **importance** of **topology** vs. **measurements** per **regime**.",
          "**Output:** **shared** **task** **head(s)**. **Loss:** **primary** **supervised** **L_task** + **auxiliary** **L_branch** to stop **unused** **encoder** **collapse**—**overall** **task** still **defined** by **labels**."
        ),
        tuning: "Balance capacity across branches.",
        caseStudy: "**DAB one-stop** for fusion patterns (partial).",
        paper: PAPER.nn_practice,
        links: repoLinks([NB.dabOne]),
        external: [],
      },
    ],
  },
  field_tabular: {
    summary: "CNN/encoder on fields → scalars (temperature peaks, losses). **Magnetic** notebooks demonstrate NN mapping from field-related inputs.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "CNN / Vision Transformer encoder + MLP head",
        intro:
          "**Field snapshots** (flux, temperature) as **images**: **2D CNN** or **ViT** patch encoder → **pooled embedding** → **scalar/vector** targets (peak T, loss density integral, class).",
        architecture: arch(
          "**Input** is **unstructured / image-like** **field modality**: tensor **(C×H×W)**—**thermal**, **IR**, **rasterized** **PCB**; **channels** carry **physics** **quantities** or **RGB**; **normalize** per **channel** with **consistent** **units**.",
          "**Hidden:** **Conv** **backbone** or **ViT** **patches**—**invariants**: **local** **translation** **equivariance** (**CNN**) or **patch** **ordering** with **position** **encoding** (**ViT**). **Pooling** (**GAP**/**CLS**) **removes** **spatial** **indices** for a **global** **decision**.",
          "**Output:** **linear** **regression** or **softmax** **classification**. **Loss:** **MSE**/**CE** vs. **labels**; **focal**/**weighted** **CE** for **rare** **fault** **visuals**. **Physics** checks (e.g. **energy**) usually **post** **network**, not **in** **loss**, unless you **encode** them as **extra** **terms**."
        ),
        tuning: "Augment with physics-based normalization where possible.",
        caseStudy: "**magnet_fnn.ipynb**, **magnet_lstm.ipynb**.",
        paper: "Field data section.",
        links: repoLinks([NB.magnetFnn, NB.magnetLstm, NB.nnBasics]),
        external: [],
      },
    ],
  },
  field_signal: {
    summary: "Field-to-sequence models—encoder on 2D/3D grids + temporal decoder.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "CNN encoder + RNN decoder",
        intro:
          "**Spatial encoder** compresses each **field frame**; **RNN** models **temporal evolution** (or the reverse: **RNN** conditions **spatial** generation)—for **thermal/EMI** dynamics tied to fields.",
        architecture: arch(
          "**Input** is **field** **time series**: **F_t** **(C×H×W)**—**modalities** **field** + **time**; **interface** is **CNN** **per** **frame** to **vector** **z_t** (same **spatial** **encoding** each **step**).",
          "**Hidden:** **LSTM/GRU** on **z_t** **captures** **temporal** **invariants** ( **slow** **thermal** **dynamics** ); **decoder** **RNN** → **CNN** **reconstructs** **fields** when **seq2field**.",
          "**Output:** **per-time** **scalars** or **field** **sequence**. **Loss:** **MSE** vs. **targets**; **autoregressive** **training** may use **teacher forcing**—**task** is **supervised** **forecasting** or **regression** from **thermal**/**IR** **movies**."
        ),
        tuning: "Temporal alignment, downsampling of fields for speed.",
        caseStudy: "Partial overlap with magnetic sequence notebooks.",
        paper: "Tutorial field/signal narrative.",
        links: repoLinks([NB.magnetLstm, NB.rnn]),
        external: [],
      },
    ],
  },
  field_graph: {
    summary: "Field CNN + graph head for structural outputs—research-style; combine ideas from field + graph sections.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Hybrid CNN–GNN",
        intro:
          "**CNN** reads **field patterns**; **GNN head** predicts **graph structure** (connectivity, net grouping)—research-style **inverse** layout inference.",
        architecture: arch(
          "**Input** is **field modality** **(C×H×W)**; **first** **interface** is **CNN** **encoder** → **vector** or **map** **pooled** to **fixed** **dim**—**topology** is **not** given; **network** **infers** **graph** **structure** from **spatial** **patterns**.",
          "**Hidden:** **MLP** or **iterative** **GNN** **refinement** on **candidate** **graphs**—**invariants**: **local** **spatial** **features** **map** to **pairwise** **compatibility** (**edge logits**).",
          "**Output:** **edge**/**node** **logits** → **probabilistic** **adjacency**. **Loss:** **BCE** vs. **known** **edges** (**supervised** **graph** **from** **image**) + optional **MSE** **field** **reconstruction** (**multi-task**)."
        ),
        tuning: "Multi-task loss between field reconstruction and graph supervision.",
        caseStudy: "No local end-to-end notebook.",
        paper: "Cross-reference graph + field subsections.",
        links: repoLinks([NB.magnetFnn]),
        external: [],
      },
    ],
  },
  field_field: {
    summary: "Field super-resolution, inpainting, cross-physics mapping—**PINNs** or U-Nets with physics losses.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "PINN / U-Net with physics",
        intro:
          "**Field-to-field** mapping (e.g. heat source → temperature) with **U-Net** skip connections for **multi-scale** structure plus optional **PDE residual** on the prediction.",
        architecture: arch(
          "**Input** is **field** **conditioning** ( **source** **tensor** ) plus **continuous** **coordinates** **(x,y)** on **collocation** **grid**—**interface** **feeds** **both** **pixel** **values** (**U-Net**) or **(x,y,cond)** (**PINN** **MLP**).",
          "**Hidden:** **U-Net** **skip** **connections** **preserve** **multi-scale** **spatial** **structure**; **PINN** **hidden** **layers** **approximate** **smooth** **u** **obeying** **PDE** **when** **loss** **includes** **derivatives**.",
          "**Output:** **target** **field** **same** **resolution** or **u(x,y)** **samples**. **Loss:** **MSE** on **labeled** **points** + **λ**·**PDE**² + **boundary** **terms**—**task** is **supervised** **field** **fitting** **with** **physics** **constraints**."
        ),
        tuning: "Boundary conditions in loss; weight scheduling.",
        caseStudy: "PINN notebooks + magnetic examples.",
        paper: PAPER.piml_loss,
        links: repoLinks([NB.pinnOde, NB.pinn1, NB.magnetFnn]),
        external: [],
      },
    ],
  },
  field_hybrid: {
    summary: "Field CNN + other encoders + fusion heads.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Multi-modal fusion with field branch",
        intro:
          "**Field CNN** branch + **tabular/signal** encoders → **fusion** → KPI head—typical when both **spatial** loss/thermal maps and **operating-point** vectors exist.",
        architecture: arch(
          "**Input** **interfaces** **three** **modalities**: **field** → **CNN** **stem**; **tabular** → **MLP**; **sequence** → **RNN**/**1D** **CNN**—each **branch** **normalizes** **its** **own** **scale**.",
          "**Hidden:** **branch** **embeddings** **fuse** via **concat**, **gating**, or **attention**—**invariant** **learned**: **which** **modality** **drives** **the** **fault** **signature** **per** **sample**.",
          "**Output:** **regression** or **classification** **head**. **Loss:** **MSE**/**CE** on **labels**; **modality** **dropout** **regularizes** **small** **multimodal** **sets**—**task** remains **standard** **supervised** **learning**."
        ),
        tuning: "Normalize each modality; check overfitting on small multimodal sets.",
        caseStudy: "**one_stop_AI_DAB_modulation.ipynb** (workflow analogies).",
        paper: PAPER.nn_practice,
        links: repoLinks([NB.dabOne, NB.magnetFnn]),
        external: [],
      },
    ],
  },
  hybrid_tabular: {
    summary: "Multi-encoder → MLP/regression head—common for holistic performance modeling.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Modular encoders + dense head",
        intro:
          "Same **hybrid** idea as tabular_hybrid but emphasized for **performance modeling** at system level: **one encoder per sensor/format**, then **dense** fusion and **heads**.",
        architecture: arch(
          "**Input:** **N** **modalities**, each **first** **layer** **specialized**: **MLP** (**tabular**), **1D** **CNN**/**RNN** (**signal**), **2D** **CNN** (**field**), **GNN** (**graph**).",
          "**Hidden:** **modality** **embeddings** **concat** or **attend** as **tokens**—**invariant** **fusion** **weights** **relations** **between** **heterogeneous** **measurements**.",
          "**Output:** **scalar** **regression** or **class** **logits**. **Loss:** **MSE**/**CE** **main** **task** + optional **SSL** **per** **encoder**—**auxiliary** **losses** **shape** **representations** **without** **replacing** **label** **objective**."
        ),
        tuning: "Fusion dropout; imbalance across sensors.",
        caseStudy: "**buck_comprehensive_case_study.ipynb**, **one_stop_AI_DAB_modulation.ipynb**.",
        paper: PAPER.nn_practice,
        links: repoLinks([NB.buckFull, NB.dabOne]),
        external: [],
      },
    ],
  },
  hybrid_signal: {
    summary: "Per-modality encoders including temporal branches → fusion.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Temporal + tabular fusion",
        intro:
          "**Sequence** encoder (**LSTM/1D CNN**) for waveforms + **MLP** for static **setpoints/conditions**; **fusion** before fault or RUL head.",
        architecture: arch(
          "**Input** **interfaces** **tabular** **x_tab** and **sequence** **x_seq** **(T×C)** **separately**—**time** **axis** **only** in **seq** **branch**; **alignment** **T** **must** **match** **labels**.",
          "**Hidden:** **MLP** **tabular** **invariants** ( **cross-feature** **interactions** ); **LSTM/TCN** **temporal** **invariants** on **x_seq**; **concat** **fusion** **FC** **combines** **both** **representations**.",
          "**Output:** **fault** **logits** or **RUL** **scalar**. **Loss:** **CE**/**MSE**; **missing** **modality** **mask** or **token** **prevents** **garbage** **gradients**—**task** **supervised** **on** **available** **modalities**."
        ),
        tuning: "Time alignment; missing modality handling.",
        caseStudy: "**time_series_modeling.ipynb** + comprehensive studies.",
        paper: PAPER.signal_window,
        links: repoLinks([NB.dabTs, NB.buckFull]),
        external: [],
      },
    ],
  },
  hybrid_graph: {
    summary: "Graph branch + others → GNN fusion—no full demo notebook.",
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    algorithms: [
      {
        name: "Heterogeneous fusion with GNN",
        intro:
          "**GNN** on **topology** + **MLP/CNN/RNN** on **non-graph** data → **joint embedding** for classification or regression on **hybrid** PE records.",
        architecture: arch(
          "**Input:** **batched** **graphs** (**PyG/DGL**) **plus** **parallel** **non-graph** **tensors**—**interface** **splits** **relational** **batching** from **dense** **tensor** **pipeline**.",
          "**Hidden:** **GNN** → **g** **captures** **topology** **invariant**; **CNN/MLP** → **h**; **concat** **FC** **joint** **reasoning**.",
          "**Output:** **task**-**specific** **head**. **Loss:** **MSE**/**CE**/etc. **vs.** **labels**—**batch** **construction** **is** **engineering**; **learning** **objective** **unchanged**."
        ),
        tuning: "Graph batch size vs. memory.",
        caseStudy: "External implementations recommended.",
        paper: "Graph + hybrid discussion.",
        links: repoLinks([NB.rnn]),
        external: [{ label: "Open Graph Benchmark", href: "https://ogb.stanford.edu/" }],
      },
    ],
  },
  hybrid_field: {
    summary: "Field CNN branch + fusion with tabular/signal encoders; PINN branch optional.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Multi-branch with field tensor",
        intro:
          "At least one branch is a **2D/3D conv** tower on **field data**; other branches handle **remaining modalities** before **fusion**—full **hybrid** PE representation.",
        architecture: arch(
          "**Input:** **field** **grid** **(C×H×W)** **or** **(C×D×H×W)** **plus** **other** **modalities**—each **enters** **its** **native** **encoder** **first**.",
          "**Hidden:** **Conv** **tower** **extracts** **spatial**/**spatiotemporal** **invariants**; **parallel** **branches** **for** **tabular/signal/graph**; **fusion** **MLP** **merges** **embeddings**.",
          "**Output:** **multi-head**: e.g. **efficiency** **(regression)** + **hotspot** **prob** **(sigmoid)**. **Loss:** **weighted** **Σ L_k**—each **head** **has** **MSE**/**BCE** **matching** **its** **target**; **weights** **encode** **business** **priority**."
        ),
        tuning: "Resolution vs. batch size trade-offs.",
        caseStudy: "Magnetic + PINN pieces combine conceptually.",
        paper: PAPER.piml_loss,
        links: repoLinks([NB.magnetFnn, NB.pinn1]),
        external: [],
      },
    ],
  },
  hybrid_hybrid: {
    summary: "Fully multimodal heads—most flexible, highest risk of overfitting; follow **Occam’s razor** in the paper.",
    flags: { nn: true, mha: false, tinyml: false, piml: true },
    extras: { nn: true, mha: false, tinyml: false, piml: true },
    algorithms: [
      {
        name: "Hierarchical fusion / mixture-of-experts (advanced)",
        intro:
          "**Experts** specialize on subsets of modalities or regimes; a **gating network** routes samples—use only when **ablations** show single-trunk models underfit.",
        architecture: arch(
          "**Input** **tokens**/**features** **routed** ( **soft** or **hard** ) to **E** **experts**—each **expert** **first** **layer** **matches** **its** **modality** (**CNN/RNN/GNN**).",
          "**Hidden:** **gating** **network** **softmax** **weights** **experts**—**invariant**: **sparse** **specialization** **per** **regime**; **load-balancing** **loss** **forces** **use** **of** **all** **experts**.",
          "**Output:** **head** on **mixed** **representation**. **Loss:** **L_task** + **λ L_balance**—**primary** **still** **supervised** **prediction**; **balance** **is** **regularization** **not** **the** **PE** **metric**."
        ),
        tuning: "Strong regularization; per-modality pretraining.",
        caseStudy: "**buck_comprehensive_case_study.ipynb** as integrated example.",
        paper: "Ablation emphasis in NN good-practices section.",
        links: repoLinks([NB.buckFull, NB.nnGood]),
        external: [],
      },
    ],
  },
};

export function buildOptimizationRecommendation(dim, rlSpace, moo, space) {
  /** dim: 'high'|'low', rlSpace: 'cont'|'disc'|'hyb', moo: boolean, space: 'cont'|'disc'|'hyb' */
  let pathId = 54;
  let title = "";
  let summary = "";
  const algorithms = [];
  const flags = { nn: false, mha: true, tinyml: false, piml: false };
  const extras = { nn: false, mha: true, tinyml: false, piml: false };

  if (dim === "high") {
    if (rlSpace === "cont") pathId = 51;
    else if (rlSpace === "disc") pathId = 52;
    else pathId = 53;
    title = `Path ${pathId}: High-dimensional RL (${rlSpace === "cont" ? "continuous" : rlSpace === "disc" ? "discrete" : "hybrid"} action space)`;
    summary =
      "Deep RL (DDPG/SAC for continuous, DQN for discrete, parameterized actions for hybrid) for large policy/control parameter vectors. The public repo documents RL concepts but **does not ship RL training notebooks**—use external RL libraries.";
    algorithms.push({
      name: "Deep RL (DDPG / SAC / DQN / parameterized)",
      intro:
        "**Policy π(a|s)** (or **Q(s,a)** for DQN) is a **neural network**: **state** = measurements / estimates; **action** = modulation, duty, references. **Reward** encodes tracking, losses, constraints—often dominates performance more than minor algorithm tweaks.",
      architecture: arch(
        "**Input layer** is **state vector** **s** ( **voltages**, **currents**, **references**, **errors** )—same **normalization** as **supervised** **NN**; **interface** is **tabular** **→** **FC** **first** **weights**.",
        "**Hidden:** **2–4** **FC** **layers** **learn** **nonlinear** **value**/**policy** **over** **state**—**invariants** are **implicit** **dynamics** **compressed** **into** **features** **(no** **explicit** **PDE** **unless** **you** **encode** **it** **in** **state** **or** **reward** **)**.",
        "**Output:** **continuous** **action** **(tanh** **+** **scale**)** **or** **|A|** **Q** **values**/**logits**. **Loss:** **not** **label** **matching**—**policy** **gradient**/**Bellman** **MSE**/**entropy** **(SAC)** **optimize** **expected** **return** **from** **environment** **interaction**; **CE** **only** **if** **distilling** **teacher**."
      ),
      tuning:
        "Reward shaping, exploration noise, target nets, experience replay; sim-to-real gap for PE hardware.",
      caseStudy: "Literature cases in paper’s RL discussion—not duplicated locally.",
      paper: "RL section + reward engineering citations.",
      links: [{ label: "7_Reinforcement_Learning/README.md", href: ghBlob(NB.rl) }],
      external: [
        { label: "Stable-Baselines3 (PyTorch RL)", href: "https://github.com/DLR-RM/stable-baselines3" },
        { label: "IEEE TIE survey — RL for PE converters (Chen et al.)", href: "https://ieeexplore.ieee.org/document/10665444" },
      ],
    });
    flags.nn = true;
    extras.nn = true;
    return {
      pathId,
      title,
      summary,
      algorithms,
      flags,
      extras,
      scarceHtml: "",
      reviewContextHtml: `${OPTIMIZATION_REVIEW_HTML}<ul class="report-list"><li>${PAPER.mha_stats}</li><li>Reward and environment fidelity often dominate over the specific RL algorithm—document assumptions.</li></ul>`,
    };
  }

  // low-dim MHA
  const single = !moo;
  if (single && space === "cont") pathId = 54;
  else if (single && space === "disc") pathId = 55;
  else if (single && space === "hyb") pathId = 56;
  else if (!single && space === "cont") pathId = 57;
  else if (!single && space === "disc") pathId = 58;
  else pathId = 59;

  title = `Path ${pathId}: Low-dimensional ${moo ? "multi-objective" : "single-objective"} MHA (${space === "cont" ? "continuous" : space === "disc" ? "discrete" : "hybrid"} space)`;
  summary =
    "Meta-heuristics navigate nonlinear/discontinuous objectives. **PSO/DE** for continuous vector spaces; **GA** for mixed variables; **NSGA-II/III** for Pareto fronts. Integrate **statistical comparison** across stochastic runs.";

  if (space === "cont") {
    algorithms.push({
      name: "PSO & Differential Evolution (DE)",
      intro:
        "PSO uses particle velocities with cognitive/social terms; aligns with **continuous** design vectors. DE evolves populations via differential mutation.",
      architecture: arch(
        "The **input layer** is a population of candidate vectors in a **continuous tabular design space** (e.g., component values, control gains). The modality interface is direct numeric parameters plus objective/constraint evaluations from simulation or experiment.",
        "The **hidden dynamics** are population-update operators rather than neural layers. Invariants are search-trajectory regularities: PSO preserves momentum/exploration via velocity updates; DE preserves differential directions through mutation-recombination, exposing useful local geometry of the objective surface.",
        "The **output layer** is the next candidate population and current best solution. The optimization **loss/objective** is the task cost (with penalties for constraints), minimized iteratively. This ties directly to single- or multi-objective PE design search rather than supervised label fitting."
      ),
      tuning: PAPER.mha_explore + " See **pso_hyp_tuning.ipynb** for inertia schedules.",
      caseStudy: "**buck_design_PSO.ipynb**; DAB modulation stress minimization in tutorial.",
      paper: PAPER.mha_stats,
      links: repoLinks([NB.singMha, NB.buckPso, NB.psoTune, NB.algoStats, NB.mhaReadme]),
      external: [{ label: "SciPy optimization cookbook (reference)", href: "https://docs.scipy.org/doc/scipy/reference/optimize.html" }],
    });
  } else if (space === "disc") {
    algorithms.push({
      name: "Simulated Annealing & Ant Colony Optimization",
      intro:
        "Discrete move operators suit combinatorial device/topology choices. **Note:** local repo emphasizes PSO/GA; SA/ACO are described in the paper but not implemented in bundled notebooks.",
      architecture: arch(
        "The **input layer** is a discrete candidate encoding (topology choices, integer part indices, switch states) and associated objective value. The modality interface is combinatorial: moves are defined over symbolic/integer design variables, not continuous vectors.",
        "The **hidden mechanism** is transition logic. SA uses neighborhood proposals and temperature-governed acceptance; ACO uses pheromone memory plus heuristic desirability. These reveal invariants of combinatorial search: feasible move sets, exploitation of promising patterns, and controlled random exploration.",
        "The **output layer** is an updated candidate (SA) or sampled route/solution set (ACO), with objective/penalty evaluation. The optimization **loss/objective** is the PE design cost under constraints; the learning task is discrete global search, not supervised prediction."
      ),
      tuning: "Cooling schedules (SA), pheromone dynamics (ACO), discrete neighborhood definitions.",
      caseStudy: "Paper’s algorithm-selection table; PE converter discrete sizing examples in literature.",
      paper: PAPER.mha_explore,
      links: repoLinks([NB.mhaReadme]),
      external: [
        { label: "DEAP (evolutionary algorithms in Python)", href: "https://github.com/DEAP/deap" },
        { label: "PyGMO — metaheuristics", href: "https://esa.github.io/pygmo2/" },
      ],
    });
  } else {
    algorithms.push({
      name: "Genetic Algorithm (GA)",
      intro:
        "**Mixed continuous/discrete** chromosomes—crossover/mutation tailored per gene type; used in buck comprehensive study with database constraints.",
      architecture: arch(
        "The **input layer** is a population of chromosomes with mixed gene types (continuous, integer, categorical). The modality interface naturally matches hybrid PE design variables and database-indexed component options.",
        "The **hidden process** is evolutionary transformation: selection, crossover, mutation, and elitism. Invariants appear as building blocks (useful gene combinations) that survive across generations while mutation keeps global exploration alive.",
        "The **output layer** is the evolved next population and Pareto-best/elite individuals. The optimization **loss/objective** is the evaluated design objective(s) plus penalties; for multi-objective variants, dominance/crowding metrics guide updates to match the search task."
      ),
      tuning: "Population size, crossover/mutation rates, elitism; mesh with **component databases** in case study.",
      caseStudy: "**buck_comprehensive_case_study.ipynb** GA vs. PSO narrative.",
      paper: "Hybrid space discussion + statistical testing.",
      links: repoLinks([NB.buckFull, NB.singMha, NB.package]),
      external: [],
    });
  }

  if (moo) {
    algorithms.push({
      name: "NSGA-II / NSGA-III / MOSPO",
      intro:
        "**Non-dominated sorting** builds Pareto fronts; handles competing objectives (efficiency, ripple, volume).",
      architecture: arch(
        "The **input layer** is a population of candidate designs with vector-valued objective evaluations. The modality interface is multi-objective tabular design data: each sample carries decision variables and multiple performance metrics.",
        "The **hidden ranking logic** is non-dominated sorting, crowding distance, and (for NSGA-III) reference-point association. These reveal invariants of Pareto structure: dominance tiers and diversity along the trade-off manifold.",
        "The **output layer** is a Pareto-approximate population/front. The optimization **loss/objective** is not a single scalar label loss; selection minimizes dominance rank while maximizing spread/diversity, directly tied to multi-objective design-learning goals."
      ),
      tuning: "Reference points (NSGA-III), crowding distance, population size; normalize objectives (paper warns on scale).",
      caseStudy: "**multi_obj_MHA_master.ipynb** Pareto evolution animations.",
      paper: "Multi-objective MHA subsection + NSA explanation.",
      links: repoLinks([NB.moo, NB.algoStats]),
      external: [{ label: "pymoo — multi-objective optimization", href: "https://github.com/anyoptimization/pymoo" }],
    });
  }

  const mooHtml = moo ? `<p class="paper-note">${PAPER.moo_pe}</p>` : "";
  return {
    pathId,
    title,
    summary,
    algorithms,
    flags,
    extras,
    scarceHtml: "",
    reviewContextHtml: `${OPTIMIZATION_REVIEW_HTML}<ul class="report-list"><li>${PAPER.mha_stats}</li></ul>${mooHtml}`,
  };
}

export function buildProcessRecommendation(kind) {
  const isSim = kind === "sim";
  return {
    pathId: null,
    title: isSim ? "PE simulation automation" : "Agentic AI (PE-GPT-style workflows)",
    summary: isSim
      ? "Scripted batching across tools: parameter sweeps (LHS/grid), parse outputs, build datasets feeding ML/MHA pipelines."
      : "LLM + **RAG** + **tools** for design automation: memory, planning (CoT/ReAct), multimodal waveform parsing—per paper’s PE-GPT discussion.",
    algorithms: isSim
      ? [
          {
            name: "Simulation automation pipeline (LHS/grid + parser + dataset builder)",
            intro:
              "Automates PE data generation by orchestrating simulator inputs, batch execution, and structured output parsing. This is a workflow algorithm rather than a neural architecture, but it still has clear input/processing/output contracts.",
            architecture: arch(
              "The **input layer** is the experiment specification: design-variable bounds, sampling policy (grid/LHS), simulator templates/netlists, and requested measurement channels. It interfaces tabular design modalities to tool-specific APIs (LTspice/PLECS/MATLAB scripting).",
              "The **hidden processing layer** is orchestration logic: sample generation, job scheduling, run monitoring, retry/error handling, and waveform/metric parsers. The invariants are reproducibility, consistent schema across runs, and deterministic mapping from parameter sets to simulation artifacts.",
              "The **output layer** is a cleaned dataset (features, labels, metadata) ready for modeling/optimization. The effective objective/loss is data quality and coverage: maximize valid samples and operating-space coverage while minimizing failed or inconsistent runs to support downstream supervised/RL tasks."
            ),
            tuning:
              "Sampling density (LHS points), timeout/retry policy, parser validation rules, and data schema checks before model training.",
            caseStudy: "PLECS and LTspice automation notebooks in the simulation automation section.",
            paper: "Simulation batch-acquisition flow in the tutorial process-automation discussion.",
            links: repoLinks([NB.ltspice, NB.plecs, NB.simReadme]),
            external: [],
          },
        ]
      : [
          {
            name: "Agentic AI workflow (LLM + memory + tools)",
            intro:
              "Runs a goal-directed design loop where an LLM plans actions, calls tools (simulation/parsers/code), and uses memory (RAG) to iteratively refine PE tasks.",
            architecture: arch(
              "The **input layer** is a multimodal task context: user goal, constraints, prior runs, retrieved references, and tool state. The interface unifies text prompts, structured config files, and simulation outputs into a prompt/context window plus retrieval store.",
              "The **hidden reasoning layer** is planner-executor control: decomposition, tool selection, reflection, and memory updates (episodic/semantic/procedural). Invariants are consistency with constraints, traceable decision steps, and grounded actions through tool feedback rather than free-form text only.",
              "The **output layer** is actionable artifacts: suggested designs, scripts, experiment plans, and report updates. The optimization objective is task success under constraints (accuracy, safety, runtime); when trained end-to-end, supervision can be instruction/reward-based, but in deployment this is usually an iterative closed-loop decision task."
            ),
            tuning:
              "Retriever quality, tool-routing policies, guardrails, and evaluation on task success + hallucination rate + execution reliability.",
            caseStudy: "PE-GPT style design-assistant workflow in the tutorial’s agentic AI section.",
            paper: PAPER.agentic_stack,
            links: repoLinks([NB.agentic]),
            external: [{ label: "PE-GPT paper (IEEE TIE 2025)", href: "https://ieeexplore.ieee.org/document/10918566" }],
          },
        ],
    flags: { nn: false, mha: false, tinyml: false, piml: false },
    extras: { nn: !isSim, mha: false, tinyml: false, piml: false },
    scarceHtml: "",
    reviewContextHtml: isSim
      ? `<p class="paper-note"><strong>Data for ML:</strong> LHS/grid batches feed the <strong>generic ML workflow</strong> (acquisition → EDA → train → tune → deploy). Reuse ${ghBlob(NB.plecs)} patterns for structured sweeps.</p>`
      : `<p class="paper-note">${PAPER.agentic_stack}</p>`,
    customBlocks: isSim
      ? [
          {
            title: "Simulation automation resources",
            html: `<p>Batch acquisition loops (LHS/grid) are described in the tutorial. Use tool-specific APIs:</p>
            <ul class="link-list">
              <li><a href="${ghBlob(NB.ltspice)}" target="_blank" rel="noopener">LTspiceAutomation/LTspiceAtuomate.ipynb</a></li>
              <li><a href="${ghBlob(NB.plecs)}" target="_blank" rel="noopener">PlecsAutomation/Data acquisition.ipynb</a></li>
              <li><a href="${ghBlob(NB.simReadme)}" target="_blank" rel="noopener">8_PE_Simulation_Automation/README.md</a></li>
            </ul>`,
          },
        ]
      : [
          {
            title: "Agentic AI resources",
            html: `<p>Course documentation + PE-GPT reference (paper § agentic AI).</p>
            <ul class="link-list">
              <li><a href="${ghBlob(NB.agentic)}" target="_blank" rel="noopener">6_Agentic_AI/README.md</a></li>
              <li><a href="https://ieeexplore.ieee.org/document/10918566" target="_blank" rel="noopener">F. Lin et al., PE-GPT, IEEE TIE 2025</a> (verify open access / DOI at your institution)</li>
            </ul>`,
          },
        ],
  };
}

export function buildControlRecommendation(policy, deploy) {
  const online = deploy === "online";
  const rl = policy === "rl";
  const flags = { nn: true, mha: false, tinyml: online, piml: false };
  const extras = { nn: true, mha: false, tinyml: online, piml: false };

  const algos = [];
  if (rl) {
    algos.push({
      name: "Reinforcement learning control",
      intro:
        "Same **actor–critic** / **DQN** picture as high-dimensional design RL but **states** and **actions** update at **control rate**; **safety filters** (limits, Lyapunov-style shields) often wrap the NN output for hardware.",
      architecture: arch(
        "**Input** is **observation** **vector** **(or** **short** **waveform** **→** **1D** **CNN** **stem**)** **from** **sensors**/**estimator**—**interface** **maps** **physical** **signals** **to** **fixed** **dim** **before** **control** **head**.",
        "**Hidden:** **FC**/**CNN** **layers** **encode** **feasible** **control** **responses** **to** **state** **trajectories**—**invariants** **learned** **from** **reward** **shaping**, **not** **from** **static** **labels**.",
        "**Output:** **continuous** **duty** **cycle**/**reference** **or** **discrete** **switching**. **Loss:** **RL** **objective** **(PG**/**soft** **Q**)**; **optional** **BC** **MSE** **pretrain** **from** **expert** **trajectories** **then** **fine-tune** **with** **RL**."
      ),
      tuning: "Reward engineering dominates; exploration strategies; safety filters for hardware.",
      caseStudy: "Tutorial cites RL control surveys; repo README points to external implementations.",
      paper: "RL control subsection.",
      links: [{ label: "7_Reinforcement_Learning/README.md", href: ghBlob(NB.rl) }],
      external: [{ label: "Stable-Baselines3", href: "https://github.com/DLR-RM/stable-baselines3" }],
    });
  } else {
    algos.push({
      name: "Imitation / surrogate control (NN)",
      intro:
        "**Supervised** learning: **state** (or error vector) → **control action** that matches **teacher** (MPC, PID bank). **Shallow-wide** MLPs often preferred for **latency** on MCUs (tutorial TinyML narrative).",
      architecture: arch(
        "**Input** **matches** **teacher** **features** **(references**, **states**, **limits**)**—**tabular** **interface** **identical** **to** **classical** **controller** **inputs**.",
        "**Hidden:** **shallow** **wide** **FC** **for** **MCU** **latency**—**invariants** **are** **smooth** **mappings** **from** **state** **to** **action** **imitated** **from** **demos**.",
        "**Output:** **linear** **head** **→** **action** **vector**. **Loss:** **MSE**/**Huber** **‖a_student** **−** **a_teacher**‖**—** **pure** **supervised** **imitation**; **optional** **KL**/**T** **for** **soft** **teacher**; **rate/sat** **in** **loss** **or** **post** **clamp**."
      ),
      tuning: "Distillation temperature, dataset coverage of operating points.",
      caseStudy: "Tutorial imitation/MPC surrogate references.",
      paper: "Control section + TinyML deployment discussion.",
      links: repoLinks([NB.nnBasics, NB.dabTs]),
      external: [],
    });
  }

  if (online) {
    algos.push({
      name: "TinyML deployment stack",
      intro:
        "Not a new **topology**—**compress** the deployed **actor/imitation** net: **INT8** weights, **pruning**, **operator fusion** in **ONNX Runtime** / **TFLite**; keep **shallow-wide** for deterministic cycle time.",
      architecture: arch(
        "**Input/output** **topology** **unchanged** **from** **FP32** **student**—**quantization** **is** **weight**/**activation** **discretization**, **not** **new** **modality** **interface**.",
        "**Hidden:** **INT8** **matmul** **approximates** **same** **FC**/**Conv** **maps**—**invariant** **structure** **preserved** **under** **bounded** **error** **if** **calibrated** **well**.",
        "**Loss:** **during** **QAT** **matches** **full** **precision** **task** **(MSE**/**CE**/**RL** **surrogate**)**; **PTQ** **uses** **calibration** **batch** **only** **for** **scale**—**deployment** **metric** **is** **latency**/**power**, **learned** **via** **same** **objective** **as** **before** **compression**."
      ),
      tuning: PAPER.tinyml,
      caseStudy: "**TinyML.ipynb** DAB online adapter; paper §VII TinyML + ONNX 5× speedup.",
      paper: PAPER.tinyml,
      links: repoLinks([NB.tinyml, NB.dabOne]),
      external: [
        { label: "ONNX Runtime", href: "https://onnxruntime.ai/" },
        { label: "TensorFlow Lite", href: "https://www.tensorflow.org/lite" },
      ],
    });
  }

  return {
    pathId: null,
    title: `Control — ${rl ? "RL" : "Imitation / surrogate"} — ${online ? "online deployment" : "offline analysis"}`,
    summary:
      "Online deployment adds **latency**, **memory**, and **numerical precision** constraints. Follow TinyML guidance when models run on MCUs/FPGAs.",
    algorithms: algos,
    flags,
    extras,
    scarceHtml: "",
    reviewContextHtml: `<ul class="report-list"><li>${PAPER.nn_scaling}</li><li>${online ? PAPER.tinyml : PAPER.signal_window}</li></ul>`,
  };
}

export function buildUnsupervisedFDDRecommendation(modality) {
  const variant =
    modality === "signal"
      ? {
          name: "Signal anomaly models (1D autoencoder / Deep SVDD / OCSVM on features)",
          intro:
            "Train on **normal waveforms or spectra** only; detect abnormal switching, resonance, or degradation by reconstruction error, latent-distance, or classical one-class boundaries on harmonic/statistical features.",
          architecture: arch(
            "The **input layer** interfaces **signal modality** as windows **(channels x length)** or frequency-domain spectra. You may either feed raw traces into a **1D CNN/LSTM encoder** or first compute harmonics/statistics for classical one-class models.",
            "The **hidden representation** is a compact latent code **z** from a temporal encoder, or an implicit kernel/tree partition in OCSVM/Isolation-style baselines. The invariant being learned is the manifold of **normal temporal behavior**: periodicity, transients, and expected waveform morphology.",
            "The **output layer** is an anomaly score from reconstruction error, hypersphere distance, or decision function. **Loss/objective** is unsupervised: reconstruction **MSE** or one-class compactness on normal-only data, then thresholding maps scores to anomaly alarms."
          ),
          tuning: "Window length, alignment to switching period, bottleneck size, contamination rate, and threshold calibration on validation anomalies if available.",
          caseStudy: "**one_stop_AI_DAB_modulation.ipynb** anomaly-oriented workflows and waveform feature analysis.",
          links: repoLinks([NB.dabOne, NB.rnn]),
        }
      : modality === "graph"
        ? {
            name: "Graph anomaly models (graph autoencoder / one-class GNN)",
            intro:
              "Use **graph-structured normal data** to learn typical connectivity and node-feature behavior; flag layouts/topologies/thermal networks whose embeddings or reconstructions deviate from the healthy relational manifold.",
            architecture: arch(
              "The **input layer** interfaces **graph modality** through node features, edge features, and connectivity. This preserves relational structure for circuits, thermal graphs, or topological monitoring networks.",
              "The **hidden stack** is a **GNN encoder** with pooling or graph-autoencoder decoder. It reveals invariants of **normal connectivity**, local coupling, and multi-hop propagation patterns rather than only scalar thresholds.",
              "The **output layer** is an anomaly score from graph reconstruction error, latent distance to a normal center, or one-class decision value. **Loss/objective** is unsupervised graph reconstruction or compactness on healthy graphs, then thresholding creates anomaly decisions."
            ),
            tuning: "Pooling choice, graph depth vs. over-smoothing, negative-edge sampling for reconstruction, and alert-threshold calibration.",
            caseStudy: "Graph-specific FDD is tutorial-aligned but course materials mainly point to **Graph_NN/README.md** and external GNN tooling.",
            links: repoLinks([NB.graphNN, "4_Neural_Network/README.md"], ["Graph_NN/README.md", "4_Neural_Network/README.md"]),
          }
        : modality === "unstructured"
          ? {
              name: "Unstructured anomaly models (CNN autoencoder / one-class vision)",
              intro:
                "Learn the appearance of **normal images or thermal maps** and flag visually abnormal samples through reconstruction, feature-distance, or one-class classification in latent space.",
              architecture: arch(
                "The **input layer** interfaces **unstructured modality** as image tensors, typically thermal frames or IR/rasterized inspection views with consistent normalization and camera preprocessing.",
                "The **hidden backbone** is a **CNN encoder** or convolutional autoencoder that captures invariants of normal hotspot geometry, texture, and spatial morphology. The latent space represents what healthy visual structure should look like.",
                "The **output layer** is either a reconstructed image or an anomaly score from latent distance / one-class head. **Loss/objective** is reconstruction **MSE/L1** or one-class compactness on normal-only images, with thresholding used for detection."
              ),
              tuning: "Augmentation policy, bottleneck width, camera-domain consistency, and threshold selection under class imbalance.",
              caseStudy: "Tutorial unstructured-data discussion and thermal-imaging diagnostic references.",
              links: repoLinks([NB.nnBasics]),
            }
          : {
              name: "Tabular anomaly models (Isolation Forest / OCSVM / deep SVDD)",
              intro:
                "Train on **normal operating features** only; detect abnormal points using tree isolation, kernel boundaries, Gaussian mixtures, or deep one-class embeddings.",
              architecture: arch(
                "The **input layer** interfaces **tabular modality** as a fixed-order vector of engineered statistics, operating conditions, or harmonic indicators, with explicit scaling and schema control.",
                "The **hidden mechanism** is either implicit partitions/kernels (Isolation Forest, OCSVM, GMM) or a compact deep embedding **z** from an MLP encoder. The invariant is the geometry of **healthy operating regions** in feature space.",
                "The **output layer** is an anomaly score such as path length, density likelihood, or distance to a learned center. **Loss/objective** is unsupervised density/one-class fitting on normal-only samples, then thresholding yields anomaly alarms."
              ),
              tuning: "Contamination rate, kernel scale, feature scaling, and threshold selection using held-out healthy/anomalous windows where possible.",
              caseStudy: "DAB **Isolation Forest / One-Class SVM** examples in **one_stop_AI_DAB_modulation.ipynb**.",
              links: repoLinks([NB.dabOne, NB.ensemble, NB.classic]),
            };
  return {
    pathId: null,
    title: `Maintenance — Unsupervised anomaly detection (${modality})`,
    summary:
      "Train on **normal** operation only; flag deviations using modality-appropriate one-class or reconstruction models, with EDA and threshold calibration following the tutorial.",
    algorithms: [
      {
        name: variant.name,
        intro: variant.intro,
        architecture: variant.architecture,
        tuning: variant.tuning,
        caseStudy: variant.caseStudy,
        paper: "Unsupervised subsection + EDA with t-SNE.",
        links: variant.links,
        external: [{ label: "scikit-learn IsolationForest", href: "https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.IsolationForest.html" }],
      },
    ],
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    scarceHtml: "",
    reviewContextHtml: MAINTENANCE_REVIEW_HTML,
    tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
  };
}

export function buildSSLFDDRecommendation(modality) {
  const variant =
    modality === "signal"
      ? {
          name: "Semi-supervised sequence classifiers",
          intro:
            "Use a **shared temporal encoder** for labeled and unlabeled waveforms, then regularize predictions under augmentations or teacher-student consistency so sequence structure is learned even when fault labels are scarce.",
          architecture: arch(
            "The **input layer** interfaces **signal modality** as waveform/spectrum windows for both labeled and unlabeled batches. Augmentations should preserve PE semantics, such as small noise, masking, or mild time-domain perturbations without destroying causality.",
            "The **hidden stack** is a shared **1D CNN/LSTM/Transformer** encoder producing latent **z**. It reveals invariants of temporal locality, causal trends, and periodic structure by forcing consistent embeddings/predictions across perturbations and pseudo-labeled views.",
            "The **output layer** is a supervised classification head plus optional projection/teacher heads. **Loss** combines labeled **CE/BCE** with consistency, pseudo-label, or contrastive objectives, matching the semi-supervised sequence FDD task."
          ),
          links: repoLinks([NB.rnn, NB.dabOne]),
        }
      : modality === "graph"
        ? {
            name: "Semi-supervised graph classifiers",
            intro:
              "Use a **GNN encoder** with few labeled graphs and many unlabeled ones; propagate relational structure through consistency regularization, pseudo-labeling, or graph contrastive objectives.",
          architecture: arch(
            "The **input layer** interfaces **graph modality** through node/edge features and connectivity for both labeled and unlabeled graphs, preserving topology across the SSL pipeline.",
            "The **hidden stack** is a shared **GNN** encoder with graph pooling or node-level readout. It reveals invariants of connectivity and multi-hop relational patterns by keeping graph embeddings stable under graph augmentations or teacher-student agreement.",
            "The **output layer** is a classification head on labeled graphs plus optional projection heads for contrastive/consistency learning. **Loss** combines supervised **CE/BCE** with graph-consistency or contrastive terms, directly matching semi-supervised graph FDD."
          ),
          links: repoLinks([NB.graphNN, "4_Neural_Network/README.md"], ["Graph_NN/README.md", "4_Neural_Network/README.md"]),
        }
      : modality === "unstructured"
        ? {
            name: "Semi-supervised vision classifiers",
            intro:
              "Use a CNN or ViT backbone with few labeled thermal/visual fault images and many unlabeled ones, regularizing predictions across augmentations or pseudo-labeled teacher outputs.",
            architecture: arch(
              "The **input layer** interfaces **unstructured modality** as normalized images for both labeled and unlabeled sets. Augmentations should preserve diagnostic content, avoiding transforms that erase hotspot or morphology information.",
              "The **hidden backbone** is a shared **CNN/ViT** encoder that reveals invariants of texture, hotspot shape, and spatial pattern by enforcing agreement across multiple views of the same healthy/fault image.",
              "The **output layer** is a classification head with optional projection/teacher branches. **Loss** combines labeled **CE/BCE** with consistency or pseudo-label terms, which fits semi-supervised visual FDD."
            ),
            links: repoLinks([NB.nnBasics]),
        }
      : {
          name: "Semi-supervised tabular classifiers",
          intro:
            "Use an MLP or shallow classical-to-neural pipeline with few labeled operating points and many unlabeled ones; regularize the decision surface so nearby healthy/fault points remain consistent under perturbation.",
          architecture: arch(
            "The **input layer** interfaces **tabular modality** as fixed-order feature vectors for labeled and unlabeled samples, with careful scaling and feature-schema alignment.",
            "The **hidden stack** is a shared **MLP** encoder or embedding layer producing latent **z**. It reveals invariants of class neighborhoods and smooth decision boundaries by forcing agreement under feature perturbations or pseudo-label updates.",
            "The **output layer** is a supervised classifier head plus optional projection/teacher branch. **Loss** combines labeled **CE/BCE** with consistency, pseudo-label, or contrastive terms to match semi-supervised tabular FDD."
          ),
          links: repoLinks([NB.nnBasics, NB.dabOne]),
        };
  return {
    pathId: null,
    title: `Maintenance — Semi-supervised FDD (${modality})`,
    summary:
      "Combine few labels with many unlabeled samples using modality-specific encoders, consistency regularization, pseudo-labeling, or contrastive objectives.",
    algorithms: [
      {
        name: variant.name,
        intro: variant.intro,
        architecture: variant.architecture,
        tuning: "Weight between losses; avoid confirmation bias.",
        caseStudy: "Paper cites SSL for FDD when labeling is costly.",
        paper: "Semi-supervised learning paragraph.",
        links: variant.links,
        external: [{ label: "FixMatch (reference architecture)", href: "https://arxiv.org/abs/2001.07685" }],
      },
    ],
    flags: { nn: true, mha: false, tinyml: false, piml: false },
    extras: { nn: true, mha: false, tinyml: false, piml: false },
    scarceHtml: "",
    reviewContextHtml: MAINTENANCE_REVIEW_HTML,
    tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
  };
}

export function buildFDDRecommendation(task, modality) {
  const flags = { nn: true, mha: false, tinyml: false, piml: false };
  const extras = { nn: true, mha: false, tinyml: false, piml: false };
  const algos = [];

  if (task === "unlabeled") {
    return buildUnsupervisedFDDRecommendation(modality);
  }
  if (task === "ssl") {
    return buildSSLFDDRecommendation(modality);
  }

  if (modality === "tabular") {
    algos.push({
      name: "Classic ML & ensembles",
      intro: "SVM, kNN, logistic regression, **decision trees**, **XGBoost** for labeled tabular FDD.",
      architecture: arch(
        "The **input layer** is a fixed-order tabular feature vector per sample/window (engineered stats, harmonics, operating conditions). The modality interface is column-based and rotation-variant, so feature order and scaling are controlled explicitly.",
        "The **hidden mechanism** depends on model family: margins/kernels (SVM), neighborhood geometry (kNN), linear log-odds interactions (logistic), or tree partitions (ensembles). These capture invariants of separability and feature-threshold interactions in fault space.",
        "The **output layer** is class probability/logit (binary or multiclass) or multi-label logits when configured. **Loss/objective** aligns to supervised FDD: cross-entropy/logistic loss for labels, with class weighting for imbalance; predictions map directly to health-state classification tasks."
      ),
      tuning: "Class imbalance, calibration, feature scaling; anomaly: train only on normal data.",
      caseStudy: "DAB **Isolation Forest / One-Class SVM** in **one_stop_AI_DAB_modulation.ipynb**.",
      paper: "FDD + unsupervised subsection.",
      links: repoLinks([NB.classic, NB.ensemble, NB.dabOne]),
      external: [],
    });
  } else if (modality === "signal") {
    algos.push({
      name: "Sequence models for FDD",
      intro:
        "**Supervised** fault classification/regression from **waveforms**: **encoder** → **pooled embedding** → **head**; harmonics can be **pre-features** or learned inside **1D conv**.",
      architecture: arch(
        "The **input layer** interfaces signal modality as windows/tensors **(channels x length)** from waveforms or spectra. Ordering along length is preserved so temporal/frequency context is not destroyed by tabular flattening.",
        "The **hidden layers** use 1D CNN or LSTM/GRU (BiLSTM only when backward context is physically valid). They reveal invariants of local transients, periodic patterns, and causal progression across samples.",
        "The **output layer** uses softmax for mutually exclusive faults, sigmoid for multi-label faults, or linear heads for regression-style health indices. **Loss** is CE/BCE/MSE according to task, with class weighting/focal variants for imbalance in labeled FDD."
      ),
      tuning: "Window length, bidirectional LSTM only if causality allows.",
      caseStudy: "**rnn_basics.ipynb**; DAB modulation classification.",
      paper: PAPER.signal_window,
      links: repoLinks([NB.rnn, NB.dabOne]),
      external: [],
    });
  } else if (modality === "graph") {
    algos.push({
      name: "Graph neural networks",
      intro:
        `Graph-level classification of fault modes when circuit graph is available—**connectivity, locality, multi-hop** matter. ${PAPER.graph_invariants}`,
      architecture: arch(
        "The **input layer** interfaces graph modality through node features, edge features, and connectivity (adjacency/edge index). This preserves relational PE structure (topology/layout paths) instead of collapsing to one categorical code.",
        "The **hidden stack** is message passing (GCN/GAT/SAGE) plus graph readout pooling. It reveals invariants of connectivity, local coupling, and multi-hop interactions that often drive fault propagation.",
        "The **output layer** predicts graph-level or node-level fault logits (softmax/sigmoid) or regression values. **Loss** is CE/BCE/MSE tied to the chosen supervised fault-learning target, with positive-class weighting when rare failures dominate."
      ),
      tuning: "Graph batching, dropout on edges; watch **over-smoothing** in deep stacks; readout (pool) choice affects fault separability.",
      tricks:
        "Start with **GCN / GraphSAGE / GAT** baselines; temporal faults may need **temporal GNN** or sequence+graph hybrids.",
      caseStudy: "Paper graph examples; course **Graph_NN** README for survey links (GML2023, Awesome GNN).",
      paper: PAPER.graph_invariants,
      links: repoLinks([NB.graphNN, "4_Neural_Network/README.md"], ["Graph_NN/README.md", "4_Neural_Network/README.md"]),
      external: [
        { label: "PyTorch Geometric", href: "https://pytorch-geometric.readthedocs.io/" },
        { label: "Open Graph Benchmark (datasets)", href: "https://ogb.stanford.edu/" },
      ],
    });
  } else {
    algos.push({
      name: "CNN / vision models",
      intro:
        "**Unstructured** **2D** inputs (thermal camera, IR, PCB raster): standard **CNN** backbones with **ImageNet** init optional—watch **domain shift** vs. lab lighting.",
      architecture: arch(
        "The **input layer** interfaces unstructured modality as image tensors (RGB or single-channel thermal) with normalization and consistent camera preprocessing.",
        "The **hidden layers** are convolutional/residual blocks with pooling, revealing invariants of local spatial patterns, textures, and hotspot morphology in diagnostic imagery.",
        "The **output layer** provides softmax or sigmoid logits for fault classes (or linear outputs for regression). **Loss** is CE/BCE/MSE depending on the learning task, with focal/weighted variants for rare-fault classification."
      ),
      tuning: "Augment carefully to avoid domain shift; transfer from ImageNet optional.",
      caseStudy: "Paper unstructured data + thermal CNN references.",
      links: repoLinks([NB.rnn]),
      external: [{ label: "torchvision models", href: "https://pytorch.org/vision/stable/models.html" }],
    });
  }

  if (task === "multiclass") {
    algos[0].name += " (multi-class softmax)";
    algos[0].tuning += " Softmax + cross-entropy; mutually exclusive classes.";
  } else if (task === "multilabel") {
    algos.push({
      name: "Multi-label heads",
      intro:
        "Adds a **K-dimensional sigmoid** head so **several faults** can be active—**not** mutually exclusive like softmax (paper **wire-bond + thermal** example).",
      architecture: arch(
        "The **input layer** is unchanged from the selected base modality encoder (tabular, signal, graph, or unstructured), so modality-specific interfaces remain intact.",
        "The **hidden representation** is the shared embedding **z** from the base encoder, which captures fault signatures that can overlap across labels.",
        "The **output layer** has **K** independent sigmoid logits (one per fault mode). **Loss** is per-class BCEWithLogits (often with class-wise weights), matching the multi-label learning task where multiple simultaneous faults can be true."
      ),
      tuning: "Pos_weight per label; threshold tuning on validation.",
      caseStudy: "Paper multi-label vs multi-class distinction.",
      paper: "Problem configuration paragraph.",
      links: repoLinks([NB.ensemble]),
      external: [],
    });
  }

  const multilabelNote = task === "multilabel" ? `<p class="paper-note">${PAPER.fdd_multilabel}</p>` : "";
  return {
    pathId: null,
    title: `Maintenance — FDD (${task}, ${modality})`,
    summary: "Map operational data to health states; follow supervision type and modality.",
    algorithms: algos,
    flags,
    extras,
    scarceHtml: "",
    tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
    reviewContextHtml: `${MAINTENANCE_REVIEW_HTML}${multilabelNote}`,
  };
}

export function buildRULRecommendation(inMod, probabilistic) {
  const flags = { nn: true, mha: false, tinyml: false, piml: false };
  const extras = { nn: true, mha: false, tinyml: false, piml: false };
  const modLabel = inMod === "signal" ? "signal-domain" : inMod === "hybrid" ? "hybrid" : "tabular";
  const deterministicVariant =
    inMod === "signal"
      ? {
          name: "Deterministic sequence RUL regressors",
          intro:
            "**LSTM/GRU/TCN** backbones map degradation trajectories to a **point estimate** of remaining life. Best when temporal ordering carries wear progression information that would be lost by static feature aggregation.",
          architecture: arch(
            "The **input layer** interfaces **signal modality** as degradation sequences **(T x C)**, where channels are sensor traces or health indicators ordered in time. Sequence alignment and normalization preserve progression semantics.",
            "The **hidden layers** are temporal models such as **LSTM/GRU/TCN**, which reveal invariants of wear progression, trend shape, and regime transitions across the history window.",
            "The **output layer** is a linear scalar regressor for remaining time/cycles. **Loss** is **MSE/Huber** against labeled RUL, directly matching deterministic supervised forecasting from temporal degradation evidence."
          ),
          links: repoLinks([NB.rul, NB.rnn]),
        }
      : inMod === "hybrid"
        ? {
            name: "Deterministic multimodal RUL regressors",
            intro:
              "Use **multi-branch encoders** when degradation evidence comes from mixed modalities such as tabular health indicators plus waveforms or images, then fuse into a single point-estimate RUL head.",
            architecture: arch(
              "The **input layer** interfaces **hybrid modality** through separate branches, for example **MLP** for tabular indicators and **LSTM/CNN** for signals or images. Each branch preserves its native structure before fusion.",
              "The **hidden stack** is parallel encoders plus a fusion module (concat, attention, or gating) that reveals invariants shared across modalities, such as agreement between static health indicators and temporal degradation signatures.",
              "The **output layer** is a linear RUL regressor on the fused embedding. **Loss** is **MSE/Huber** on labeled remaining life, tying multimodal evidence to deterministic supervised prognostics."
            ),
            links: repoLinks([NB.rul, NB.dabOne]),
          }
        : {
            name: "Deterministic tabular RUL regressors",
            intro:
              "**MLP** or probabilistic-boosting baselines without uncertainty output map engineered health indicators to a **point estimate** of remaining life. Use when degradation is well summarized by per-sample features.",
            architecture: arch(
              "The **input layer** interfaces **tabular modality** as a fixed-order vector of engineered health indicators, operating summaries, or cycle-level degradation features with careful scaling.",
              "The **hidden layers** are FC stacks or shallow ensemble-style latent partitions that reveal invariants of smooth degradation trends and feature interactions relevant to wear state.",
              "The **output layer** is a single linear RUL regressor. **Loss** is **MSE/Huber** against labeled remaining life, matching deterministic supervised regression on tabular prognostics data."
            ),
            links: repoLinks([NB.rul, NB.nnBasics]),
          };
  const probabilisticVariant =
    inMod === "signal"
      ? {
          name: "Probabilistic sequence RUL (Gaussian / mixture head)",
          intro:
            "**Temporal encoders** such as **LSTM/TCN** summarize degradation histories, then predict a distribution over remaining life so uncertainty widens in sparse or regime-shifted parts of sequence space.",
          architecture: arch(
            "The **input layer** interfaces **signal modality** as ordered degradation sequences **(T x C)**, preserving temporal progression and cross-channel sensor structure before uncertainty estimation.",
            "The **hidden backbone** is a temporal encoder that reveals invariants of degradation pace, nonlinearity, and regime transitions in the history window, compressing them into latent state **z**.",
            "The **output layer** predicts distribution parameters such as **mu**, **log sigma^2**, or mixture weights/components. **Loss** is negative log-likelihood, directly matching probabilistic supervised RUL forecasting from sequence data."
          ),
          links: repoLinks([NB.rul, NB.rnn, NB.mdn]),
        }
      : inMod === "hybrid"
        ? {
            name: "Probabilistic multimodal RUL (fusion + uncertainty head)",
            intro:
              "**Multi-branch prognostics** combine heterogeneous degradation evidence, then use a probabilistic head to estimate both expected RUL and confidence under multimodal uncertainty.",
          architecture: arch(
            "The **input layer** interfaces **hybrid modality** via separate encoders for tabular, signal, image, or other evidence streams, preserving modality-specific structure before fusion.",
            "The **hidden stack** is multimodal fusion over branch embeddings, revealing invariants that are stable across modalities while preserving disagreements as uncertainty cues.",
            "The **output layer** predicts Gaussian or mixture distribution parameters over RUL. **Loss** is negative log-likelihood, so the model learns both central estimate and uncertainty consistent with labeled failure-time outcomes."
          ),
          links: repoLinks([NB.rul, NB.dabOne, NB.mdn]),
        }
      : {
          name: "Probabilistic tabular RUL (Gaussian / mixture head)",
          intro:
            "**MLP** backbones on engineered health indicators feed a probabilistic output head, giving mean-plus-uncertainty or mixture distributions instead of only a point estimate.",
          architecture: arch(
            "The **input layer** interfaces **tabular modality** as a fixed-order feature vector of health indicators and operating summaries with explicit scaling and schema control.",
            "The **hidden backbone** is an MLP that reveals invariants of degradation trend interactions across features while compressing the health state into latent representation **z**.",
            "The **output layer** predicts Gaussian or mixture parameters for RUL. **Loss** is negative log-likelihood, which directly optimizes calibrated probabilistic supervised prognostics on tabular data."
          ),
          links: repoLinks([NB.rul, NB.mdn, NB.nnBasics]),
        };

  const algos = [];
  if (probabilistic) {
    algos.push({
      name: probabilisticVariant.name,
      intro: probabilisticVariant.intro,
      architecture: probabilisticVariant.architecture,
      tuning: "Variance floor; check calibration; MDN mixture count.",
      caseStudy: "**rul_prediction.ipynb** (IGBT NASA dataset); paper Fig. on uncertainty bands.",
      paper: "RUL section — uncertainty grows in sparse regions.",
      links: probabilisticVariant.links,
      external: [],
    });
  } else {
    algos.push({
      name: deterministicVariant.name,
      intro: deterministicVariant.intro,
      architecture: deterministicVariant.architecture,
      tuning: "Sequence length for LSTM; early stopping.",
      caseStudy: "**rul_prediction.ipynb** backbone comparisons.",
      paper: "RUL modeling subsection.",
      links: deterministicVariant.links,
      external: [],
    });
  }

  return {
    pathId: null,
    title: `Maintenance — RUL (${inMod} inputs, ${probabilistic ? "probabilistic" : "deterministic"})`,
    summary:
      `RUL path for **${modLabel}** inputs. Degradation trajectories from the NASA IGBT tutorial case motivate ${probabilistic ? "**uncertainty-aware**" : "**point-estimate**"} prognostics depending on decision risk.`,
    algorithms: algos,
    flags,
    extras,
    scarceHtml: "",
    tutorialPipelineHtml: TUTORIAL_ML_PIPELINE,
    reviewContextHtml: `${MAINTENANCE_REVIEW_HTML}<p class="paper-note">Sparse or extrapolated regimes: uncertainty-aware heads (Gaussian / mixture) should show wider bands where data are thin.</p>`,
  };
}

/**
 * Abridged excerpts aligned with review_extracted.txt / the IEEE TIE invited tutorial.
 * Rendered with inline **bold** / *italic* → HTML in the app.
 */
export const ARTICLE = {
  framing:
    "The article is a **foundation guideline**, not a catalog of latest papers: it helps readers answer **when** AI is useful in PE, **what** methods fit the task and data modality, and **how** to design solutions. A central premise is that **PE data are diverse** (tabular, signal, field, graph, unstructured)—effective modeling requires matching **invariances** to model classes.",

  mha_core:
    "**MHAs** are generic, problem-independent optimizers guided by strategic rules. Each candidate is evaluated with an **objective function**; constraints enter via **penalty terms**. The **output space** informs search in the **input space**—physical mapping varies by application (design variables vs. performance metrics, control actions, or identification residuals). **Algorithm selection** should reflect input/output space structure: **PSO/DE** for continuous vectors, **SA/ACO** for discrete moves, **GA** for **hybrid** mixed variables, and **multi-objective variants** when Pareto fronts matter.",

  mha_tuning_article:
    "**Hyperparameter tuning** balances **global exploration** vs. **local exploitation**—often emphasize exploration early, then exploitation (e.g. **PSO inertia** schedules). If the landscape is **multi-modal**, **niching** helps; if regions are **steep**, **gradient-informed** heuristics can accelerate convergence.",

  stats:
    "**Statistical testing** is essential because stochastic algorithms vary across runs. The **t-test** compares **two** algorithms; **ANOVA** applies to **three or more**. Report **p-values** and which mean is better—small **p** supports rejecting “no difference.”",

  moo:
    "PE objectives (**efficiency**, **density**, **reliability**, **cost**) conflict—**multi-objective** formulations are natural. **Decomposition** methods split the problem into weighted single-objective subproblems; **weights** and **scale normalization** matter. **Population-based** methods approximate the **Pareto front**; **non-dominated sorting (NSA)** ranks solutions by dominance. **NSA** is exact in small **discrete** spaces but hits the **curse of dimensionality** when continuous spaces are discretized—**NSGA-II/III** integrate NSA with metaheuristic search for practical PE fronts.",

  rl:
    "**RL** learns policies by **interaction** and **rewards**, often as a **Markov decision process**: **actors** map states to actions, **critics** estimate value. **Reward design** is critical—it encodes objectives and trade-offs (steady-state vs. transient). RL suits **control** (converter as environment) and **high-dimensional** sequential decisions; compare runs with multiple **seeds** and statistical tests.",

  ml_workflow:
    "Data-driven projects follow a **generic ML workflow**: (1) **data acquisition**, (2) **EDA and preprocessing**, (3) **model training**, (4) **hyperparameter tuning**, (5) **deployment**. **Steps 2–4 loop**: poor predictions often signal **bad data** or **outliers**—return to **EDA**.",

  eda:
    "**EDA** examines data from multiple views—**histograms** show spread, skew, modality; **correlation maps** reveal redundant or uninformative features and latent **equality constraints** (e.g. dependent phase-shift variables in DAB). **t-SNE** visualizes manifolds: clusters indicate regimes; **gaps** flag **sparse** or **interpolation** risks and motivate **partitioning** or **transfer learning**.",

  eda_short:
    "For diagnostics and health tasks, the same **EDA** ideas apply: visualize distributions and dependencies before committing to a model family.",

  tabular_pe:
    "**Tabular** data use labeled rows/columns of **numerical** and **categorical** variables. A defining trait is **rotation variance**: **reordering columns destroys meaning** because each column is a physically defined feature. That differs from waveforms and images where structure is tied to continuity.",

  signal_pe:
    "**Signal-domain** data are **1-D sequences** with **locality**, **hierarchical composition** (fine patterns inside coarse envelopes), and **causality**. **Sliding-window tabularization** plus generic tabular ML is common but **ill-posed**: it breaks causality, drops long-horizon dependence, and treats ordered samples as independent slots—prefer models that respect **sequence structure** (RNN, 1D CNN, causal attention).",

  graph_pe:
    "**Graph** data encode **topological connectivity**, **locality**, and **multi-hop dependency**—relevant to topologies, PCBs, and layouts. **Graph-based representations** can generalize beyond treating layout as a single categorical code.",

  field_pe:
    "**Field** samples pair coordinates with quantities (flux, temperature, stress). **Invariances** include **geometry** and **multi-physics laws** (often **PDEs**). Treating fields like plain images may **neglect physics and boundaries**—**geometry-aware** or **physics-informed** models are needed when fidelity matters.",

  hybrid_pe:
    "**Hybrid** inputs fuse modalities; **multi-branch** encoders and **fusion** (concat, gating, attention) are typical—balance capacity and **Occam’s razor** (justify complexity with gains).",

  learning_types:
    "Before choosing an algorithm, fix the **learning type**: **supervised** (labeled I/O), **unsupervised** (structure/anomaly without labels), **semi-supervised** (few labels + many unlabeled samples—promising for **FDD** when labeling is costly), or **RL** (policy from rewards). **Multi-class** vs. **multi-label** matters when **faults can co-occur**—use **sigmoid + BCE** per class, not a single **softmax**.",

  ssl:
    "**Semi-supervised learning** exploits **labeled** and **unlabeled** data jointly—often via consistency or pseudo-labeling—improving accuracy when labels are scarce but unlabeled operation is abundant.",

  piml:
    "**Physics-informed ML** integrates **priors**: **feature engineering**, **physics residuals in the loss** (PINNs), **physics-in-architecture** (PANNs), or combining sparse observations with structured constraints. Trade-offs: **soft** physics penalties need **weight tuning**; **hard** architectural priors limit expressiveness if physics is misspecified. PINNs can complement **FEM**; PANNs can slash data needs when structure matches the converter.",

  agentic:
    "**Agentic AI** combines **LLMs** with **memory** (episodic, semantic, procedural—often **RAG**), **tools** (simulation, parsing, computation), and **planning** (chain-of-thought, ReAct, plan-and-execute). It shifts workflows from one-shot answers to **goal-driven** loops with **guardrails** and **human oversight** for safety-critical decisions.",

  sim_batch:
    "**Simulation** is the primary batch data source: **sample** parameters (grid or **LHS**), **run** the engine with configured I/O, **parse** and **organize** outputs—loop for dataset construction feeding ML and optimization.",

  control_ml:
    "In **control**, ML can **assist** design (surrogates, tuning) or **embed** as **imitation** controllers or **RL** policies. **Deployment** must respect **latency**, **memory**, and **numerical precision**—motivating **TinyML** (shallow-wide nets, **quantization**, **pruning**, efficient runtimes).",

  tinyml_article:
    "For edge deployment, **architecture** is a primary lever: at similar **parameter counts**, **shallow-wide** networks often beat **deep-narrow** for **latency**. **Compression** (e.g. **L1** pruning, **quantization**) and runtimes such as **ONNX Runtime** materially speed inference—the tutorial reports large speedups on adaptive modulation examples.",

  rul:
    "For **RUL**, **probabilistic** heads (e.g. **Gaussian** with mean and log-variance, trained with **NLL**) express **epistemic** uncertainty—**uncertainty should grow** in **sparse** regions of the input space. **Mixture** heads help when the conditional distribution is **multi-modal**.",
};

function modalityArticleBodies(inKey, outKey) {
  const u = new Set([inKey, outKey]);
  const chunks = [];
  if (u.has("tabular")) chunks.push(ARTICLE.tabular_pe);
  if (u.has("signal")) chunks.push(ARTICLE.signal_pe);
  if (u.has("graph")) chunks.push(ARTICLE.graph_pe);
  if (u.has("field")) chunks.push(ARTICLE.field_pe);
  if (u.has("hybrid")) chunks.push(ARTICLE.hybrid_pe);
  if (chunks.length === 0) return ARTICLE.ml_workflow;
  return chunks.join("\n\n");
}

/**
 * @param {Record<string, unknown>} state Wizard state from app.js
 * @returns {{ title: string, body: string }[]}
 */
export function getArticleSections(state, rec) {
  const sections = [{ title: "Aim of the tutorial (article)", body: ARTICLE.framing }];
  const phase = state.phase;
  if (!phase) return sections;

  const push = (title, body) => sections.push({ title, body });

  if (phase === "design" && state.designGoal === "optimization") {
    push("Meta-heuristic algorithms", ARTICLE.mha_core);
    push("Tuning MHAs", ARTICLE.mha_tuning_article);
    push("Statistical comparison", ARTICLE.stats);
    if (state.optDim === "low" && state.optMoo) push("Multi-objective optimization", ARTICLE.moo);
    if (state.optDim === "high") push("Reinforcement learning", ARTICLE.rl);
  } else if (phase === "design" && state.designGoal === "modeling") {
    push("Generic ML workflow", ARTICLE.ml_workflow);
    push("EDA", ARTICLE.eda);
    push("PE data formats for your modalities", modalityArticleBodies(state.modelIn, state.modelOut));
  } else if (phase === "control" && state.controlMode === "assist" && state.assistBranch === "modeling") {
    push("Generic ML workflow", ARTICLE.ml_workflow);
    push("EDA", ARTICLE.eda);
    push("PE data formats for your modalities", modalityArticleBodies(state.modelIn, state.modelOut));
  } else if (phase === "control" && state.controlMode === "assist" && state.assistBranch === "optimization") {
    push("Meta-heuristic algorithms", ARTICLE.mha_core);
    push("Tuning MHAs", ARTICLE.mha_tuning_article);
    push("Statistical comparison", ARTICLE.stats);
    if (state.optDim === "low" && state.optMoo) push("Multi-objective optimization", ARTICLE.moo);
    if (state.optDim === "high") push("Reinforcement learning", ARTICLE.rl);
  } else if (phase === "design" && state.designGoal === "process") {
    push(state.processKind === "agent" ? "Agentic AI" : "Simulation batch acquisition", state.processKind === "agent" ? ARTICLE.agentic : ARTICLE.sim_batch);
  } else if (phase === "control" && state.controlMode === "controller") {
    push("ML in control", ARTICLE.control_ml);
    if (state.controlPolicy === "rl") push("Reinforcement learning", ARTICLE.rl);
    if (state.controlDeploy === "online") push("TinyML and edge deployment", ARTICLE.tinyml_article);
  } else if (phase === "maintenance" && state.maintKind === "fdd") {
    push("Learning types and task formulation", ARTICLE.learning_types);
    if (state.fddSup === "ssl") push("Semi-supervised learning", ARTICLE.ssl);
    push("EDA", ARTICLE.eda_short);
  } else if (phase === "maintenance" && state.maintKind === "sid") {
    push("Generic ML workflow", ARTICLE.ml_workflow);
    push("EDA", ARTICLE.eda);
    push("PE data formats for your modalities", modalityArticleBodies(state.sidIn, state.sidOut));
  } else if (phase === "maintenance" && state.maintKind === "rul") {
    push("Probabilistic RUL and uncertainty", ARTICLE.rul);
  }

  if (rec.flags?.piml && !sections.some((s) => s.title.includes("Physics-informed"))) {
    push("Physics-informed ML", ARTICLE.piml);
  }

  return sections;
}

/**
 * Fundamentals_of_AI_for_PE folder ↔ IEEE tutorial section mapping (same spirit as the course README).
 * @returns {{ folder: string, sections: string, href: string }[]}
 */
export function getRepoArticleAlignment(state, rec) {
  /** @type {{ folder: string, sections: string, href: string }[]} */
  const rows = [];
  const seen = new Set();
  /** @param {string} folder @param {string} sections */
  const push = (folder, sections) => {
    const k = `${folder}|${sections}`;
    if (seen.has(k)) return;
    seen.add(k);
    rows.push({ folder, sections, href: ghTree(folder) });
  };

  const phase = state.phase;
  const algos = rec.algorithms || [];
  const algoBlob = JSON.stringify(algos);

  const pushFromRecommendedLinks = () => {
    if (/Buck_Design/i.test(algoBlob)) push("9_Case_Studies_PE/Buck_Design", "VII-A–VII-C");
    if (/Performance_Modeling_and_Design|one_stop_AI_DAB/i.test(algoBlob)) {
      push("9_Case_Studies_PE/DAB_Design/Performance_Modeling_and_Design", "IV-B; VII-A–VII-C");
    }
    if (/Time_Domain_Modeling|time_series_modeling/i.test(algoBlob)) {
      push("9_Case_Studies_PE/DAB_Design/Time_Domain_Modeling", "VII-B");
    }
    if (/Adaptive_Modulation|TinyML\.ipynb/i.test(algoBlob)) {
      push("9_Case_Studies_PE/DAB_Design/Adaptive_Modulation", "VII-D");
    }
    if (/IGBT_Maintenance|rul_prediction/i.test(algoBlob)) push("9_Case_Studies_PE/IGBT_Maintenance", "VII-F");
    if (/Magnetic_Modeling|magnet_/i.test(algoBlob)) push("9_Case_Studies_PE/Magnetic_Modeling", "III-C; IV-F; IV-G");
  };

  const hasPann = algos.some((a) => /PANN|physics-in-architecture/i.test(`${a.name || ""} ${a.intro || ""}`));
  const modelingModalities = (a, b) => {
    const u = new Set([a, b].filter(Boolean));
    return {
      hasField: u.has("field"),
      hasGraph: u.has("graph"),
      hasSignal: u.has("signal"),
      hasTabular: u.has("tabular"),
      hasHybrid: u.has("hybrid"),
    };
  };

  // Optimization (low- or high-dimensional)
  if (
    (phase === "design" && state.designGoal === "optimization") ||
    (phase === "control" && state.controlMode === "assist" && state.assistBranch === "optimization")
  ) {
    if (state.optDim === "high") {
      push("7_Reinforcement_Learning", "IV-D; IV-F");
    } else {
      push("1_MHA/Single_Objective_MHA", "II-A; II-C; II-D");
      if (state.optMoo) push("1_MHA/Multi_Objective_MHA", "II-B; II-C");
    }
  }

  // Process automation
  if (phase === "design" && state.designGoal === "process") {
    if (state.processKind === "sim") push("8_PE_Simulation_Automation", "IV-A");
    else push("6_Agentic_AI", "VI");
  }

  // Control (embedded policy / TinyML)
  if (phase === "control" && state.controlMode === "controller") {
    if (rec.flags?.nn) {
      push("4_Neural_Network/Fundamentals", "III; IV-C; IV-D; IV-F");
      push("4_Neural_Network/Good_Practices", "IV-G");
    }
    if (state.controlPolicy === "rl") push("7_Reinforcement_Learning", "IV-D; IV-F");
    if (state.controlDeploy === "online") push("9_Case_Studies_PE/DAB_Design/Adaptive_Modulation", "VII-D");
  }

  // Modeling & system ID
  if (
    (phase === "design" && state.designGoal === "modeling") ||
    (phase === "control" && state.controlMode === "assist" && state.assistBranch === "modeling") ||
    (phase === "maintenance" && state.maintKind === "sid")
  ) {
    const mi = phase === "maintenance" ? state.sidIn : state.modelIn;
    const mo = phase === "maintenance" ? state.sidOut : state.modelOut;
    const m = modelingModalities(mi, mo);

    if (rec.extras?.nn) {
      push("4_Neural_Network/Fundamentals", "III; IV-C; IV-D; IV-F");
      push("4_Neural_Network/Good_Practices", "IV-G");
    }
    if (m.hasTabular) {
      push("2_Classic_ML", "III-A; IV-D; IV-E");
      push("3_Ensemble_Learning", "III-A; IV-D; IV-E");
    }
    if (m.hasSignal) push("4_Neural_Network/Signal_Domain", "III-C; IV-F; IV-G");
    if (m.hasGraph) push("4_Neural_Network/Graph_NN", "III-E; IV-F");
    if (m.hasHybrid) push("4_Neural_Network/Multi_Modal_Distribution", "IV-E; IV-F");
    if (rec.flags?.piml) {
      push("5_PIML/PINN", "V");
      if (hasPann || m.hasField) push("5_PIML/PANN", "V-C; VII-E");
    }
    pushFromRecommendedLinks();
  }

  // FDD
  if (phase === "maintenance" && state.maintKind === "fdd") {
    push("2_Classic_ML", "III-A; IV-D; IV-E");
    push("3_Ensemble_Learning", "III-A; IV-D; IV-E");
    const mod = state.fddModality || "tabular";
    if (mod === "signal") push("4_Neural_Network/Signal_Domain", "III-C; IV-F; IV-G");
    if (mod === "graph") push("4_Neural_Network/Graph_NN", "III-E; IV-F");
    if (mod === "unstructured" || mod === "tabular") {
      if (rec.extras?.nn) {
        push("4_Neural_Network/Fundamentals", "III; IV-C; IV-D; IV-F");
      }
    }
    pushFromRecommendedLinks();
  }

  // RUL
  if (phase === "maintenance" && state.maintKind === "rul") {
    push("4_Neural_Network/Multi_Modal_Distribution", "IV-E; IV-F");
    push("4_Neural_Network/Signal_Domain", "III-C; IV-F; IV-G");
    push("9_Case_Studies_PE/IGBT_Maintenance", "VII-F");
    pushFromRecommendedLinks();
  }

  return rows;
}

export const FURTHER_READING = [
  { label: "Course repository root", href: REPO_ROOT },
  { label: "Repository README (notebook index)", href: ghBlob("README.md") },
  { label: "Case studies README", href: ghBlob(NB.caseReadme) },
];
