const posts = [
    {
        date: '2026.08',
        tag: 'windows // privilege escalation',
        title: 'DiagTrack RPC Coercion - Standard User to SYSTEM (CVE-2026-69267)',
        excerpt: 'A standard domain user coerces the SYSTEM-level Windows DiagTrack service into NTLM authentication via an unchecked RPC method, relays it to the DC over LDAPS, and abuses RBCD + Kerberos S4U to escalate to NT AUTHORITY\\SYSTEM - localhost only, in under 30 seconds.',
        url: 'reports/diagtrack-ntlm-coercion',
        repo: 'https://github.com/redroot97/windows/tree/main/CVE-2026-69267-DiagTrack-NTLM-Coercion-LPE'
    },
    {
        date: '2026.01',
        tag: 'macos // persistence',
        title: 'Chrome Native Messaging Host Shadow Attack',
        excerpt: 'Exploiting Chrome\'s manifest resolution order to shadow a system-level Native Messaging Host with a user-level copy, hijacking extension-to-native-app communication without elevated privileges.',
        url: 'reports/chrome-nmh-shadow',
        repo: 'https://github.com/redroot97/macOS/tree/main/Chrome_NHM_Attack'
    },
    {
        date: '2026.01',
        tag: 'macos // mdm bypass',
        title: 'JAMF Binary Tampering - Hijacking macOS MDM Agents',
        excerpt: 'Replacing the JAMF agent binary with a wrapper script that intercepts all MDM operations while keeping the agent functional and undetected by the management server.',
        url: 'reports/jamf-binary-tampering',
        repo: 'https://github.com/redroot97/macOS/tree/main/JAMF'
    },
    {
        date: '2025.12',
        tag: 'c2 // red team',
        title: 'Ghost Span - Hiding C2 Traffic in OpenTelemetry',
        excerpt: 'A command-and-control framework that disguises implant communications as legitimate OpenTelemetry trace data over OTLP/gRPC, blending into enterprise observability pipelines.',
        url: 'reports/ghost-span-c2',
        repo: 'https://github.com/redroot97/Ghost_Span_C2'
    },
    {
        date: '2024.09',
        tag: 'cobalt strike // credential access',
        title: 'Sticky Grabber BOF - Credentials from Sticky Notes',
        excerpt: 'A Cobalt Strike BOF that extracts passwords, API keys, and secrets from Microsoft Sticky Notes by reading the SQLite WAL file entirely in-process, with zero child processes.',
        url: 'reports/cobalt-strike-bofs',
        repo: 'https://github.com/redroot97/Cobalt_Strike_BOFs/tree/main/Sticky_Grabber'
    },
    {
        date: '2024.06',
        tag: 'burp suite // mainframe',
        title: 'EBCDitor - Pentesting IBM Mainframes Through Burp',
        excerpt: 'A Burp Suite extension that decodes, edits, and re-encodes EBCDIC traffic in real time, enabling web-style pentesting against IBM 3270 mainframe terminals over TN3270.',
        url: 'reports/ebcditor-burp',
        repo: 'https://github.com/redroot97/Burp_Extentions/tree/main/Mainframe_EBCDIC_Editor'
    }
];

const PER_PAGE = 5;
let currentPage = 0;

function totalPages() {
    return Math.max(1, Math.ceil(posts.length / PER_PAGE));
}

function renderResearch() {
    const list = document.getElementById('research-list');
    if (!list) return;

    if (posts.length === 0) {
        list.innerHTML = `
            <div class="research-empty">
                <div class="research-empty-marker">[ no entries ]</div>
                <div class="research-empty-title">Research log is being prepared.</div>
                <div class="research-empty-desc">Write-ups and tooling notes are queued for release. Check back soon, or follow progress on <a href="https://github.com/redroot97" target="_blank" rel="noopener">github</a>.</div>
            </div>
        `;
        return;
    }

    const start = currentPage * PER_PAGE;
    const page = posts.slice(start, start + PER_PAGE);
    const total = totalPages();

    list.innerHTML = page.map(p => `
        <a class="research-item" href="${p.url}">
            <div class="research-date">${p.date}</div>
            <div class="research-content">
                <div class="research-tag">${p.tag}</div>
                <div class="research-title">${p.title}</div>
                <div class="research-excerpt">${p.excerpt}</div>
            </div>
            <div class="research-arrow">-></div>
        </a>
    `).join('');

    {
        list.innerHTML += `
            <div class="research-pagination">
                <button class="page-btn" onclick="goPage(0)" ${currentPage === 0 ? 'disabled' : ''}>&lt;&lt;</button>
                <button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 0 ? 'disabled' : ''}>&lt;</button>
                <span class="page-info">${currentPage + 1} / ${total}</span>
                <button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total - 1 ? 'disabled' : ''}>&gt;</button>
                <button class="page-btn" onclick="goPage(${total - 1})" ${currentPage === total - 1 ? 'disabled' : ''}>&gt;&gt;</button>
            </div>
        `;
    }
}

function goPage(n) {
    const total = totalPages();
    currentPage = Math.max(0, Math.min(n, total - 1));
    renderResearch();
    document.getElementById('research-list').scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    renderResearch();
});
