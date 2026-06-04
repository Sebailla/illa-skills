# Proposal: Estrategia Git — split monolithic skill into 5 focused skills

**Change**: `estrategia-git-media-cleanup`
**Base branch**: `develop` (created locally as part of pre-proposal housekeeping)
**Author**: sdd-propose sub-agent
**Date**: 2026-06-03

---

## Intent

The current `estrategia-git/SKILL.md` is a 632-line monolithic skill that mixes four distinct concerns — commit conventions, branch naming, PR workflow, release flow, and toolchain configuration — into a single document written in Spanish tutorial-prose. It violates the skill-creator contract (recommended 180–450 tokens, hard max 1000/700; the file is ~3000+ tokens), and its toolchain section describes infrastructure (Husky, GGA, git-c, GitHub Actions with bun + Prisma + PostgreSQL 16 + Redis 7) that does not exist in this repository. The file is also a known stale reference (the `develop` branch it mandates as the integration base did not exist until the orchestrator created it as pre-proposal housekeeping). This change splits the skill into 5 focused, LLM-first skills that fit the 180–450 token budget, with `estrategia-git` reduced to a thin router index. It also resolves two user-confirmed contradictions: (1) the toolchain content is rewritten as a stack-agnostic template (no bun, Prisma, Next.js, PostgreSQL, or Redis), and (2) the `develop` branch is adopted as the mandatory integration base going forward.

---

## Scope

### In Scope

- **5 new skill files** under the repo root, each a focused LLM-first skill (180–450 tokens):
  - `commit-conventions/SKILL.md` — Conventional Commits format, types, breaking changes, scope rules
  - `branch-naming/SKILL.md` — type prefixes, regex, examples, pre-push validation
  - `pr-template/SKILL.md` — PR body format, labels, type-to-label mapping, issue-first rule, reviewer checklist
  - `release-flow/SKILL.md` — develop → main flow, tagging, CHANGELOG, version bumping
  - `git-tooling-integration/SKILL.md` — stack-agnostic template for Husky/commitlint/git-c/GGA/GitHub Actions, opt-in, opens with a clear "template, not this repo's config" banner
- **Rewrite** `estrategia-git/SKILL.md` as a thin router index (~80–100 lines) that points to the 5 split skills
- **Update** `AGENTS.md` L1054–1087 (Git Strategy section): trim to a 5-rule persona baseline and reference the 5 split skills by name; keep the persona contract (L1077 "develop is the base" stays as-is, now truthful)
- **Update** `.atl/skill-registry.md` L105: replace single `estrategia-git` entry with 5 entries, each with non-overlapping trigger descriptions
- **Update** `openspec/config.yaml` L6–L7: correct the project context reference to mention the index + 4 split skills and remove the "husky, GGA" claim that does not apply to this repo

### Out of Scope

- The 3 dangling branches (`chore/opencode-bootstrap`, `docs/estrategia-git-cleanup`, plus this change's own `sdd/estrategia-git-media-cleanup`) — orchestrator will ask user separately whether to clean up
- Migration of the toolchain content into a working `.husky/`, `commitlint.config.js`, `.gga`, or `.github/workflows/` directory — this repo does not adopt the toolchain
- Bumping `package.template-pi.json` version — there is no actual application code in this repo
- Cross-language translation of skills (the Spanish content in the current monolithic skill is not preserved verbatim; new skills are written in English per Language Domain Contract and the repo's English default)
- Any change to the el-Gentleman persona's architecture or behavioral rules (AGENTS.md sections other than L1054–1087)

---

## Capabilities

> Contract between this proposal and `sdd-spec`. sdd-spec reads this section to know which spec files to create or update.

### New Capabilities

- `commit-conventions`: LLM-first skill for Conventional Commits — format, types, scope, breaking changes, body/footer rules
- `branch-naming`: LLM-first skill for branch prefix taxonomy (`feat/`, `fix/`, `docs/`, `chore/`, `refactor/`, `perf/`, `test/`, `build/`, `ci/`, `revert/`, `hotfix/`), good/bad examples, and pre-push validation regex
- `pr-template`: LLM-first skill for PR body template, type-to-label mapping, issue-first rule, reviewer checklist, squash-merge-and-delete policy
- `release-flow`: LLM-first skill for develop → main release flow, semantic-version tagging, CHANGELOG update rule, release PR template
- `git-tooling-integration`: LLM-first meta-skill (opt-in) for wiring git automation into any project — stack-agnostic templates for Husky/commitlint (Node), pre-commit (Python), git-c script, GGA config, GitHub Actions workflows. Opens with a banner: "Template for projects that adopt this toolchain. This repo does not use it."

### Modified Capabilities

- `estrategia-git`: changed from monolithic policy + toolchain reference to thin router index (~80–100 lines). Frontmatter `description` changes from long multi-line to single-line YAML-safe. Body content shrinks from 12 H2 sections + 632 lines to a decision table + branch diagram + 5 universal rules + repository-specific notes.
- `el-gentleman` (AGENTS.md L1054–1087 Git Strategy section): trimmed from 6 rules + branch diagram + commit format to 5 rules + branch diagram + reference list of 5 split skills. The "main is untouchable" and "No AI Attribution" rules remain; the "Husky" rule moves to the index pointer and the persona contract shifts from "tools list" to "policy baseline."

---

## Approach

### High-level strategy

1. **Create 5 new skills** as stand-alone directories at the repo root, each with a single `SKILL.md` (no `assets/` or `references/` needed — content is self-contained at the size budget).
2. **Each new skill follows the skill-creator LLM-first structure**: frontmatter (single-line ≤250 char `description` with trigger words), `## Activation Contract`, `## Hard Rules`, `## Decision Gates`, `## Execution Steps`, `## Output Contract`, `## References`.
3. **Rewrite the toolchain content as stack-agnostic templates** — replace the bun/Prisma/Next.js/PostgreSQL/Redis specifics with conditional patterns ("if Node, use Husky + commitlint; if Python, use pre-commit; if Go, use lefthook"). Open the file with a banner stating it is a template, not this repo's configuration.
4. **Reduce `estrategia-git/SKILL.md`** to a router index: frontmatter, decision table (which skill to load), branch diagram, 5 universal rules, repo-specific notes (this repo's actual branches and tooling state), version bump to 3.0.
5. **Trim `AGENTS.md` Git Strategy section** to 5 rules + a 1-line reference to the 5 split skills. The "develop is the base" rule is now truthful (the branch exists).
6. **Update `.atl/skill-registry.md`**: replace the single estrategia-git entry with 5 entries. Use narrow, non-overlapping trigger descriptions.
7. **Update `openspec/config.yaml`**: correct the project context to reflect the 5 split skills and remove the false "husky, GGA" claim.

### Design constraints (locked by user decisions)

- The `git-tooling-integration` skill is a **pure template** — no stack-specific content (no bun, no Prisma, no Next.js, no PostgreSQL/Redis). Generic patterns only.
- The `develop` branch is the **mandatory integration base** for all new work. Main only receives release PRs from develop.
- All work in this change happens on `develop` (or feature branches cut from `develop`). Main is not touched.

### Chained PR strategy

The preflight review budget is **400 changed lines per PR**. This change spans 7 new files + 1 large rewrite + 3 small updates. A single PR is technically under budget (~+72 net lines) but has 9 files and 5 distinct policy areas, which violates reviewer cognitive-load rules. **Chained PRs are recommended** — see Work Unit Breakdown below.

---

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `commit-conventions/SKILL.md` | New | LLM-first skill, ~110 lines, policy for Conventional Commits |
| `branch-naming/SKILL.md` | New | LLM-first skill, ~110 lines, branch prefix taxonomy and validation |
| `pr-template/SKILL.md` | New | LLM-first skill, ~120 lines, PR body template + reviewer checklist |
| `release-flow/SKILL.md` | New | LLM-first skill, ~120 lines, develop → main release flow |
| `git-tooling-integration/SKILL.md` | New | LLM-first skill, ~140 lines, stack-agnostic toolchain template (opt-in) |
| `estrategia-git/SKILL.md` | Modified (rewrite) | 632 → ~90 lines, thin router index, version bump 2.0 → 3.0 |
| `AGENTS.md` | Modified (trim) | L1054–1087 trimmed: remove duplicated rules, keep 5 persona rules + reference list |
| `.atl/skill-registry.md` | Modified | L105: 1 entry replaced with 5 entries, narrow trigger descriptions |
| `openspec/config.yaml` | Modified | L6–L7: correct project context reference and remove false toolchain claim |

No other skills, modules, or tests are affected. This is a documentation-only refactor in a skills repo.

---

## Risks

| # | Risk | Likelihood | Mitigation |
|---|------|------------|------------|
| 1 | **AGENTS.md Git Strategy section is the persona contract** (always-loaded in every session). Trimming it changes how every agent interprets git. | High impact | The change is bounded to L1054–1087 only; the "main is untouchable" and "No AI Attribution" rules stay. The 5 new skills are referenced by name. User must approve the diff before merge. |
| 2 | **Toolchain template rewrite is a non-trivial content effort** — the current text is bun/Prisma/Next.js-specific. Rewriting it as stack-agnostic conditional patterns requires careful framing so future agents do not mis-apply Node patterns to Python projects. | Medium | Open the file with a prominent banner: "Template for projects that adopt this toolchain. This repo does not use it." Use decision tables (Node vs Python vs Go) instead of single-stack examples. |
| 3 | **Skill registry trigger overlap** — `commit-conventions`, `branch-naming`, `release-flow`, and `git-tooling-integration` all naturally share the word "git" in their descriptions. | Medium | Use narrow, action-specific triggers: "conventional commit", "branch name", "pull request", "release tag", "Husky config". Verify in sdd-spec that no two skills trigger on the same phrase. |
| 4 | **Cross-references in 3+ files need updating** (`AGENTS.md`, `.atl/skill-registry.md`, `openspec/config.yaml`). A missed reference will leave a broken pointer. | Medium | List all cross-references explicitly in the Affected Areas table; sdd-verify must grep for the old skill name and confirm zero orphans. |
| 5 | **The "develop is the base" rule was historically aspirational** (the branch did not exist). Now it is truthful, but old local clones, contributor docs, or pinned references in external projects may still point to "main" as the integration base. | Low | Document the change in the proposal and in the commit message; the chained PR order ensures the index references the correct branch from day one. |
| 6 | **Review workload is on the high end of the 400-line budget** if all 4 work units were combined. The preflight `ask-always` strategy means the user must confirm chained PRs. | Medium | Propose 4 explicit chained PRs in the Work Unit Breakdown; orchestrator asks the user. |

---

## Rollback Plan

Each chained PR is independently revertable. The 4 new skills are additive — rolling them back removes the 4 files and reverts `AGENTS.md` to its prior state in that PR. The 5th skill (`git-tooling-integration`) and the strategy PR (`estrategia-git` reduction + cross-reference updates) are the most consequential; if the rollout is accepted but later regretted:

1. **Roll back PR 4** (`estrategia-git` index + cross-references): reverts `estrategia-git/SKILL.md` to the 632-line monolithic content, restores the AGENTS.md Git Strategy section, restores the registry entry. Old skill continues to work as before.
2. **Optionally delete** the 4 new skill directories (PRs 1–3 contents) — they are no longer referenced once PR 4 is reverted, but they can be kept for future use.

No destructive operations. No data loss. No external state changes.

---

## Dependencies

- **Git `develop` branch**: must exist before work starts. Status: created locally by orchestrator (verified in preflight).
- **No external tooling**: this is a docs-only refactor, no dependencies on Husky/commitlint/etc.
- **No external services**: no CI runs in this repo, no API integrations, no DB.
- **Skill-creator contract**: the 5 new skills must conform to the LLM-first structure (single-line description, Activation Contract, Hard Rules, Decision Gates, Execution Steps, Output Contract, References).

---

## Success Criteria

- [ ] 5 new skill files exist at the repo root, each between 180 and 450 tokens, each with a single-line YAML-safe `description` ≤250 chars
- [ ] `estrategia-git/SKILL.md` is reduced to ≤100 lines and is a router index (decision table + branch diagram + universal rules + repo-specific notes)
- [ ] `AGENTS.md` L1054–1087 is trimmed and references the 5 split skills by name; L1077 "develop is the base" rule is preserved
- [ ] `.atl/skill-registry.md` has 5 entries (4 new + reduced `estrategia-git`) with non-overlapping trigger descriptions
- [ ] `openspec/config.yaml` L6–L7 reflects the 5 split skills and no longer claims the toolchain is active in this repo
- [ ] No remaining `git-c`, `oven-sh/setup-bun`, `apps/api prisma`, `PostgreSQL 16`, or `Redis 7` references in the policy skills (these are template content in `git-tooling-integration` only, marked as such)
- [ ] `git log --all --oneline | grep -i 'husky\|GGA\|bun' | grep -v 'git-tooling-integration'` returns no false-positive references
- [ ] The `develop` branch is the base for all 4 chained PRs; main is untouched
- [ ] Each chained PR is independently mergeable and revertable

---

## Work Unit Breakdown

**Chained PR strategy recommended** (4 PRs, each under 400 changed lines). Order: PR1 first (foundation), PR4 last (cutover).

| # | PR | Files | Net Δ lines | Target branch | Depends on |
|---|----|-------|-------------|---------------|-----------|
| 1 | `commit-conventions` + `branch-naming` | 2 new (~110 each) | +220 | `develop` | — |
| 2 | `pr-template` + `release-flow` | 2 new (~120 each) | +240 | `develop` | PR1 (release flow references branch types) |
| 3 | `git-tooling-integration` (rewritten as template) | 1 new (~140) | +140 | `develop` | — (independent opt-in skill) |
| 4 | `estrategia-git` index + `AGENTS.md` trim + registry update + `openspec/config.yaml` update | 1 rewrite + 3 small updates | ~−550 net (mostly deletion) | `develop` | PR1, PR2, PR3 (index references all 5 new skills) |

**Why this order matters**:
- PR1 ships the policy primitives. Without `commit-conventions` and `branch-naming` the rest has nothing to build on.
- PR2 ships the policy flows that consume PR1's primitives. `pr-template` uses commit types; `release-flow` uses branch types.
- PR3 is independent and can technically ship first, but staging it after PR1/PR2 lets reviewers focus on policy before tooling.
- PR4 is the cutover — it removes the old monolithic content and updates all cross-references. It MUST land last; otherwise the index will point to skills that do not exist.

**Review budget per PR**: all 4 PRs are within the 400-line budget (PR4 is mostly deletion, easy to verify).

---

## Review Workload Forecast

- **Total files touched**: 9 (5 new + 1 rewrite + 3 small updates)
- **Net line change**: ~+50 lines (632 line monolith → 5 new skills ~600 + 90-line index, minus AGENTS.md trim and config cleanup)
- **Single PR forecast**: technically under 400 lines, but 9 files and 5 distinct policy areas — exceeds reviewer cognitive-load guidance
- **Chained PR forecast**: 4 PRs, each scoped to 1–2 files, each under 400 lines, each independently revertable
- **Recommendation**: **chained PRs, 4 slices** (see Work Unit Breakdown table). The preflight is `ask-always`, so orchestrator should ask the user to confirm.

---

## Open Questions for sdd-spec

The sdd-spec phase should resolve these before writing the per-skill spec files:

1. **Index skill naming**: keep `estrategia-git` (preserves the historical name; minor mismatch with the new "router only" purpose) or rename to `git-workflow` (more accurate, but breaks the existing skill entry and the `el-gentleman` AGENTS.md reference)? **Recommendation: keep `estrategia-git`** — naming churn is not worth the breaking change.

2. **Index skill content style**: pure router (decision table + nothing else) or include a small "essentials" inline section (e.g., the 5 universal rules inlined for fast lookup, with a "see also" pointer)? **Recommendation: small essentials section** — agents that load the index for orientation benefit from seeing the rules inline.

3. **`git-tooling-integration` framing**: should the skill open with a "when to use" decision tree (e.g., "Adopt this toolchain if: you want automated commit validation, you have a Node/Python/Go project, you want CI"), or should it just be a reference and let the agent decide? **Recommendation: include a 3-line decision tree** at the top.

4. **PR template labels**: does this repo use GitHub labels (e.g., `feat`, `fix`, `docs`, `breaking-change`)? The `pr-template` skill should reference actual labels if they exist. **Action**: sdd-spec should check `.github/` (none expected) and `AGENTS.md` for any label definitions.

5. **CHANGELOG mention**: the original `release-flow` references `CHANGELOG.md`. Is there a CHANGELOG in this repo? **Action**: sdd-spec should verify. If not, the release-flow skill should still mention CHANGELOG as a convention without requiring the file to exist.

6. **AGENTS.md update order**: should AGENTS.md be trimmed in PR4 (after the 5 new skills exist) or in PR1 (so the persona contract stops referencing soon-to-be-deprecated content immediately)? **Recommendation: PR4** — keeps cross-references consistent and avoids a "halfway" state where AGENTS.md points to skills that do not exist.

7. **Skill registry trigger specificity**: what is the minimum specificity that prevents overlap? e.g., `commit-conventions` description = "Trigger: conventional commit, commit message, commit format, feat/fix/chore commit." Avoid the word "git" entirely in trigger phrases to prevent collision with `branch-naming` and `pr-template`. **Action**: sdd-spec to draft and verify with a manual overlap check.

8. **`develop` branch existence verification**: the orchestrator reports `develop` was created locally, but is it pushed to origin? If not, PR1 cannot be opened against it. **Action**: sdd-design (before sdd-tasks) should confirm `git push -u origin develop` succeeded.

---

## Next Step

Ready for `sdd-spec`. Each of the 5 new skills needs a spec file at `openspec/specs/<skill-name>/spec.md` defining its LLM-first structure (Activation Contract, Hard Rules, Decision Gates, Execution Steps, Output Contract, References). The 2 modified capabilities (`estrategia-git` and `el-gentleman` AGENTS.md section) need delta specs in the change folder.

---

## Relevant Files

- `openspec/changes/estrategia-git-media-cleanup/exploration.md` — source mapping table (already exists)
- `estrategia-git/SKILL.md` — 632 lines, the source of the split
- `AGENTS.md` — 1300 lines; Git Strategy section at L1054–1087
- `.atl/skill-registry.md` — 240 lines, 211 entries; L105 is the estrategia-git entry
- `openspec/config.yaml` — 54 lines; L6–L7 references the estrategia-git workflow
- `skills/skill-creator/SKILL.md` — LLM-first skill authoring rules
- `skills/cognitive-doc-design/SKILL.md` — writing skills that reduce cognitive load

## Artifacts to Be Created

- `openspec/changes/estrategia-git-media-cleanup/proposal.md` (this file)
- 5 × `openspec/specs/<skill-name>/spec.md` (in sdd-spec phase)
- 2 × delta specs in `openspec/changes/estrategia-git-media-cleanup/specs/` (in sdd-spec phase)
- Engram observation: `sdd/estrategia-git-media-cleanup/propose` (saved with `capture_prompt: false`, `type: architecture`)
