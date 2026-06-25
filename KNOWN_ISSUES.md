# Known Issues

## Pending

### Git clone required local proxy

- First recorded: 2026-06-25 16:16 +08:00
- Class: GitHub network/proxy issue
- Impact: `gh repo clone` failed because the underlying git process could not connect to GitHub over port 443.
- Current fix: Used `git -c http.proxy=http://127.0.0.1:7890` for GitHub git operations.
- Upgrade status: Not upgraded. This is occurrence 1 for this project.

### Project maintenance files were missing at startup

- First recorded: 2026-06-25 16:15 +08:00
- Class: project maintenance structure missing
- Impact: Required startup checklist could not be completed until project files and folders were created in the real GitHub Pages checkout.
- Current fix: Created `CODEX_RULES.md`, `PROJECT_STATUS.md`, `KNOWN_ISSUES.md`, `PITFALLS_PENDING/`, and `PITFALLS_ARCHIVE/`.
- Upgrade status: Not upgraded. This is occurrence 1 for this project.

## Upgraded Rules

- None yet.
