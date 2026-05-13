// =========================================================
// @redroot97 - GitHub repos loader
// Pulls public repos from the GitHub API and renders cards
// in the #github-repos container. Cached in localStorage to
// avoid hitting the unauthenticated rate limit on refreshes.
// =========================================================

const GH_USER = 'redroot97';
const GH_CACHE_KEY = 'redroot97:repos';
const GH_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h
const GH_HIDE_REPOS = new Set(['redroot97.github.io']);

// Curated descriptions for repos that have no description on GitHub.
// Keyed by repo name (case-sensitive, exact match).
const REPO_DESCRIPTIONS = {
    'Ghost_Span_C2':
        'Custom command-and-control framework focused on detection-aware tradecraft and operator-friendly tooling. Early-stage development.',
    'macOS':
        'macOS offensive security research - payloads, persistence, and security-control bypasses across modern macOS releases.',
    'Cobalt_Strike_BOFs':
        'Cobalt Strike Beacon Object Files for Active Directory enumeration, lateral movement, and OPSEC-aware in-engagement use.',
    'Burp_Extentions':
        'Custom Burp Suite extensions for offensive security testing, including EBCDitor for EBCDIC-encoded IBM mainframe traffic.'
};

// Curated tag list per repo (used for the chip row at the bottom of the card).
const REPO_TAGS = {
    'Ghost_Span_C2':       ['c2', 'red team', 'opsec'],
    'macOS':               ['macos', 'persistence', 'tcc'],
    'Cobalt_Strike_BOFs':  ['cobalt-strike', 'bof', 'active directory'],
    'Burp_Extentions':     ['burp', 'ebcdic', 'mainframe']
};

const LANG_COLORS = {
    'C':          '#555555',
    'C++':        '#f34b7d',
    'Python':     '#3572A5',
    'HTML':       '#e34c26',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Go':         '#00ADD8',
    'Rust':       '#dea584',
    'Shell':      '#89e051',
    'PowerShell': '#012456'
};

function timeAgo(iso) {
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;
    const day = 24 * 60 * 60 * 1000;
    if (diff < day) return 'today';
    if (diff < 2 * day) return 'yesterday';
    if (diff < 30 * day) return `${Math.floor(diff / day)}d ago`;
    if (diff < 365 * day) return `${Math.floor(diff / (30 * day))}mo ago`;
    return `${Math.floor(diff / (365 * day))}y ago`;
}

function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function loadRepos() {
    const cached = localStorage.getItem(GH_CACHE_KEY);
    if (cached) {
        try {
            const { ts, data } = JSON.parse(cached);
            if (Date.now() - ts < GH_CACHE_TTL_MS && Array.isArray(data)) {
                return data;
            }
        } catch { /* fall through */ }
    }

    const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100`);
    if (!res.ok) throw new Error(`github api ${res.status}`);
    const repos = await res.json();
    localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: repos }));
    return repos;
}

function renderRepoCard(r) {
    const desc = r.description || REPO_DESCRIPTIONS[r.name] || 'Working repository - see GitHub for details.';
    const tags = REPO_TAGS[r.name] || (r.topics && r.topics.length ? r.topics.slice(0, 3) : []);
    const lang = r.language;
    const langColor = LANG_COLORS[lang] || 'var(--text-faint)';

    const tagHtml = tags.length
        ? `<div class="card-meta">${tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>`
        : '';

    return `
        <a class="card repo-card" href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener">
            <div class="repo-card-header">
                <div class="repo-card-tag">[ repo ]</div>
                <div class="repo-card-arrow">↗</div>
            </div>
            <div class="card-title repo-card-title">${escapeHtml(r.name)}</div>
            <div class="card-desc repo-card-desc">${escapeHtml(desc)}</div>
            <div class="repo-card-footer">
                ${lang ? `<span class="repo-lang"><span class="repo-lang-dot" style="background:${langColor};"></span>${escapeHtml(lang)}</span>` : ''}
                ${r.stargazers_count > 0 ? `<span class="repo-stat">★ ${r.stargazers_count}</span>` : ''}
                ${r.forks_count > 0 ? `<span class="repo-stat">⑂ ${r.forks_count}</span>` : ''}
                <span class="repo-updated">updated ${timeAgo(r.updated_at)}</span>
            </div>
            ${tagHtml}
        </a>
    `;
}

function renderError(container, msg) {
    container.innerHTML = `
        <div class="repo-error">
            <div class="repo-error-title">// couldn't load repos</div>
            <div class="repo-error-desc">${escapeHtml(msg)} - browse them directly on <a href="https://github.com/${GH_USER}" target="_blank">github.com/${GH_USER}</a>.</div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('github-repos');
    if (!container) return;

    try {
        const repos = await loadRepos();
        const visible = repos
            .filter(r => !r.fork && !r.archived && !GH_HIDE_REPOS.has(r.name))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        if (visible.length === 0) {
            container.innerHTML = `<div class="repo-error"><div class="repo-error-title">// no public repos yet</div></div>`;
            return;
        }

        container.innerHTML = visible.map(renderRepoCard).join('');
    } catch (e) {
        renderError(container, e.message || 'network error');
    }
});
