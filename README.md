# AI for Power Electronics — Algorithm Selector

<p align="center">
  <a href="https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/">
    <img src="https://img.shields.io/badge/Open_the_algorithm_selector-2563eb?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Open the algorithm selector in your browser" />
  </a>
</p>

<p align="center">
  <strong><a href="https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/">Open the web app →</a></strong><br />
  <sub>If the site is not deployed yet, see <a href="#run-locally">Run locally</a> or <a href="#deploy-with-github-pages">Deploy with GitHub Pages</a>.</sub>
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

## Deploy with GitHub Pages

Static site — **no build step**. Pages serves it over **HTTPS** (required for ES modules).

1. Push this folder so **`index.html` is at the repo root** (`index.html`, `css/`, `js/`).
2. **Settings → Pages** → **Deploy from a branch** → branch **`main`**, folder **`/ (root)`** → Save.
3. The app will be at **`https://<username>.github.io/<repo>/`**  
   (example: [`https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/`](https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/)).

**Monorepo:** GitHub Pages from the UI only supports **`/`** or **`/docs`** on the branch — put the app under **`docs/`** or use a **separate repository**. See [GitHub Pages docs](https://docs.github.com/en/pages).

**After deploy:** update the **Open the web app** link at the top of this README if your URL differs.

Notebook links in the app point to **`https://github.com/XinzeLee/Fundamentals_of_AI_for_PE/...`** — keep that repo public or change `REPO_ROOT` in `js/data.js`.

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

- Some paths (e.g. full GNN training, RL training) point to external libraries or papers when the course has no matching notebook.
