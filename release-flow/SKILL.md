---
name: release-flow
description: "Trigger: calcular versión, crear tag, preparar release, develop→main, semver, CHANGELOG, release PR. Cargar cuando el agente deba preparar un PR de release o calcular la siguiente versión."
license: MIT
metadata:
  author: Sebastian Illa
  version: "1.0"
---

# release-flow

Skill LLM-first que define el flujo `develop → main`, condiciones de promoción, versionado semver, formato de tags y convención de changelog.

## Activation Contract

Cargar cuando el agente deba preparar un PR de release, calcular versión, crear/verificar tags, o proponer entradas de changelog. No cargar para merges rutinarios a develop, hotfixes directos, o trabajo sin cambio de versión.

## Modelo de integración

- `main` recibe solo PRs de release desde `develop`.
- `develop` recibe PRs desde `feat/*`, `fix/*`, `docs/*`, etc.
- `hotfix/*` puede ramificar y mergear directo a `main` (con backport a `develop`) solo para incidentes de producción.

PR directo a `main` desde feature branch → bloquear y sugerir merge a `develop` primero.

## Versionado semver

Calcular la siguiente versión a partir de los commits mergeados a `develop` desde el último release:

- **MAJOR** si hay `BREAKING CHANGE` o sufijo `!`.
- **MINOR** si hay al menos un `feat` y ningún breaking.
- **PATCH** si solo hay `fix`/`docs`/`chore`/`refactor`/`test`/`perf`/`build`/`ci`/`style`.

## Tagging

Tags anotados con formato `vMAJOR.MINOR.PATCH` (SemVer 2.0.0). Mensaje del tag: resumen de los cambios.

```bash
git tag -a v1.5.0 -m "Release v1.5.0"
```

## Changelog

Mantener `CHANGELOG.md` en la raíz con entradas agrupadas por versión y tipo (Added, Changed, Fixed, Removed), formato Keep a Changelog 1.1.0. Si el repo no lo tiene, proponer crearlo con sección inicial.

## Plantilla del PR de release

1. Versión propuesta (`vX.Y.Z`).
2. Resumen ejecutivo (1-3 bullets).
3. Cambios por tipo (Features, Fixes, Breaking, Chore).
4. Checklist: tests, docs, changelog, tags.

PR targetea `main` y se basa en `develop`.
