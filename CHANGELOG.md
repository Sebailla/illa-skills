# Changelog

Todos los cambios notables de este proyecto se documentan acá.

Formato basado en [Keep a Changelog](https://keepachangelog.com/),
este proyecto adhiere a [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Skill `commit-conventions` (formato Conventional Commits, tipos, breaking changes, reglas de scope)
- Skill `branch-naming` (prefijos de tipo, regex, validación pre-push, excepciones)
- Skill `pr-template` (estructura del PR body, mapeo tipo→label, issue-first, checklist)
- Skill `release-flow` (flujo develop→main, semver, tagging anotado, convención CHANGELOG)
- Skill `git-tooling-integration` (meta-skill stack-agnostic, opt-in, 3 ejemplos de ecosistema)
- `CHANGELOG.md` (este archivo)

### Changed
- `estrategia-git/SKILL.md` reducido de 632 a ~90 líneas (índice router que apunta a las 5 skills divididas)
- `AGENTS.md` sección Git Strategy (L1054–L1087) trimeada de 6 a 5 reglas, con referencias a las 5 skills divididas

## [3.0.0] - TBD

Entrada a cerrar en PR4 (cutover) una vez mergeadas las 5 skills nuevas + el índice reducido + el trim de AGENTS.md.
