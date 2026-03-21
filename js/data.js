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
          "Universal approximators for smooth surrogates; **Tanh** activations mentioned for smoother landscapes vs. tree staircases in the paper’s comparison narrative.",
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
          "Front MLP encodes tabular context; recurrent or causal 1D conv/Transformer blocks model **temporal causality** in outputs.",
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
          "Produce or refine graphs (e.g., topology candidates) conditioned on tabular specs. Paper discusses graphs for layouts, EMI, and topology reasoning.",
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
          "Train with data loss + **physics residual** on collocation points; supports inverse problems (identify coefficients).",
        tuning: "Loss weighting data vs. PDE terms; learning rate; many epochs may be needed.",
        caseStudy: "Tutorial apparent-power constraint example; thermal/EM PDE contexts.",
        paper: PAPER.piml_loss,
        links: repoLinks([NB.pinnOde, NB.pinn1, NB.pinn2, NB.pimlReadme]),
        external: [{ label: "Physics-informed ML — Nature Reviews Physics survey (cited in paper)", href: "https://www.nature.com/articles/s42254-021-00314-5" }],
      },
      {
        name: "CNN / FNN field decoders",
        intro: "Treat gridded fields like images when physics embedding is secondary—faster but less physically constrained.",
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
          "Separate encoders for tabular vs. other tensors; fusion then task heads—common for performance modeling with heterogeneous PE data.",
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
          "Encode locality and multi-scale phenomena; tutorial contrasts with sliding-window MLP on **Dataset III** time-series task.",
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
          "Specialized recurrent structure with embedded converter physics—orders-of-magnitude data reduction in tutorial claims (see PANN README).",
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
        intro: "Maps input trajectories to output trajectories preserving temporal structure.",
        tuning: "Teacher forcing, attention masks, sequence lengths.",
        caseStudy: "Dataset III in tutorial; **time_series_modeling.ipynb**.",
        paper: PAPER.signal_window,
        links: repoLinks([NB.dabTs, NB.rnn]),
        external: [],
      },
      {
        name: "PANN",
        intro: "Physics-in-architecture for consistent waveforms with trainable physical parameters.",
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
        intro: "Condition graph generation on waveform features (e.g., synthesized topology).",
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
        intro: "Couple measured excitations to field quantities with physics residuals where applicable.",
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
        intro: "Encode waveforms and tabular/context features separately, then fuse.",
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
        intro: "Exploit connectivity—paper discusses EMI/layout modeling vs. naive categorical encoding.",
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
        intro: "Graph structure with time-varying node features.",
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
        intro: "Encode topology, decode modified graph for co-design.",
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
        intro: "Combine relational encoder with grid or mesh-based field head.",
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
        intro: "Branches for graph and other modalities with gated fusion.",
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
        intro: "Downsample field maps to embedding vector for regression/classification.",
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
        intro: "Predict time series from spatial field snapshots or vice versa.",
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
        intro: "Use field maps to infer connectivity or layout graphs.",
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
        intro: "Predict one field from another with PDE constraints.",
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
        intro: "Combine gridded tensors with tabular/signal features.",
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
        intro: "Each modality processed by appropriate shallow/deep encoder; fused embeddings.",
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
        intro: "LSTM/1D CNN for sequences + MLP for static features.",
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
        intro: "Combine graph encodings with embeddings of other modalities.",
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
        intro: "2D/3D convolutions on fields + other encoders.",
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
        intro: "Multiple experts per modality with gating—only when data justify complexity.",
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
        "Policy search in high dimensions; reward design encodes PE objectives (transients vs. steady-state). Tutorial cites RL reviews for converters.",
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
    algorithms: [],
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
        "MDP formulation: converter or simulator as **environment**, policy as **actor**; reward encodes tracking, efficiency, constraints.",
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
        "Offline-train NN to mimic MPC or legacy controller; deploy with low latency—ties to **Modeling** paths for training data.",
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
        "Quantization (FP32→INT8), pruning with **L1**, shallow-wide MLPs, ONNX Runtime/TFLite; matches **adaptive modulation** case.",
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
  return {
    pathId: null,
    title: `Maintenance — Unsupervised anomaly detection (${modality})`,
    summary:
      "Train on **normal** operation only; flag deviations—Isolation Forest, one-class SVM, GMM, clustering + t-SNE visualization per tutorial.",
    algorithms: [
      {
        name: "Isolation Forest / One-Class SVM / deep SVDD-style models",
        intro:
          "Learn boundary of normal class; common when fault labels are rare. Tutorial NPC-DAB hybrid example cites isolation forest / one-class SVM.",
        tuning: "Contamination rate, kernel scale (OCSVM), feature scaling.",
        caseStudy: "**one_stop_AI_DAB_modulation.ipynb** anomaly sections.",
        paper: "Unsupervised subsection + EDA with t-SNE.",
        links: repoLinks([NB.dabOne, NB.ensemble]),
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

export function buildSSLFDDRecommendation() {
  return {
    pathId: null,
    title: "Maintenance — Semi-supervised FDD",
    summary:
      "Combine few labels with many unlabeled samples—graph-based SSL (paper cites PV example), consistency regularization, pseudo-labeling.",
    algorithms: [
      {
        name: "Semi-supervised classifiers",
        intro: "Extend supervised encoders with unsupervised losses on unlabeled batch.",
        tuning: "Weight between losses; avoid confirmation bias.",
        caseStudy: "Paper cites SSL for FDD when labeling is costly.",
        paper: "Semi-supervised learning paragraph.",
        links: repoLinks([NB.nnBasics, NB.dabOne]),
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
    return buildSSLFDDRecommendation();
  }

  if (modality === "tabular") {
    algos.push({
      name: "Classic ML & ensembles",
      intro: "SVM, kNN, logistic regression, **decision trees**, **XGBoost** for labeled tabular FDD.",
      tuning: "Class imbalance, calibration, feature scaling; anomaly: train only on normal data.",
      caseStudy: "DAB **Isolation Forest / One-Class SVM** in **one_stop_AI_DAB_modulation.ipynb**.",
      paper: "FDD + unsupervised subsection.",
      links: repoLinks([NB.classic, NB.ensemble, NB.dabOne]),
      external: [],
    });
  } else if (modality === "signal") {
    algos.push({
      name: "Sequence models for FDD",
      intro: "1D CNN / LSTM / GRU encoders; optional harmonic features—paper warns on windowing pitfalls.",
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
      intro: "Thermal/IR images or rasterized PCB **images**—2D CNN backbones.",
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
      intro: "Sigmoid per class + BCE for co-occurring faults (wire-bond + thermal runaway example in paper).",
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

  const algos = [];
  if (probabilistic) {
    algos.push({
      name: "Probabilistic RUL (Gaussian / mixture head)",
      intro:
        "Predictive distribution via **NLL** loss; heteroscedastic outputs (mean + variance) or **MDN** for multi-modal uncertainty.",
      tuning: "Variance floor; check calibration; MDN mixture count.",
      caseStudy: "**rul_prediction.ipynb** (IGBT NASA dataset); paper Fig. on uncertainty bands.",
      paper: "RUL section — uncertainty grows in sparse regions.",
      links: repoLinks([NB.rul, NB.mdn, NB.rnn]),
      external: [],
    });
  } else {
    algos.push({
      name: "Deterministic RUL regressors",
      intro: "MLP/LSTM regress RUL point estimates—simpler but no uncertainty.",
      tuning: "Sequence length for LSTM; early stopping.",
      caseStudy: "**rul_prediction.ipynb** backbone comparisons.",
      paper: "RUL modeling subsection.",
      links: repoLinks([NB.rul, NB.nnBasics]),
      external: [],
    });
  }

  return {
    pathId: null,
    title: `Maintenance — RUL (${inMod} inputs, ${probabilistic ? "probabilistic" : "deterministic"})`,
    summary:
      "Degradation trajectories from NASA IGBT dataset in tutorial; probabilistic heads recommended when risk matters.",
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
