# GitHub Pages Homepage Rules

This file contains project-specific maintenance rules for `fanleifanbufan.github.io`.

## Current Scope

- Project root: `C:\Users\Administrator\fanleifanbufan.github.io`
- Current main version path: `C:\Users\Administrator\fanleifanbufan.github.io`
- Entry file: `index.html`
- Run command: static GitHub Pages site; local preview can use any simple static server from the repository root
- Test command: inspect local static preview and verify changed assets are reachable

## Maintenance Rules

1. Treat this checkout as the publishable GitHub Pages source of truth.
2. Do not overwrite the live homepage with files from another staging directory without first reading the existing structure.
3. Keep site assets in the existing repository layout when possible.
4. Record every project-specific error, path confusion, failed publish, dependency issue, or repeated rework in `PITFALLS_PENDING/` and `KNOWN_ISSUES.md`.
5. Update `PROJECT_STATUS.md` after significant visible changes or publish attempts.
