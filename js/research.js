const posts = [
    {
        date: '2026.05',
        category: 'tooling',
        tag: 'c2 // red team',
        title: 'Ghost Span - Hiding C2 Traffic in OpenTelemetry',
        excerpt: 'A command-and-control framework that disguises implant communications as legitimate OpenTelemetry trace data over OTLP/gRPC, blending into enterprise observability pipelines.',
        url: 'reports/ghost-span-c2.html',
        repo: 'https://github.com/redroot97/Ghost_Span_C2',
        icon: 'signal'
    },
    {
        date: '2026.04',
        category: 'red-team',
        tag: 'macos // mdm bypass',
        title: 'JAMF Binary Tampering - Hijacking macOS MDM Agents',
        excerpt: 'Replacing the JAMF agent binary with a wrapper script that intercepts all MDM operations while keeping the agent functional and undetected by the management server.',
        url: 'reports/jamf-binary-tampering.html',
        repo: 'https://github.com/redroot97/macOS',
        icon: 'shield'
    },
    {
        date: '2026.04',
        category: 'red-team',
        tag: 'macos // persistence',
        title: 'Chrome Native Messaging Host Shadow Attack',
        excerpt: 'Exploiting Chrome\'s manifest resolution order to shadow a system-level Native Messaging Host with a user-level copy, hijacking extension-to-native-app communication without elevated privileges.',
        url: 'reports/chrome-nmh-shadow.html',
        repo: 'https://github.com/redroot97/macOS',
        icon: 'browser'
    },
    {
        date: '2026.03',
        category: 'ad',
        tag: 'cobalt strike // active directory',
        title: 'Cobalt Strike BOFs for AD Operations',
        excerpt: 'Custom Beacon Object Files for in-process execution during Active Directory engagements - enumeration, lateral movement, and OPSEC-aware tradecraft without fork-and-run.',
        url: 'reports/cobalt-strike-bofs.html',
        repo: 'https://github.com/redroot97/Cobalt_Strike_BOFs',
        icon: 'terminal'
    },
    {
        date: '2026.02',
        category: 'tooling',
        tag: 'burp suite // mainframe',
        title: 'EBCDitor - Pentesting IBM Mainframes Through Burp',
        excerpt: 'A Burp Suite extension that decodes, edits, and re-encodes EBCDIC traffic in real time, enabling web-style pentesting against IBM 3270 mainframe terminals over TN3270.',
        url: 'reports/ebcditor-burp.html',
        repo: 'https://github.com/redroot97/Burp_Extentions',
        icon: 'server'
    }
];

const ICONS = {
    signal: '<svg viewBox="0 0 24 24"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>',
    shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="13"/><circle cx="12" cy="16" r="0.5" fill="currentColor"/></svg>',
    browser: '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="2" y1="7" x2="22" y2="7"/><circle cx="5" cy="5" r="0.5" fill="currentColor"/><circle cx="7.5" cy="5" r="0.5" fill="currentColor"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    terminal: '<svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>',
    server: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>'
};

const GH_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.26 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>';

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

    list.innerHTML = posts.map(p => `
        <a class="card research-card" href="${p.url}">
            <div class="card-icon">${ICONS[p.icon] || ''}</div>
            <div class="card-date">${p.date}</div>
            <div class="card-tag">${p.tag}</div>
            <div class="card-title">${p.title}</div>
            <div class="card-desc">${p.excerpt}</div>
            <div class="card-repo-link">${GH_ICON} <span>view poc on github</span></div>
        </a>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderResearch();
});
