// Single source of truth wiring: all page copy, updates, and project data live
// in the content/ folder and are loaded here. To change words on the site, edit
// the files in content/ — not the markup.
//
//   content/site.json     — page copy, keyed by the data-content attrs in the HTML
//   content/news.json      — the /updates list (array of { date, text })
//   content/projects.json  — every project card (single source of truth)
//
// Note: this fetches local files, so the site must be served (e.g.
// `python3 -m http.server`), not opened via file://. GitHub Pages serves it fine.

const CONTENT_BASE = './content/';

// Resolve a dotted key ("hero.description") against a nested object.
const dig = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

// Page copy: fill every [data-content] element from content/site.json.
async function loadSiteCopy() {
  const targets = document.querySelectorAll('[data-content]');
  if (!targets.length) return;
  try {
    const site = await fetch(CONTENT_BASE + 'site.json').then(r => r.json());
    targets.forEach(el => {
      const value = dig(site, el.dataset.content);
      if (value != null) el.textContent = value;
    });
  } catch (e) {
    console.error('Failed to load site copy:', e);
  }
}

// Updates: render each { date, text } entry from content/news.json as a row.
async function loadUpdates() {
  const list = document.getElementById('update-list');
  if (!list) return;
  try {
    const updates = await fetch(CONTENT_BASE + 'news.json').then(r => r.json());
    const rows = updates.map(({ date, text }) => {
      const row = document.createElement('div');
      row.className = 'update-row';
      const d = document.createElement('span');
      d.className = 'update-date';
      d.textContent = date ? `[${date}]` : '';
      const t = document.createElement('div');
      t.className = 'update-text';
      t.textContent = text;
      row.append(d, t);
      return row;
    });
    list.replaceChildren(...rows);
  } catch (e) {
    console.error('Failed to load updates:', e);
  }
}

// Projects: render cards from content/projects.json. Card number and accent
// colour are assigned automatically by index. On index.html the container has
// data-filter="flagship" and only flagship projects render; projects.html
// renders all of them.
const accents = ["#cdc7ec", "#c4e3d4", "#c5dcec", "#f0c9b5"];

function createProjectCard(project, idx) {
  const num = String(idx + 1).padStart(2, '0');
  const accent = accents[idx % accents.length];
  return `
    <article class="project-card">
      <img src="${project.img}" alt="${project.title} image" class="project-img">
      <div class="project-info">
        <span class="project-num" style="background:${accent}">${num}</span>
        <h2>${project.title}</h2>
        <p class="project-desc">${project.desc}</p>
        <ul class="skills-list">
          ${project.skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
      </div>
    </article>
  `;
}

async function loadProjects() {
  const container = document.getElementById('projects-list');
  if (!container) return;
  try {
    const projects = await fetch(CONTENT_BASE + 'projects.json').then(r => r.json());
    const list = container.dataset.filter === 'flagship'
      ? projects.filter(p => p.flagship)
      : projects;
    container.innerHTML = list.map(createProjectCard).join('');
  } catch (e) {
    console.error('Failed to load projects:', e);
  }
}

loadSiteCopy();
loadUpdates();
loadProjects();
