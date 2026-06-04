# Exploration: estrategia-git → 4 focused skills + thin index

**Change**: `estrategia-git-media-cleanup`
**Status**: ready for `sdd-propose`
**Topic key**: `sdd/estrategia-git-media-cleanup/explore`

---

## Current State

`estrategia-git/SKILL.md` is a **632-line monolithic skill** that mixes four distinct concerns into one document. It was imported (or originally written) as a template from a multi-app monorepo setup that no longer matches this repo's reality.

### What the file actually says (line-by-line)

| Lines | What it is | Reality in this repo |
|---|---|---|
| 18–35 | Branch model + 7 "Reglas Fundamentales" | `develop` branch does **not** exist (branches: main, chore/opencode-bootstrap, docs/estrategia-git-cleanup, sdd/estrategia-git-media-cleanup) |
| 38–47 | Tool inventory table | Lists Husky, commitlint, git-c, GGA, GitHub Actions — **none installed** |
| 50–201 | "Workflow Completo" (8 numbered subsections) | Mixes: branch creation, Conventional Commits, PR opening, code review, merge — all in one linear narrative |
| 203–242 | "Release Flow (develop → main)" | References `bun test`, references `develop` that doesn't exist |
| 244–409 | "Herramientas de Automatización" (Husky, commitlint, git-c, GGA, GitHub Actions) | GitHub Actions example uses `oven-sh/setup-bun@v2`, `apps/api prisma generate`, `apps/api test`, PostgreSQL 16, Redis 7 — **none of this infrastructure exists in this repo** |
| 411–495 | "Comandos Útiles" | Universal git commands (status, log, stash, reset) — belongs in a `git-cheatsheet`, not a strategy |
| 497–537 | "Escenarios Comunes" | Generic rebase/cherry-pick/PR scenarios — most are universal git knowledge |
| 539–568 | "Integración con Pi/Agent" | Self-referential — this repo IS the Pi/opencode runtime |
| 570–617 | "Archivos que NO se versionan" | Repo-specific `.gitignore` content (Prisma `*.db`, uploads/, etc.) — **belongs in the `.gitignore`**, not in a strategy skill |
| 619–628 | "Notas Finales" | 5 pieces of advice that should sit with their topic skills |

### Overlap with AGENTS.md (lines 1059–1087)

The "persona" document has its own **Git Strategy** section that duplicates content from `estrategia-git`:

- AGENTS.md L1063–1067: Branch model diagram → identical to L20–24
- AGENTS.md L1069–1072: Commit format one-liner → condensed version of L107–121
- AGENTS.md L1076–1081: 6 "Reglas" → mirrors the 7 "Reglas Fundamentales" in L26–35
- AGENTS.md mentions Husky (L1081) → also in estrategia-git L38–47, L244+

The persona's Git Strategy section is **load-bearing for every session** (it lives in AGENTS.md which is always-loaded). After the split, this section should remain a short rules-of-thumb and reference the new skills for detail.

### Overlap with `.atl/skill-registry.md`

Single entry at line 105. After the split, this becomes **5 entries** (4 new + 1 reduced index). The current 240-line registry has 211 entries, so 4 more is trivial.

### Hard rules from skill-creator that the current file violates

| Rule | Threshold | Current |
|---|---|---|
| Recommended body size | 180–450 tokens | ~3000+ tokens (632 lines × ~5 tok/line) |
| Hard max | 700 tokens / 1000 lines | **632 lines**, far over |
| LLM-first structure | Activation Contract, Hard Rules, Decision Gates, Execution Steps, Output Contract | **Has none** — reads like tutorial docs |
| One-line YAML-safe `description` | ≤250 chars | Current is multi-line, ~280 chars |

---

## Affected Areas

| Path | Why affected |
|---|---|
| `estrategia-git/SKILL.md` | Will be rewritten as a thin index (target: 60–100 lines) |
| `AGENTS.md` lines 1059–1087 | Must update Git Strategy section to reference the 4 new skills; trim duplicated rules |
| `.atl/skill-registry.md` line 105 | Replace 1 entry with 5 entries (4 new + reduced index) |
| `openspec/changes/estrategia-git-media-cleanup/` | New change folder; this exploration.md lives here |
| Future: `commit-conventions/SKILL.md` | New skill to create |
| Future: `branch-naming/SKILL.md` | New skill to create |
| Future: `pr-template/SKILL.md` | New skill to create |
| Future: `release-flow/SKILL.md` | New skill to create |
| Future: `git-tooling-integration/SKILL.md` (proposed 5th) | New skill — optional, only if user agrees to keep toolchain content |

No other skills, modules, or tests are affected. This is a documentation/skills refactor in a docs-only repo.

---

## Approaches Considered

### Approach A — 4 new skills + thin index (user's stated intent)

- **commit-conventions** — format, types, breaking changes, scope rules
- **branch-naming** — type prefixes, regex, examples, pre-push validation
- **pr-template** — PR body format, labels, type-to-label mapping, issue-first rule
- **release-flow** — develop → main, tagging, CHANGELOG, version bumping
- **estrategia-git** — reduced to ~80-line index that points to the 4

**Pros:** User's stated direction. Each skill fits the 180–450 token budget. Routing is explicit. Aligns with skill-creator's "single-purpose per skill" guidance.
**Cons:** Toolchain content (Husky/GGA/git-c/GitHub Actions) has no home — either dropped or needs a 5th skill.
**Effort:** Medium. ~5 new SKILL.md files, 1 rewrite, AGENTS.md trim, registry update.

### Approach B — 4 new skills + 5th `git-tooling-integration`

Same as A, but add a 5th skill for the toolchain content (Husky, commitlint, git-c, GGA, GitHub Actions examples).

**Pros:** Preserves all the toolchain content the user wrote. Makes toolchain-vs-policy distinction explicit. Toolchain is opt-in — only loaded when user mentions Husky/GGA/git-c/Actions.
**Cons:** The toolchain content describes infrastructure (apps/api Prisma, apps/web Next.js, PostgreSQL 16, Redis 7) that exists in OTHER projects, not this one. Keeping it in a skill called "git-tooling-integration" risks being mis-applied.
**Effort:** Medium-high. 6 files new/rewritten.

### Approach C — 4 new skills + drop toolchain content entirely

Same as A, but toolchain content is deleted (not moved to a 5th skill).

**Pros:** Cleanest result. Removes aspirational content. Each remaining skill is 100% policy.
**Cons:** The user might want this content for OTHER projects (atlas, neomycelio were referenced in the examples). Deleting is irreversible without git history.
**Effort:** Low. 4 new + 1 rewrite, no 5th.

### Approach D — Keep estrategia-git monolithic, just fix encoding + drop develop references

Just apply the 9e6de69-style cleanup to remaining issues.

**Pros:** Minimal change. No architecture risk.
**Cons:** Does not solve the user's stated problem (632 lines, hard to maintain, mixes strategy with toolchain). User explicitly said "split into 3-4 smaller skills" — this is the wrong direction.
**Effort:** Low. But doesn't meet the requirement.

---

## Recommendation: **Approach A** with a conditional extension to B

**Start with Approach A** (4 skills + thin index). The toolchain content is **aspirational/template for other projects** — keeping it would create a skill that misleads future agents about this repo's actual setup.

However, the orchestrator should ask the user one focused question before `sdd-propose`:

> "The current estrategia-git describes a Husky + GGA + git-c + GitHub Actions toolchain that this repo does NOT use (no `.husky/`, no `.gga`, no `.github/`, no `develop` branch, no apps/api Prisma, no apps/web Next.js). Do you want to:
> 1. **Drop the toolchain content entirely** (cleanest, focused on policy) — recommended
> 2. **Move it to a 5th skill `git-tooling-integration`** (preserved as a template for your other projects, marked optional)"

This is the central design decision. Approach A assumes option 1; Approach B assumes option 2. sdd-design should resolve it.

---

## Section-by-Section Mapping (Key Deliverable)

| Current H2 in `estrategia-git/SKILL.md` | Line range | Destination | Notes |
|---|---|---|---|
| `## Resumen de la Estrategia` (ASCII diagram) | 18–24 | `estrategia-git` (index) | Keep the branch diagram in the index; it's the best "at a glance" |
| `### Reglas Fundamentales` (7 rules) | 26–35 | **split** | See sub-mapping below |
| ↳ Rule 1: main is untouchable | 28 | `branch-naming` + AGENTS.md | Also lives in AGENTS.md L1076; keep both |
| ↳ Rule 2: develop is la base | 29 | `release-flow` (with caveat) | **Stale** — see Risks |
| ↳ Rule 3: ramas cortas | 30 | `branch-naming` | |
| ↳ Rule 4: Conventional Commits | 31 | `commit-conventions` | |
| ↳ Rule 5: No AI Attribution | 32 | `commit-conventions` + AGENTS.md | Also in AGENTS.md L1080, L1131 |
| ↳ Rule 6: Husky validación local | 33 | `git-tooling-integration` (or drop) | Only if 5th skill exists |
| ↳ Rule 7: GGA code review | 34 | `git-tooling-integration` (or drop) | Only if 5th skill exists |
| `## Herramientas Incluidas` (table) | 38–47 | `git-tooling-integration` (or drop) | Tool list belongs with tooling |
| `## Workflow Completo` | 50–201 | **split** | See sub-mapping below |
| `### 1. Sincronizar develop` | 52–58 | `release-flow` (or `branch-naming`) | "Sync base branch before new branch" |
| `### 2. Crear Rama de Tarea` | 60–97 | `branch-naming` | Branch types table (L70–82), examples good/bad (L84–97) |
| `### 3. Implementar` | 99–106 | **drop** | Generic project advice (MVS, SDD, Clean Code, Tests) — zero value in a git skill |
| `### 4. Commits Conventional` | 107–153 | `commit-conventions` | Format (L110), examples (L114–121), rules (L124–129), types table (L132–145), breaking changes (L148–153) |
| `### 5. Push y Sincronización` | 155–163 | **drop** | `git push` is universal git, not strategy |
| `### 6. Abrir Pull Request` | 165–185 | `pr-template` | The body template (L169–185) is the core of pr-template |
| `### 7. Code Review` | 187–194 | `pr-template` (reviewer checklist) | Move the 4 review points to a "reviewer checklist" section in pr-template |
| `### 8. Merge a develop` | 196–200 | `pr-template` (closing) | Squash merge + delete branch — closes the PR section |
| `## Release Flow (develop → main)` | 203–242 | `release-flow` | **Major rewrite needed** — see Risks |
| ↳ Conditions block | 205–212 | `release-flow` | "Tests passing, docs updated, CHANGELOG updated" — generic, still valid |
| ↳ Pasos block | 213–242 | `release-flow` | Replace `develop` references; replace `bun test` with generic test command |
| `## Herramientas de Automatización` | 244–409 | `git-tooling-integration` (or drop) | All 5 tool subsections |
| `### 1. Git Hooks (Husky)` | 248–285 | `git-tooling-integration` | pre-commit, commit-msg, pre-push configs |
| `### 2. commitlint.config.js` | 287–291 | `git-tooling-integration` | One-line config; keep |
| `### 3. Script git-c` | 293–321 | `git-tooling-integration` | The script content is stubbed ("…"); low value but keep for completeness |
| `### 4. GGA` | 323–347 | `git-tooling-integration` | `.gga` config example |
| `### 5. GitHub Actions` | 349–408 | `git-tooling-integration` | bun + Prisma + PostgreSQL + Redis example — heavily project-specific |
| `## Comandos Útiles` | 411–495 | **drop** | Universal git commands (status, log, stash, reset). Not strategy. |
| `## Escenarios Comunes` | 497–537 | **mostly drop** | See sub-mapping below |
| ↳ Continuar trabajo en branch existente | 501–509 | **drop** | Generic |
| ↳ Abortar PR y continuar en branch | 511–519 | **drop** | Generic git, not strategy |
| ↳ Rebase con develop | 521–529 | `release-flow` (one-liner) | "Before merging, rebase feature onto base branch" |
| ↳ Cherry-pick commit | 531–537 | **drop** | Generic git |
| `## Integración con Pi/Agent` | 539–568 | **drop** | Self-referential; this repo IS Pi/opencode |
| `## Archivos que NO se versionan` | 570–617 | **drop** (move to `.gitignore` if needed) | Repo-specific `.gitignore` content, not skill content |
| `## Notas Finales` | 619–628 | **split** | See sub-mapping below |
| ↳ Commits atómicos | 622 | `commit-conventions` | One-liner |
| ↳ Mensajes descriptivos | 623 | `commit-conventions` | One-liner |
| ↳ Ramas cortas | 624 | `branch-naming` | One-liner |
| ↳ Review temprano (draft PR) | 625 | `pr-template` | One-liner |
| ↳ Tags semánticos | 626 | `release-flow` | One-liner |
| `*Skill creado: 2026-05-31*` / `*Para: Proyectos con Pi*` | 631–632 | `estrategia-git` (index footer) | Update to new date + new name |

**Total drops** (out of 632 lines):
- Hard drops (no value): ~125 lines (L99–106, L155–163, L411–495 except 521–529, L511–519, L531–537, L539–568, L570–617) ≈ **125 lines**
- Conditional drops (if no 5th tooling skill): ~165 lines (L38–47, L246–409) ≈ **165 lines**
- Splits: ~250 lines redistribute into 4 new skills
- Stays in index: ~80 lines (L1–17, L18–24, L26–35 trimmed, L619–632)

If user picks **Approach A** (drop toolchain): estrategia-git goes from 632 → ~100 lines; 4 new skills of ~80–120 lines each = ~400 lines total. **Net reduction: ~130 lines, big maintainability win.**

If user picks **Approach B** (5th tooling skill): estrategia-git → ~100 lines; 5 new skills of ~80–120 lines each = ~500 lines total. **Net reduction: ~30 lines, but each skill is single-purpose.**

Either way, **no skill exceeds the 700-line hard max**, and most fit comfortably in the 180–450 token recommended range.

---

## Cross-References That Will Break / Need Updating

| Location | Current state | Action required after split |
|---|---|---|
| `.atl/skill-registry.md` L105 | Single entry for `estrategia-git` | Replace with 4 or 5 entries; update triggers/description to reflect narrower scope of index |
| `AGENTS.md` L1059–1087 (Git Strategy section) | Duplicates ~80% of estrategia-git content | Trim to: branch model diagram + 6 rules + reference to the 4 new skills by name; drop the commit format one-liner (moves to commit-conventions) |
| `AGENTS.md` L1080, L1131 (No AI Attribution rule) | Already a persona absolute rule | Keep — independent of estrategia-git split |
| `openspec/config.yaml` L6 (project context) | Mentions "Git workflow (per estrategia-git/SKILL.md v2.0): main ← develop ← feat/* \| fix/* \| docs/*" | Update to reflect: index + 4 split skills; fix the "develop" reference (it doesn't exist) |
| Any future agent prompt that says "use estrategia-git to write a commit" | Will still work, but agente might need to look up commit-conventions directly | Could add a "triggers: [commit message, conventional commit, …]" hint in the index so the router knows to redirect |

No other skills in the repo reference `estrategia-git` (verified with `grep -rn estrategia-git`).

---

## What the estrategia-git Index Should Contain

Target: **~80–100 lines**, single physical file, LLM-first structure per skill-creator.

```markdown
---
name: estrategia-git
description: "Trigger: git strategy, branching model, commit policy, PR workflow, release flow. Router skill — points to commit-conventions, branch-naming, pr-template, release-flow, git-tooling-integration. Load this when unsure which git skill applies."
license: MIT
metadata:
  author: Sebastian Illa
  version: "3.0"
---

# Git Strategy — Index

> Router skill. Pick the focused skill that matches your task.

## Decision table

| You need to… | Load this skill |
|---|---|
| Write a commit message | `commit-conventions` |
| Create or name a branch | `branch-naming` |
| Open, review, or merge a PR | `pr-template` |
| Tag a release / bump version | `release-flow` |
| Configure Husky, GGA, git-c, or GitHub Actions | `git-tooling-integration` (optional, opt-in) |

## Branch model (at a glance)

```
main (production) ←── PRs from feature/* | fix/* | hotfix/* | chore/*
        ↑
        └── (no develop branch in this repo — branch from main, merge back to main)
```

## Universal rules (apply across all skills)

1. **main is untouchable**: never commit directly to main; always via PR.
2. **Conventional Commits**: every commit follows the format.
3. **No AI Attribution**: never add "Co-authored-by" or AI trailers.
4. **Short-lived branches**: create → work → merge → delete.
5. **Reference**: see `AGENTS.md` 🔀 Git Strategy for persona-level rules.

## Repository-specific notes

- This repo's branches: main, plus working branches (chore/*, docs/*, sdd/*).
- This repo's actual tooling: NONE of the strategy's toolchain (Husky/GGA/git-c/Actions) is installed here. The strategy describes the **policy for projects the user works on**, not the current repo's runtime.
```

---

## Risks for the Orchestrator

### Risk 1 — Develop branch contradiction (CRITICAL)

**The estrategia-git skill (and the AGENTS.md Git Strategy section) say "all branches come from develop." The repo has no `develop` branch.** Confirmed: `git branch -a` shows only `main`, `chore/opencode-bootstrap`, `docs/estrategia-git-cleanup`, `sdd/estrategia-git-media-cleanup` (current).

The user flagged this as a separate decision for sdd-design. **My recommendation:** state both options in the proposal and let the user choose:

- **Option α:** Make this repo branch-from-main (matches reality; simpler; no `develop` ever).
- **Option β:** Create a `develop` branch now and adopt the existing policy (matches the policy; introduces a new long-lived branch).

The proposed `release-flow` skill should be written so that swapping the base branch name is a one-line change.

### Risk 2 — Toolchain content is aspirational, not real

The estrategia-git skill describes:
- Husky hooks (not installed: no `.husky/`)
- commitlint config (not installed: no `commitlint.config.js`)
- git-c automation script (not installed)
- GGA (not installed: no `.gga`)
- GitHub Actions workflows (not installed: no `.github/workflows/`)
- bun + apps/api Prisma + apps/web Next.js + PostgreSQL 16 + Redis 7 (this repo has no `apps/` directory)

**This is template content from another project the user works on.** If the new skills inherit this content as if it described this repo, the next agent that loads `commit-conventions` will look for `.husky/commit-msg` that doesn't exist and fail.

**Mitigation:** If the user keeps the toolchain content (Approach B), the 5th skill `git-tooling-integration` must open with a clear banner: "**Template for projects that adopt this toolchain. This repo does not use it.**" Otherwise drop it.

### Risk 3 — AGENTS.md is always-loaded; changes propagate everywhere

`AGENTS.md` (1300 lines) is loaded into every session. The Git Strategy section at L1059–1087 is the "persona's policy baseline" — touching it changes how every agent session interprets git. **Any edits here must be reviewed by the user** (this is the project-wide persona contract, not a skill).

### Risk 4 — Skill registry churn

The `.atl/skill-registry.md` file is consumed by skill-registry automation. Adding 4–5 entries is mechanical, but the **triggers** in the new entries must not overlap with existing entries (e.g., `commit-conventions` and `branch-naming` both have "git" as a natural trigger word). Suggest narrow triggers like "conventional commit", "branch name", "pull request", "release", "tag version".

### Risk 5 — Review budget

Review budget is **400 lines** for the chained-PR strategy. If the user picks Approach B (5 new skills + AGENTS.md edit + registry update), this is one PR with 5 new files averaging 100 lines = 500 lines, **over the budget**. Suggest **chained PR strategy**:
- PR1: `commit-conventions` + `branch-naming` (2 files, ~200 lines)
- PR2: `pr-template` + `release-flow` (2 files, ~200 lines)
- PR3: `git-tooling-integration` (1 file, ~150 lines, if Approach B)
- PR4: estrategia-git reduction + AGENTS.md trim + registry update (3 small files, ~200 lines)

This respects the 400-line budget. Orchestrator should propose chained PR.

---

## Open Questions for sdd-propose

1. **Toolchain content:** Drop entirely, or keep in a 5th `git-tooling-integration` skill? (Affects 165 lines of content and whether we add a 5th file.)
2. **`develop` branch policy:** Reflect repo reality (branch from main), keep aspirational policy (require develop to be created), or leave the conflict unresolved and surface it as a known issue? (Affects the diagram in the index and the `release-flow` opening text.)
3. **AGENTS.md Git Strategy section:** Trim aggressively (just 6 rules + pointer), or preserve more detail? (User's call — this is the persona contract.)
4. **Chained PR vs single PR:** User's ask-always preference says ask; recommend 3–4 PRs but let user decide.
5. **Existing `docs/estrategia-git-cleanup` branch:** Note that there's already a branch `docs/estrategia-git-cleanup` in the repo (created Jun 3 21:00) with `9e6de69 docs(estrategia-git): remove duplicated resumen and fix encoding glitch`. **This is the most recent base for the media-cleanup work.** sdd-design should base off that branch, not off main, to preserve the cleanup history. Verify with the user.

---

## Ready for Proposal

**Yes.** The mapping is unambiguous, the destination skills are well-defined, and the open questions are concrete. sdd-propose should:
1. Present the user's stated split (4 skills + thin index) as the default
2. Surface the 2 critical decisions (toolchain content + develop branch)
3. Propose the chained-PR strategy to respect the 400-line review budget
4. Flag AGENTS.md as user-review-required (persona contract)

---

## Relevant Files

- `estrategia-git/SKILL.md` — 632 lines, 12 H2 sections, the source of the split
- `AGENTS.md` — 1300 lines; Git Strategy section at L1059–1087 overlaps with estrategia-git
- `.atl/skill-registry.md` — 240 lines, 211 entries; L105 is the estrategia-git entry to replace
- `openspec/config.yaml` — 38 lines; L6 references the estrategia-git workflow in project context
- `openspec/changes/estrategia-git-media-cleanup/` — this file lives here (exploration.md)

## Artifacts Created

- `openspec/changes/estrategia-git-media-cleanup/exploration.md` (this file)
- Engram observation: `sdd/estrategia-git-media-cleanup/explore` (saved with capture_prompt: false)
