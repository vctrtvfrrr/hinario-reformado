---
name: commit
description: Creates a git commit with a message following the Conventional Commits specification. Use this skill whenever the user asks to commit, save changes to git, stage files, or record changes in the repository — even if they do not explicitly mention "conventional commits" or "git commit".
---

# Skill: Commit

Creates git commits with messages following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Flow

1. Inspect the current repository state
2. Analyze the changes and infer the ideal commit message
3. Present the proposal to the user and wait for confirmation
4. Execute the commit (staging files if necessary)

## Step 1 — Inspect the repository

Run the three commands below and keep the results:

```bash
git status --short
git diff HEAD
git log --oneline -5
```

- `git status --short` shows which files were modified/added/removed and whether they are already staged.
- `git diff HEAD` shows the content of changes (staged and unstaged).
- `git log --oneline -5` reveals the commit message style used historically in the project.

## Step 2 — Propose the commit message

Based on the diffs, build a message in the format:

```
<type>(<scope>): <short description>

[optional body: why the change was made, not what]
```

### Allowed types

| Type     | When to use                                       |
| -------- | ------------------------------------------------- |
| `feat`   | New feature for the user                          |
| `fix`    | Bug fix                                           |
| `docs`   | Documentation only                                |
| `style`  | Formatting, semicolons — no logic change          |
| `refact` | Refactoring without bug fix or feature            |
| `chore`  | Everything else that don't affect production code |
| `revert` | Reverts a previous commit                         |

### Scope (optional)

Use the module name, main file affected, or area of the system. Examples: `auth`, `api`, `db`, `ui`, `config`.

### Best practices

- Short description (≤72 characters), in the imperative mood ("add", "fix", "remove").
- Body only when the _why_ is not obvious from the diff.
- No period at the end of the subject line.
- Breaking changes: add `!` after the type/scope and describe in the footer with `BREAKING CHANGE:`.

## Step 3 — Confirm with the user

Display the proposed message clearly:

```
Proposed commit message:

  feat(hymnal): add chord transposition support

Files to be included:
  M src/transpose.ts
  A src/transpose.test.ts

Confirm? [Y/n]
```

If the user suggests adjustments, incorporate them before proceeding.

## Step 4 — Execute the commit

If there are unstaged files the user wants to include, stage them first:

```bash
git add <files>
git commit -m "$(cat <<'EOF'
<message here>
EOF
)"
```

Always use a heredoc to preserve formatting of multi-line messages.

After the commit, confirm the recorded hash and message with:

```bash
git log --oneline -1
```
