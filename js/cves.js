// =========================================================
// @redroot97 - CVE registry
// To add a new CVE, just append to the cves array below.
// The page automatically re-counts and re-renders.
// =========================================================

const cves = [
    {
        id: 'CVE-2026-28987',
        year: 2026,
        product: 'Pending public disclosure',
        vendor: 'Embargoed',
        type: 'Pending',
        severity: 'pending',        // critical | high | medium | low | pending
        status: 'reserved',         // reserved | published | disclosed
        summary: 'Reserved CVE - full advisory will be published here after vendor remediation and coordinated disclosure. CVSS, affected versions, and reproduction details to follow.',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28987'
    },
    {
        id: 'CVE-2026-28868',
        year: 2026,
        product: 'Pending public disclosure',
        vendor: 'Embargoed',
        type: 'Pending',
        severity: 'pending',
        status: 'reserved',
        summary: 'Reserved CVE - full advisory will be published here after vendor remediation and coordinated disclosure. CVSS, affected versions, and reproduction details to follow.',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28868'
    }
    // ---------------------------------------------------------
    // To add another CVE later, copy this template:
    //
    // {
    //     id: 'CVE-2026-XXXXX',
    //     year: 2026,
    //     product: 'Product Name X.Y',
    //     vendor: 'Vendor Name',
    //     type: 'Authentication Bypass',     // or RCE, XSS, SSRF, IDOR, etc.
    //     severity: 'high',                   // critical | high | medium | low
    //     status: 'published',                // reserved | published | disclosed
    //     summary: 'One-paragraph description...',
    //     credit: '@redroot97',
    //     link: 'https://nvd.nist.gov/vuln/detail/CVE-2026-XXXXX'
    // }
    // ---------------------------------------------------------
];

// -------- rendering --------

const sevRank = { critical: 4, high: 3, medium: 2, low: 1, pending: 0 };

// Hardcoded portfolio totals - update these as new advisories land.
const CVE_SUMMARY = {
    total: 9,
    published: 2,      // fixed - published
    inProgress: 7      // fix in progress
};

function renderCveSummary() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('total-count', CVE_SUMMARY.total);
    set('published-count', CVE_SUMMARY.published);
    set('inprogress-count', CVE_SUMMARY.inProgress);
}

function severityCell(sev) {
    if (sev === 'pending') return `<span class="severity" style="color:var(--text-faint);border-color:var(--border-bright);">PENDING</span>`;
    return `<span class="severity ${sev}">${sev}</span>`;
}

function statusCell(status) {
    return `<span class="cve-status ${status}">${status}</span>`;
}

function renderCveTable() {
    const tbody = document.getElementById('cve-table-body');
    if (!tbody) return;

    // sort: newest year first, then by severity
    const sorted = [...cves].sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return sevRank[b.severity] - sevRank[a.severity];
    });

    tbody.innerHTML = sorted.map(c => `
        <tr>
            <td><span class="cve-id"><a href="${c.link}" target="_blank" rel="noopener">${c.id}</a></span></td>
            <td>
                <div class="cve-product">${c.product}</div>
                <div class="cve-vendor">${c.vendor}</div>
            </td>
            <td><span class="cve-type">${c.type}</span></td>
            <td>${severityCell(c.severity)}</td>
            <td>${statusCell(c.status)}</td>
            <td style="color:var(--text-faint);font-size:12px;">${c.year}</td>
        </tr>
    `).join('');
}

function renderCveDetails() {
    const container = document.getElementById('cve-detail-list');
    if (!container) return;

    const published = cves.filter(c => c.status === 'published' || c.status === 'disclosed');

    if (published.length === 0) {
        container.innerHTML = `
            <div style="padding:48px;border:1px dashed var(--border-bright);background:var(--bg-elevated);text-align:center;">
                <div style="font-size:14px;color:var(--text-dim);margin-bottom:8px;">// no public write-ups yet</div>
                <div style="font-size:12px;color:var(--text-faint);">Detailed advisories appear here after coordinated disclosure completes and vendor patches ship.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = published.map(c => `
        <article style="margin-bottom:32px;padding:28px;border:1px solid var(--border-bright);background:var(--bg-elevated);">
            <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:16px;">
                <div>
                    <div class="cve-id" style="font-size:18px;margin-bottom:4px;">
                        <a href="${c.link}" target="_blank" rel="noopener">${c.id}</a>
                    </div>
                    <div style="color:var(--text);font-weight:500;">${c.product}</div>
                    <div style="color:var(--text-dim);font-size:12px;">${c.vendor} // ${c.type}</div>
                </div>
                <div style="display:flex;gap:10px;align-items:flex-start;">
                    ${severityCell(c.severity)}
                    ${statusCell(c.status)}
                </div>
            </div>
            <p style="font-size:14px;color:var(--text-dim);line-height:1.7;">${c.summary}</p>
            <div style="margin-top:16px;font-size:11px;color:var(--text-faint);">
                CREDIT: ${c.credit}
            </div>
        </article>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCveSummary();
    renderCveTable();
    renderCveDetails();
});
