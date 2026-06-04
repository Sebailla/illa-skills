---
name: pr-template
description: "Trigger: abrir PR, redactar PR body, mapeo tipo→label, issue-first, checklist, política de merge. Cargar cuando el agente deba abrir, preparar o revisar un PR."
license: MIT
metadata:
  author: Sebastian Illa
  version: "1.0"
---

# pr-template

Skill LLM-first que define la estructura del cuerpo del PR, regla de issue-first, mapeo tipo→label, checklist del revisor y política de merge.

## Activation Contract

Cargar cuando el agente deba abrir, preparar o revisar un PR, o sugerir labels y reviewers. No cargar para commits, issues genéricos, o trabajo sin PR.

## Estructura del cuerpo (en orden)

1. **Descripción** (1-2 párrafos: problema y solución).
2. **Tipo de Cambio** (checklist con los 11 tipos).
3. **Breaking Changes** (sección explícita; "Ninguno" si no aplica).
4. **Checklist de calidad** (tests, docs, sin debug, sin secretos).
5. **Referencias** (`Closes #<n>`, `Refs #<n>`, o TC-id).

## Mapeo tipo → label

| Tipo commit     | Label           |
|-----------------|-----------------|
| `feat`          | `enhancement`   |
| `fix`           | `bug`           |
| `docs`          | `documentation` |
| `refactor`      | `refactor`      |
| `perf`          | `performance`   |
| `test`          | `test`          |
| `build` o `ci`  | `ci-cd`         |
| `chore`         | `chore`         |
| `revert`        | `revert`        |

Si el commit declara breaking change, añadir además `breaking-change`.

## Regla de issue-first

Exigir referencia a issue/ticket/TC en el cuerpo antes de recomendar la apertura. Sin referencia → bloquear y pedir crear/vincular issue.

## Checklist del revisor

- Consistencia arquitectónica.
- Tests pasando; cobertura no regresiva.
- Sin `console.log` ni código de debug.
- Docs actualizadas si el cambio es visible al usuario.
- Sin secretos, tokens ni PII.
- Mensajes de commit conformes con `commit-conventions`.

## Política de merge

1. **Squash merge** para features con historial ruidoso o `WIP`/`fixup`.
2. **Merge commit** para preservar historial semántico.
3. **Rebase merge** para 1-2 commits limpios con historia lineal.

Tras el merge: borrar la rama (remoto y local).

## Referencia

Spec canónica: `openspec/specs/pr-template/spec.md`
