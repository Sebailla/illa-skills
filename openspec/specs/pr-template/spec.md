# Spec: pr-template

**Tipo**: capacidad nueva (spec completo)
**Origen**: `estrategia-git-media-cleanup` — extracción de "Abrir Pull Request" y "Code Review" del monolítico.

---

## Propósito

Skill LLM-first que define la estructura del cuerpo del PR, regla de issue-first, mapeo tipo→label, checklist del revisor y política de merge. Cubre el QUÉ; el diseño técnico describe plantillas y comandos `gh`.

## Activation Contract

Cargar cuando el agente deba abrir, preparar o revisar un PR, o sugerir labels y reviewers. No cargar para commits, issues genéricos, o trabajo sin PR.

## Requirements

### Requirement: Estructura del cuerpo del PR

El cuerpo SHALL contener, en orden:
1. **Descripción** (1–2 párrafos: problema y solución).
2. **Tipo de Cambio** (checklist con los 11 tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`).
3. **Breaking Changes** (sección explícita; "Ninguno" si no aplica).
4. **Checklist de calidad** (tests, docs, sin debug, sin secretos).
5. **Referencias** (`Closes #<n>`, `Refs #<n>`, o TC-id).

#### Scenario: PR con cuerpo insuficiente

- GIVEN un PR con cuerpo "fix bug"
- WHEN el agente evalúa
- THEN SHALL marcarlo incompleto y exigir ≥2 párrafos (problema + solución)

### Requirement: Mapeo tipo → label

| Tipo commit         | Label              |
|---------------------|--------------------|
| `feat`              | `enhancement`      |
| `fix`               | `bug`              |
| `docs`              | `documentation`    |
| `refactor`          | `refactor`         |
| `perf`              | `performance`      |
| `test`              | `test`             |
| `build` o `ci`      | `ci-cd`            |
| `chore`             | `chore`            |
| `revert`            | `revert`           |

Si el commit declara breaking change, SHALL añadir además `breaking-change`.

#### Scenario: PR con commit breaking

- GIVEN `feat(api)!: change auth token format`
- WHEN el agente genera labels
- THEN SHALL sugerir `enhancement` y `breaking-change`

### Requirement: Regla de issue-first

El agente SHALL exigir una referencia a issue/ticket/TC en el cuerpo (`Closes #<n>`, `Refs #<n>`, `Refs <TC-id>`) antes de recomendar la apertura.

#### Scenario: PR sin issue

- GIVEN un PR sin referencia a issue
- WHEN el agente valida
- THEN SHALL bloquear y pedir al usuario crear o vincular un issue

### Requirement: Checklist del revisor

El agente SHALL verificar antes de aprobar o pedir cambios:
- Consistencia arquitectónica (capas, dependencias).
- Tests pasando; cobertura no regresiva.
- Sin `console.log` ni código de debug.
- Docs actualizadas si el cambio es visible al usuario.
- Sin secretos, tokens ni PII.
- Mensajes de commit conformes con `commit-conventions`.

#### Scenario: PR con debug code

- GIVEN un PR con `console.log("debug")` en un servicio
- WHEN el agente revisa
- THEN SHALL pedir cambios con motivo "eliminar trazas de debug"

### Requirement: Política de merge y borrado

El agente SHALL recomendar, en orden:
1. **Squash merge** para features con historial ruidoso o `WIP`/`fixup`.
2. **Merge commit** para preservar historial semántico.
3. **Rebase merge** para 1–2 commits limpios con historia lineal.

Tras el merge SHALL recomendar borrar la rama (remoto y local).

#### Scenario: Feature con muchos fixup

- GIVEN una rama con 14 commits, 5 `fixup!` y 3 `WIP`
- WHEN el agente recomienda
- THEN SHALL proponer squash merge

## Depende de

`commit-conventions` (tipos y breaking change alimentan cuerpo y labels).

## Referenciada por

`release-flow`, `estrategia-git` (índice).
