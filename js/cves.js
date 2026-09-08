const cves = [
    {
        id: 'CVE-2026-69267',
        year: 2026,
        date: '2026-09-08',
        product: 'Windows 10 / Windows 11',
        vendor: 'Microsoft',
        type: 'Information Disclosure (CWE-1220)',
        severity: 'medium',
        status: 'published',
        impact: 'Insufficient granularity of access control in the Windows Connected User Experiences and Telemetry (DiagTrack) service lets an authorized local user disclose SYSTEM-context file-system information. Microsoft: Max Severity Important, CVSS 3.1 6.5 (AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N). In a default Active Directory environment the same primitive chains, via NTLM relay + RBCD + Kerberos S4U, to local privilege escalation to NT AUTHORITY\\SYSTEM.',
        description: 'The DiagTrack RPC interface (Opnum 19) accesses a caller-supplied file path in the SYSTEM security context with no access check on the caller (CWE-1220). Supplying a WebDAV UNC path coerces the machine account into NTLM authentication; the PoC relays that to the domain controller over LDAPS, configures Resource-Based Constrained Delegation, and uses Kerberos S4U to obtain an administrator service ticket for SYSTEM code execution. The CVE is scored for the disclosure/access-control root cause; the escalation chain additionally requires LDAP signing and channel binding not to be enforced.',
        affected: [
            'Windows 10 (all supported versions)',
            'Windows 11 through Build 26200 (25H2)',
            'x64 and ARM64'
        ],
        advisories: [
            { label: 'MSRC CVE-2026-69267', url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-69267' },
            { label: 'CVE.org record', url: 'https://www.cve.org/CVERecord?id=CVE-2026-69267' }
        ],
        note: 'Microsoft classification: Information Disclosure, Important. Demonstrated downstream impact: local privilege escalation to SYSTEM. Credit: Dhiyanesh Selvaraj (@redroot97, with CVS Health); Microsoft also acknowledges Lian Owen and renyidudumen.',
        report: 'reports/diagtrack-ntlm-coercion',
        reportNote: '',
        credit: '@redroot97',
        link: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-69267'
    },
    {
        id: 'CVE-2026-43739',
        year: 2026,
        date: '2026-07-21',
        product: 'iOS / iPadOS / macOS / visionOS',
        vendor: 'Apple',
        type: 'Kernel OOB Write',
        severity: 'high',
        status: 'published',
        impact: 'A malicious application may be able to execute arbitrary code with kernel privileges. The AppleJPEGDriver IOKit user client is reachable from the iOS App Sandbox without entitlements.',
        description: 'An out-of-bounds write was addressed with improved bounds checking in AppleJPEGDriver.',
        affected: [
            'iOS < 26.6',
            'iPadOS < 26.6',
            'macOS Tahoe < 26.6',
            'visionOS < 26.6'
        ],
        advisories: [],
        note: '',
        report: '',
        reportNote: 'write-up coming soon',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-43739'
    },
    {
        id: 'CVE-2026-43816',
        year: 2026,
        date: '2026-07-21',
        product: 'iOS / iPadOS / macOS / visionOS',
        vendor: 'Apple',
        type: 'Kernel OOB Write',
        severity: 'high',
        status: 'published',
        impact: 'A malicious application may be able to execute arbitrary code with kernel privileges. The AppleJPEGDriver IOKit user client is reachable from the iOS App Sandbox without entitlements.',
        description: 'An out-of-bounds write was addressed with improved bounds checking in AppleJPEGDriver.',
        affected: [
            'iOS < 26.6',
            'iPadOS < 26.6',
            'macOS Tahoe < 26.6',
            'visionOS < 26.6'
        ],
        advisories: [],
        note: '',
        report: '',
        reportNote: 'write-up coming soon',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-43816'
    },
    {
        id: 'CVE-2026-39877',
        year: 2026,
        date: '2026-07-21',
        product: 'iOS / iPadOS / macOS',
        vendor: 'Apple',
        type: 'Kernel Info Leak',
        severity: 'medium',
        status: 'published',
        impact: 'An app may be able to leak sensitive kernel state. The kern.skywalk.llink_list sysctl exposes kernel heap addresses to any unprivileged user, defeating KASLR heap randomization.',
        description: 'The issue was addressed with improved access checks in the IOSkywalkFamily nexus MIB handler.',
        affected: [
            'iOS < 26.6',
            'iPadOS < 26.6',
            'macOS Tahoe < 26.6'
        ],
        advisories: [],
        note: '',
        report: '',
        reportNote: 'write-up coming soon',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-39877'
    },
    {
        id: 'CVE-2026-28987',
        year: 2026,
        date: '2026-05-11',
        product: 'iOS / iPadOS / macOS / tvOS / watchOS',
        vendor: 'Apple',
        type: 'Kernel Info Leak',
        severity: 'medium',
        status: 'published',
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
        note: '',
        report: '',
        reportNote: '',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28987'
    },
    {
        id: 'CVE-2026-28868',
        year: 2026,
        date: '2026-03-24',
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
        report: '',
        reportNote: '',
        credit: '@redroot97',
        link: 'https://www.cve.org/CVERecord?id=CVE-2026-28868'
    }
];

const sevRank = { critical: 4, high: 3, medium: 2, low: 1, pending: 0 };

const CVE_SUMMARY = {
    total: 11,
    published: 6,
    inProgress: 5
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
        const da = a.date || `${a.year}-01-01`, db = b.date || `${b.year}-01-01`;
        if (da !== db) return db.localeCompare(da);
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
                <td style="color:var(--text-faint);font-size:12px;">${c.date || c.year}</td>
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
