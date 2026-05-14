const posts = [
    {
        date: '2026.05',
        tag: 'c2 // red team',
        title: 'Ghost Span - Hiding C2 Traffic in OpenTelemetry',
        excerpt: 'A command-and-control framework that disguises implant communications as legitimate OpenTelemetry trace data over OTLP/gRPC, blending into enterprise observability pipelines.',
        url: 'reports/ghost-span-c2.html',
        repo: 'https://github.com/redroot97/Ghost_Span_C2'
    },
    {
        date: '2026.04',
        tag: 'macos // mdm bypass',
        title: 'JAMF Binary Tampering - Hijacking macOS MDM Agents',
        excerpt: 'Replacing the JAMF agent binary with a wrapper script that intercepts all MDM operations while keeping the agent functional and undetected by the management server.',
        url: 'reports/jamf-binary-tampering.html',
        repo: 'https://github.com/redroot97/macOS'
    },
    {
        date: '2026.04',
        tag: 'macos // persistence',
        title: 'Chrome Native Messaging Host Shadow Attack',
        excerpt: 'Exploiting Chrome\'s manifest resolution order to shadow a system-level Native Messaging Host with a user-level copy, hijacking extension-to-native-app communication without elevated privileges.',
        url: 'reports/chrome-nmh-shadow.html',
        repo: 'https://github.com/redroot97/macOS'
    },
    {
        date: '2026.03',
        tag: 'cobalt strike // active directory',
        title: 'Cobalt Strike BOFs for AD Operations',
        excerpt: 'Custom Beacon Object Files for in-process execution during Active Directory engagements - enumeration, lateral movement, and OPSEC-aware tradecraft without fork-and-run.',
        url: 'reports/cobalt-strike-bofs.html',
        repo: 'https://github.com/redroot97/Cobalt_Strike_BOFs'
    },
    {
        date: '2026.02',
        tag: 'burp suite // mainframe',
        title: 'EBCDitor - Pentesting IBM Mainframes Through Burp',
        excerpt: 'A Burp Suite extension that decodes, edits, and re-encodes EBCDIC traffic in real time, enabling web-style pentesting against IBM 3270 mainframe terminals over TN3270.',
        url: 'reports/ebcditor-burp.html',
        repo: 'https://github.com/redroot97/Burp_Extentions'
    }
];

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
}

document.addEventListener('DOMContentLoaded', () => {
    renderResearch();
});
