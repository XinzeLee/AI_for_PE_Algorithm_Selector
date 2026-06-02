# AI for Power Electronics — Algorithm Selector

<p align="center">
  <a href="https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/">
    <img src="https://img.shields.io/badge/Open_the_algorithm_selector-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Open the algorithm selector in your browser" />
  </a>
</p>

<p align="center">
  <strong><a href="https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/">Open the web app →</a></strong><br />
  <sub>If the hosted link is unavailable, see <a href="#run-locally">Run locally</a>.</sub>
</p>

---

## Authorship & status

- **Web app author:** Xinze Li  
- **Review article:** Xinze Li, Fanfan Lin, Juan J. Rodríguez-Andina, Sergio Vazquez, Homer Alan Mantooth, Leopoldo García Franquelo, “Fundamentals of Artificial Intelligence for Power Electronics,” *IEEE Transactions on Industrial Electronics*, 2026.

This app is an **additional material** accompanying the IEEE TIE review article. It provides step-by-step guidance for AI algorithm selection, design, and tuning for Power Electronics scenarios, aligned with the review article’s **What–Which–How** framework. GitHub Jupyter Notebook Materials: [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE).

---

## About

This interactive wizard recommends AI/ML algorithms and provides tailored guidance using the review article’s **What–Which–How** framework:

- **What** (Sec. I–II): Identify your PE lifecycle phase (design / control / maintenance), specific task, and data modality (tabular, signal, field, graph, hybrid).
- **Which** (Sec. III–VI): Match the recommended AI model family (classic ML, NN, PIML, MHA, RL, agentic AI) to your task and data structure.
- **How** (Sec. III–VI): Apply PE-specific tuning practices — feature scaling, EDA, physics-informed constraints, and statistical comparison across runs.
- **Case studies** (Sec. VII): Reproduce the closest D1–D7 notebook from [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE) before adapting to your hardware or dataset.

Section numbers in reports follow the **revised manuscript** (Roman **I–VIII**), aligned with the repo README.

**ChatGPT companion:** For deeper Q&A and report-style help, a button below the wizard and report opens the [**Fundamentals of AI for PE**](https://chatgpt.com/g/g-698618895c2481919e113c49bafe23ee-fundamentals-of-ai-for-pe) Custom GPT in a new tab. Use the “Copy prompt” button to send your wizard selections and report directly to the assistant.

---

## Run locally

The app uses **ES modules**; opening `index.html` as a file will not work — use a local HTTP server.

**Windows:** double-click **`start-server.bat`** (or run **`start-server.ps1`**), then open **`http://127.0.0.1:8765/`**.

**Command line:**

```bash
cd AI_for_PE_Algorithm_Selector
python -m http.server 8765
```

Then open **`http://127.0.0.1:8765/`** in your browser.

If the port is in use, choose another (e.g. `8080`) or use:

```bash
npx --yes serve -l 8765
```

**Troubleshooting:** confirm the terminal shows the server listening; try `127.0.0.1` instead of `localhost`; allow Python through the firewall if needed; check `python --version`.

---

## Repository layout

| Path | Role |
|------|------|
| `index.html` | Page shell |
| `css/styles.css` | Styling |
| `js/data.js` | Glossary, recommendations, GitHub URLs, review-article section mapping |
| `js/app.js` | Wizard and report UI |
| `start-server.bat` / `start-server.ps1` | Local server (Windows) |

---

## Notes

- **Article ↔ repo mapping:** MHA **Sec. V**; classic ML / ensembles **Sec. III-B–III-E**; NNs **Sec. II** + **Sec. III-F–III-G**; PIML **Sec. IV**; RL **Sec. III-D**; simulation automation **Sec. III-A**; agentic AI **Sec. VI**; case studies **Sec. VII-A–VII-G** — see the [README alignment table](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE#alignment-with-the-review-article).
- **RL:** the course ships **7_Reinforcement_Learning/RL_buck_control.ipynb** (pedagogical **DQN**) and **7_Reinforcement_Learning/DDPG_buck_control.ipynb** (**DDPG**, same averaged-buck task). Broader RL at scale still often uses external libraries; the selector links Stable-Baselines3 where relevant.
- **PINN:** **5_PIML/PINN/pinn_ode.ipynb** (Newton cooling ODE) and **5_PIML/PINN/pinn_pde.ipynb** (Burgers PDE) follow the same stability-oriented pattern: **fixed** collocation / IC grids, **soft** (MSE) constraints, **weighted composite** losses, **Adam** with gradient clipping + **ReduceLROnPlateau**, and optional **L-BFGS** polish.
- **GP + BO (tabular surrogate):** **2_Classic_ML/gaussian_process_bayesian_optimization.ipynb** demonstrates **Gaussian process regression** with predictive uncertainty on `fetch_california_housing`, and an **expected-improvement** Bayesian optimization loop for hyperparameters—useful pattern when PE simulations/experiments are expensive.
- **3D field / thermal maps:** **4_Neural_Network/Field_Data/field_temperature_residual_fnn.ipynb** trains a **residual FNN** on downsampled **`Tfield_*`** CSVs (`x,y,z,T`; **loss** and **Tamb** from filenames), with **per-file** train/val/test splits and 3-D residual plots—complements tabular FNN case studies in the same chapter.
- Some paths (e.g. full GNN training) point to external libraries or papers when the course has no matching notebook.
- Notebook links in the app point to **`https://github.com/XinzeLee/Fundamentals_of_AI_for_PE/...`** — keep that repo public or change `REPO_ROOT` in `js/data.js`.
