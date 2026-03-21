# AI for Power Electronics — Algorithm Selector (web app)
Interactive, step-by-step assistant for choosing AI/ML approaches aligned with the IEEE TIE article "Fundamentals of Artificial Intelligences for Power Electronics" and the GItHub repository XinzeLee/Fundamentals_of_AI_for_PE.

## Authorship & status

- **Web app author:** Xinze Li  
- **Tutorial article:** Xinze Li, Fanfan Lin, Juan J. Rodríguez-Andina, Sergio Vazquez, Homer Alan Mantooth, Leopoldo García Franquelo, “Fundamentals of Artificial Intelligences for Power Electronics,” *IEEE Transactions on Industrial Electronics*, 2026.

**This algorithm selector is still under construction** — wizard steps, copy, and resource links may change. The companion [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE) repository is also under active refinement.

---

Interactive, step-by-step assistant for choosing AI/ML approaches aligned with the IEEE tutorial *Fundamentals of Artificial Intelligences for Power Electronics* and the course repository [**Fundamentals_of_AI_for_PE**](https://github.com/XinzeLee/Fundamentals_of_AI_for_PE).

## Run locally

This app uses **ES modules** (`import`/`export`). Browsers block those when you open `index.html` as a **file** — you must use a **local HTTP server**.

### Easiest (Windows)

1. Double-click **`start-server.bat`** (or run `start-server.ps1` in PowerShell).
2. In the browser, open **`http://127.0.0.1:8765/`**  
   (use `127.0.0.1` if `localhost` does not resolve).

Keep the black console window open; closing it stops the server.

### Command line

```bash
cd AI_for_PE_Algorithm_Selector
python -m http.server 8765
```

Then open **`http://127.0.0.1:8765/`**.

## Deploy and host on GitHub (GitHub Pages)

The app is **static** (HTML, CSS, ES modules). There is **no build step**. GitHub Pages serves it over **HTTPS**, which satisfies the browser’s module security rules.

### Option A — App at the **root** of its own repository (simplest)

1. **Create a new repository** on GitHub (e.g. `AI_for_PE_Algorithm_Selector`), or use an existing empty repo.
2. **Push this folder’s contents** so that `index.html` sits at the **repository root** (same layout as here: `index.html`, `css/`, `js/`).
3. On GitHub: **Settings → Pages** (under *Code and automation*).
4. Under **Build and deployment**:
   - **Source:** *Deploy from a branch*.
   - **Branch:** `main` (or `master`) and folder **`/ (root)`**, then **Save**.
5. After a minute, the site is available at:

   **`https://<your-username>.github.io/<repository-name>/`**

   Example: `https://xinzelee.github.io/AI_for_PE_Algorithm_Selector/`

6. **Optional:** **Settings → Pages → Custom domain** if you use your own DNS.

**Notes**

- Relative asset paths (`css/styles.css`, `js/app.js`) work for both project Pages (`/repo-name/`) and user/org sites at domain root.
- If the first load shows a blank page, open the browser **developer console** (F12): confirm there are no 404s for `js/app.js` (usually means `index.html` is not at the published root).

### Option B — App lives in a **subfolder** of a larger repo

GitHub’s classic Pages UI only publishes from the branch **`/` (root)** or **`/docs`**, not an arbitrary path like `monorepo/AI_for_PE_Algorithm_Selector/`.

Pick one of these:

| Approach | What to do |
|----------|------------|
| **`/docs` branch folder** | Copy (or move) `index.html`, `css/`, and `js/` into a **`docs/`** directory on `main`, then set Pages to **Deploy from a branch → `main` → `/docs`**. |
| **Dedicated repo** | Keep the app in its **own** repository (Option A) and link to it from the monorepo README. |
| **GitHub Actions** | Use a workflow that uploads a subdirectory to the `gh-pages` branch or to Pages artifacts; useful for automation but more setup than Option A. |

### Option C — Private repo

GitHub **Free** private repos can use **GitHub Pages** with visibility controls depending on your plan; **public** repos + public Pages are the usual choice for a course tool. Check current [GitHub Pages documentation](https://docs.github.com/en/pages) for your account type.

### After deployment

- Share the **`https://<user>.github.io/<repo>/`** URL in the course README or tutorial page.
- Notebook links inside the app already target **`https://github.com/XinzeLee/Fundamentals_of_AI_for_PE/...`**; ensure that repository stays **public** (or update `REPO_ROOT` in `js/data.js` if the course moves).

If the port is busy, pick another (e.g. `8080`):

```bash
python -m http.server 8080
```

### If the page still won’t load

- Confirm the terminal shows **“Serving HTTP on …”** after starting.
- Try **`http://127.0.0.1:PORT/`** instead of `localhost`.
- Allow Python through **Windows Firewall** if prompted.
- Ensure **Python 3** is installed (`python --version`).

### Alternative

```bash
npx --yes serve -l 8765
```

## Contents

- `index.html` — layout
- `css/styles.css` — styling
- `js/data.js` — glossary, GitHub links, recommendation text
- `js/app.js` — wizard flow and rendering

## Notes

- Notebook links point to `https://github.com/XinzeLee/Fundamentals_of_AI_for_PE/blob/main/...` (public when the repository is published).
- Where the course has no matching notebook (e.g., some GNN or RL training paths), the app suggests external libraries and survey papers referenced in the tutorial.
