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
- **Tutorial article:** Xinze Li, Fanfan Lin, Juan J. Rodríguez-Andina, Sergio Vazquez, Homer Alan Mantooth, Leopoldo García Franquelo, “Fundamentals of Artificial Intelligences for Power Electronics,” *IEEE Transactions on Industrial Electronics*, 2026.

**Under construction** — flows, copy, and links may change. Companion course repo: [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE).

---

## About

Interactive wizard that recommends AI/ML approaches aligned with the tutorial article and the [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE) notebooks.

**ChatGPT companion:** For deeper Q&A and report-style help, a button below the wizard and report (above the disclaimer footer) opens the [**Fundamentals of AI for PE**](https://chatgpt.com/g/g-698618895c2481919e113c49bafe23ee-fundamentals-of-ai-for-pe) Custom GPT in a new tab.

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
| `js/data.js` | Glossary, recommendations, GitHub URLs |
| `js/app.js` | Wizard and report UI |
| `start-server.bat` / `start-server.ps1` | Local server (Windows) |

---

## Notes

- **RL:** the course ships **7_Reinforcement_Learning/RL_buck_control.ipynb** (pedagogical **DQN**) and **7_Reinforcement_Learning/DDPG_buck_control.ipynb** (**DDPG**, same averaged-buck task). Broader RL at scale still often uses external libraries; the selector links Stable-Baselines3 where relevant.
- **PINN:** **5_PIML/PINN/pinn_ode.ipynb** (Newton cooling ODE) and **5_PIML/PINN/pinn_pde.ipynb** (Burgers PDE) follow the same stability-oriented pattern: **fixed** collocation / IC grids, **soft** (MSE) constraints, **weighted composite** losses, **Adam** with gradient clipping + **ReduceLROnPlateau**, and optional **L-BFGS** polish.
- **GP + BO (tabular surrogate):** **2_Classic_ML/gaussian_process_bayesian_optimization.ipynb** demonstrates **Gaussian process regression** with predictive uncertainty on `fetch_california_housing`, and an **expected-improvement** Bayesian optimization loop for hyperparameters—useful pattern when PE simulations/experiments are expensive.
- **3D field / thermal maps:** **4_Neural_Network/Field_Data/field_temperature_residual_fnn.ipynb** trains a **residual FNN** on downsampled **`Tfield_*`** CSVs (`x,y,z,T`; **loss** and **Tamb** from filenames), with **per-file** train/val/test splits and 3-D residual plots—complements tabular FNN tutorials in the same chapter.
- Some paths (e.g. full GNN training) point to external libraries or papers when the course has no matching notebook.
- Notebook links in the app point to **`https://github.com/XinzeLee/Fundamentals_of_AI_for_PE/...`** — keep that repo public or change `REPO_ROOT` in `js/data.js`.
