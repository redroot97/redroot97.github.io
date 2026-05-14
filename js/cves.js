const cves = [
    {
        id: 'CVE-2026-28987',
        year: 2026,
        product: 'iOS / iPadOS / macOS / tvOS / watchOS',
        vendor: 'Apple',
        type: 'Kernel Info Leak',
        severity: 'medium',
        status: 'disclosed',
        impact: 'An app may be able to leak sensitive kernel state.',
        description: 'A logging issue was addressed with improved data redaction.',
        affected: [
            'iOS 26.5 and iPadOS 26.5',
            'macOS Tahoe 26.5',
            'tvOS 26.5',
            'watchOS 26.5'
        ],
        advisories: [
            { label: 'HT127119', url: 'https://support.apple.com/127119' },
            { label: 'HT127118', url: 'https://support.apple.com/127118' },
            { label: 'HT127115', url: 'https://support.apple.com/127115' },
            { label: 'HT127110', url: 'https://support.apple.com/127110' }
        ],
        note: 'Fix addressed in beta releases. Not yet available in all public releases.',
        report: '',
        reportNote: 'detailed write-up dropping soon.',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28987'
    },
    {
        id: 'CVE-2026-28868',
        year: 2026,
        product: 'iOS / iPadOS / macOS / watchOS',
        vendor: 'Apple',
        type: 'Kernel Memory Disclosure',
        severity: 'medium',
        status: 'published',
        impact: 'An app may be able to disclose kernel memory.',
        description: 'A logging issue was addressed with improved data redaction.',
        affected: [
            'iOS 26.4 and iPadOS 26.4',
            'macOS Tahoe 26.4',
            'watchOS 26.4'
        ],
        advisories: [
            { label: 'HT126799', url: 'https://support.apple.com/126799' },
            { label: 'HT126798', url: 'https://support.apple.com/126798' },
            { label: 'HT126794', url: 'https://support.apple.com/126794' },
            { label: 'HT126792', url: 'https://support.apple.com/126792' }
        ],
        note: '',
        report: 'reports/cve-2026-28868',
        reportNote: '',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28868'
    }
];

const sevRank = { critical: 4, high: 3, medium: 2, low: 1, pending: 0 };

const CVE_SUMMARY = {
    total: 9,
    published: 2,
    inProgress: 7
};

function renderCveSummary() {
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('total-count', CVE_SUMMARY.total);
    set('published-count', CVE_SUMMARY.published);
    set('inprogress-count', CVE_SUMMARY.inProgress);
}

function severityCell(sev) {
    if (sev === 'pending') return '<span class="severity" style="color:var(--text-faint);border-color:var(--border-bright);">PENDING</span>';
    return `<span class="severity ${sev}">${sev}</span>`;
}

function statusCell(status) {
    return `<span class="cve-status ${status}">${status}</span>`;
}

function renderCveTable() {
    const tbody = document.getElementById('cve-table-body');
    if (!tbody) return;

    const sorted = [...cves].sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        return sevRank[b.severity] - sevRank[a.severity];
    });

    tbody.innerHTML = sorted.map((c, i) => {
        const hasDetail = c.impact || c.affected;
        const rowClass = hasDetail ? 'cve-row-expandable' : '';
        const arrow = hasDetail ? '<span class="cve-expand-arrow">▸</span>' : '';

        let detailHtml = '';
        if (hasDetail) {
            detailHtml = `<tr class="cve-detail-row" id="cve-detail-${i}" style="display:none;">
                <td colspan="6">
                    <div class="cve-detail-panel">
                        <div class="cve-detail-grid">
                            <div class="cve-detail-col">
                                <div class="cve-detail-label">// impact</div>
                                <div class="cve-detail-value">${c.impact}</div>
                                <div class="cve-detail-label" style="margin-top:16px;">// description</div>
                                <div class="cve-detail-value">${c.description}</div>
                                ${c.note ? `<div class="cve-detail-note">${c.note}</div>` : ''}
                            </div>
                            <div class="cve-detail-col">
                                <div class="cve-detail-label">// affected versions</div>
                                <div class="cve-detail-value">${c.affected.map(v => `<div>${v}</div>`).join('')}</div>
                                <div class="cve-detail-label" style="margin-top:16px;">// vendor advisories</div>
                                <div class="cve-detail-value">${c.advisories.map(a => `<a href="${a.url}" target="_blank" rel="noopener" class="cve-advisory-link">${a.label} ↗</a>`).join('')}</div>
                            </div>
                        </div>
                        ${c.report ? `<a href="${c.report}" class="cve-report-link">→ read full write-up</a>` : ''}
                        ${c.reportNote ? `<div class="cve-report-soon">// ${c.reportNote}</div>` : ''}
                        <div class="cve-detail-credit">credit: ${c.credit}</div>
                    </div>
                </td>
            </tr>`;
        }

        return `
            <tr class="${rowClass}" ${hasDetail ? `onclick="toggleDetail(${i})"` : ''}>
                <td><span class="cve-id"><a href="${c.link}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${c.id}</a></span>${arrow}</td>
                <td>
                    <div class="cve-product">${c.product}</div>
                    <div class="cve-vendor">${c.vendor}</div>
                </td>
                <td><span class="cve-type">${c.type}</span></td>
                <td>${severityCell(c.severity)}</td>
                <td>${statusCell(c.status)}</td>
                <td style="color:var(--text-faint);font-size:12px;">${c.year}</td>
            </tr>
            ${detailHtml}`;
    }).join('');
}

function toggleDetail(i) {
    const row = document.getElementById('cve-detail-' + i);
    if (!row) return;
    const isOpen = row.style.display !== 'none';
    row.style.display = isOpen ? 'none' : 'table-row';
    const arrow = row.previousElementSibling.querySelector('.cve-expand-arrow');
    if (arrow) arrow.textContent = isOpen ? '▸' : '▾';
    if (!isOpen) row.previousElementSibling.classList.add('cve-row-open');
    else row.previousElementSibling.classList.remove('cve-row-open');
}

function renderCveDetails() {
    const container = document.getElementById('cve-detail-list');
    if (!container) return;
    container.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderCveSummary();
    renderCveTable();
    renderCveDetails();
});
