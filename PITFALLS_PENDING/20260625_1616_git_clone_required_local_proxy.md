# Git Clone Required Local Proxy

1. Occurrence time: 2026-06-25 16:16 +08:00
2. Problem description: `gh repo clone` failed because the underlying `git clone` could not connect to `github.com:443`.
3. Trigger cause: Git was not using the available local proxy while GitHub API calls through `gh` were working.
4. Impact scope: Publishing was blocked until the repository could be cloned.
5. Current fix: Used a single-command git proxy override: `git -c http.proxy=http://127.0.0.1:7890 clone ...`.
6. Whether it may happen again: Yes, when git operations need direct GitHub network access from this machine.
7. Suggested rule upgrade: If repeated three times, add a rule requiring git GitHub operations to use the local proxy override in this environment.
