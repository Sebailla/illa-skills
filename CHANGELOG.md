# Changelog

Todos los cambios notables de este proyecto se documentan acá.

Formato basado en [Keep a Changelog](https://keepachangelog.com/),
este proyecto adhiere a [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- (pendiente)

## [3.0.0] - 2026-06-04

### Added
- Skill `commit-conventions` (formato Conventional Commits, tipos, breaking changes, reglas de scope)
- Skill `branch-naming` (prefijos de tipo, regex, validación pre-push, excepciones)
- Skill `pr-template` (estructura del PR body, mapeo tipo→label, issue-first, checklist)
- Skill `release-flow` (flujo develop→main, semver, tagging anotado, convención CHANGELOG)
- Skill `git-tooling-integration` (meta-skill stack-agnostic, opt-in, 3 ejemplos de ecosistema)
- `CHANGELOG.md` (este archivo)
- `.github/labels.yml` (set de 12 labels para PRs: bug, enhancement, documentation, refactor, chore, performance, test, build, ci, breaking-change, dependencies, sdd-change)

### Changed
- `estrategia-git/SKILL.md` reducido de 632 a 46 líneas (índice router que apunta a las 5 skills divididas, v3.0)
- `AGENTS.md` sección "Git Strategy" trimeada: 6→5 reglas, sin bloque de código "Commits" duplicado, sin claim de Husky; referencia añadida a las 5 skills divididas
- `.atl/skill-registry.md` actualizado: 1 entrada `estrategia-git` → 6 entradas (router + 5 divididas) en `project` scope
- `openspec/config.yaml` corregido: contexto de proyecto refleja v3.0; removido claim falso de Husky/GGA; removida línea de branch snapshot
- `.gitignore`: permite tracking de `.atl/skill-registry.md` (excepción al ignore general de `.atl/`)

### Removed
- Bloque de código "Commits" duplicado de `AGENTS.md` (movido a `commit-conventions`)
- Regla "Husky" de `AGENTS.md` (este repo no usa Husky; el contenido se conserva en `git-tooling-integration` como opt-in)
- Secciones redundantes de `estrategia-git` (Workflow Completo, Release Flow, Herramientas de Automatización, Comandos Útiles, Escenarios Comunes, Integración con Pi/Agent, Archivos que NO se versionan): redistribuidas a las 5 skills divididas
