---
name: commit-conventions
description: "Trigger: redactar commit, Conventional Commits format, tipos de commit, breaking change, scope. Cargar cuando el agente deba escribir, validar o explicar un mensaje de commit."
license: MIT
metadata:
  author: Sebastian Illa
  version: "1.0"
---

# commit-conventions

Skill LLM-first que define el formato, tipos, scope y breaking changes de los mensajes de commit.

## Activation Contract

Cargar cuando el agente deba redactar, validar o explicar mensajes de commit. No cargar para `git status/log/diff`, resolución de conflictos, o trabajo sin commit.

## Formato

`<tipo>(<alcance>): <descripción>`

- **Tipo**: uno de `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **Alcance** (opcional): módulo o área, en kebab-case. Omitir si no aplica (no paréntesis vacíos).
- **Descripción**: imperativo presente, sin punto final, ≤72 caracteres.

## Breaking changes

Marcar con `!` antes de los dos puntos: `feat(api)!: change token format`. NO combinar con pie `BREAKING CHANGE:`.

## Cuerpo y pie

- **Cuerpo**: incluir si la justificación no es evidente. Envolver a 72 caracteres.
- **Pie**: `Closes #<n>`, `Refs #<n>` o tokens especiales, en línea separada.

## Atomicidad

Un commit por cambio lógico. Dividir fixes y refactors en commits separados.

## Referencia

Spec canónica: `openspec/specs/commit-conventions/spec.md`
