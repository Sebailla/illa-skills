# Spec: release-flow

**Tipo**: capacidad nueva (spec completo)
**Origen**: `estrategia-git-media-cleanup` — extracción de "Release Flow (develop → main)" del monolítico.

---

## Propósito

Skill LLM-first que define el flujo `develop → main`, condiciones de promoción, versionado semver, formato de tags y convención de changelog. Cubre el QUÉ; el diseño técnico describe comandos.

## Activation Contract

Cargar cuando el agente deba preparar un PR de release, calcular versión, crear/verificar tags, o proponer entradas de changelog. No cargar para merges rutinarios a develop, hotfixes directos, o trabajo sin cambio de versión.

## Requirements

### Requirement: Modelo de integración

- `main` SHALL recibir solo PRs de release desde `develop`.
- `develop` SHALL recibir PRs desde `feat/*`, `fix/*`, `docs/*`, etc.
- `hotfix/*` SHALL poder ramificar y mergear directo a `main` (con backport a `develop`) solo para incidentes de producción.

#### Scenario: PR directo a main desde feature

- GIVEN `feat/api-ratelimit` lista para producción
- WHEN el agente intenta PR contra `main`
- THEN SHALL bloquear y sugerir merge a `develop` primero

### Requirement: Versionado semver

Calcular la siguiente versión a partir de los commits mergeados a `develop` desde el último release:
- **MAJOR** si hay `BREAKING CHANGE` o sufijo `!`.
- **MINOR** si hay al menos un `feat` y ningún breaking.
- **PATCH** si solo hay `fix`/`docs`/`chore`/`refactor`/`test`/`perf`/`build`/`ci`/`style`.

#### Scenario: Cálculo con breaking

- GIVEN `feat(api)!: change auth format` y `fix: token validation` desde `v1.4.2`
- WHEN el agente calcula
- THEN SHALL emitir `v2.0.0`

### Requirement: Tagging

Tags anotados con formato `vMAJOR.MINOR.PATCH` (SemVer 2.0.0, sin prefijo `v-`, sin build metadata en el nombre). El mensaje del tag SHALL incluir un resumen de los cambios.

#### Scenario: Tag anotado

- GIVEN release `v1.5.0`
- WHEN el agente crea
- THEN SHALL usar `git tag -a v1.5.0 -m "Release v1.5.0"` y SHALL NOT usar `1.5.0` ni `v1.5`

### Requirement: Changelog (convención, no requisito)

El agente SHOULD mantener `CHANGELOG.md` en la raíz con entradas agrupadas por versión y tipo (Added, Changed, Fixed, Removed), formato Keep a Changelog 1.1.0.

> **Gap conocido**: este repositorio (`illa-skills`) no contiene `CHANGELOG.md`. La skill se redacta como convención; la creación del archivo se difiere fuera de este change.

#### Scenario: Release sin CHANGELOG

- GIVEN un repo sin `CHANGELOG.md`
- WHEN el agente prepara release
- THEN SHALL proponer crear el archivo con sección inicial y SHALL NOT bloquear el release

### Requirement: Plantilla del PR de release

Cuerpo SHALL incluir:
1. Versión propuesta (`vX.Y.Z`).
2. Resumen ejecutivo (1–3 bullets).
3. Cambios por tipo (Features, Fixes, Breaking, Chore).
4. Checklist: tests, docs, changelog, tags.

PR SHALL targetear `main` y SHALL basarse en `develop`.

#### Scenario: PR de release sin resumen

- GIVEN un PR contra `main` con título "Release v1.5.0" pero cuerpo solo con lista de commits
- WHEN el agente revisa
- THEN SHALL pedir resumen ejecutivo antes de aprobar

## Depende de

`commit-conventions`, `branch-naming`, `pr-template`.

## Referenciada por

`estrategia-git` (índice).
