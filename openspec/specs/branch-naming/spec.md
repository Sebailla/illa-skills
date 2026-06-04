# Spec: branch-naming

**Tipo**: capacidad nueva (spec completo)
**Origen**: `estrategia-git-media-cleanup` — extracción de "Crear Rama de Tarea" del monolítico.
**Aplica a**: cualquier repositorio con Conventional Commits.

---

## Propósito

Skill LLM-first que define prefijos de tipo, forma canónica, ejemplos válidos/inválidos y regex de validación pre-push. Cubre el QUÉ; el diseño técnico describe hooks y scripts.

## Activation Contract

Cargar cuando el agente deba crear, renombrar o validar una rama, o sugerir un nombre. No cargar para listado, merge, rebase, o tareas sin naming.

## Requirements

### Requirement: Prefijos por tipo

El agente SHALL usar exactamente uno de: `feat/`, `fix/`, `docs/`, `refactor/`, `perf/`, `test/`, `build/`, `ci/`, `chore/`, `revert/`, `hotfix/`.

| Prefijo     | Uso                                                |
|-------------|----------------------------------------------------|
| `feat/`     | Nueva funcionalidad visible.                       |
| `fix/`      | Corrección de bug.                                  |
| `docs/`     | Solo documentación.                                |
| `refactor/` | Cambio interno sin alterar comportamiento.        |
| `perf/`     | Mejora de rendimiento.                             |
| `test/`     | Tests.                                             |
| `build/`    | Build o dependencias externas.                     |
| `ci/`       | CI/CD.                                             |
| `chore/`    | Mantenimiento, deps, configuración.                |
| `revert/`   | Reversión.                                         |
| `hotfix/`   | Fix urgente en producción (corta el flujo develop).|

#### Scenario: Selección de prefijo

- GIVEN la tarea "agregar login con Google"
- WHEN el agente sugiere nombre
- THEN SHALL emitir `feat/google-login` y SHALL NOT emitir `feature/google-login` ni `feat-google-login`

### Requirement: Forma canónica

El nombre SHALL ser `<tipo>/<slug-en-kebab-case>`. El slug SHALL contener solo `[a-z0-9-]`, SHALL NOT tener espacios, mayúsculas ni no-ASCII. SHOULD tener entre 3 y 60 caracteres.

#### Scenario: Slug con caracteres inválidos

- GIVEN la tarea "Fix User Profile photo UPLOAD"
- WHEN el agente normaliza
- THEN SHALL emitir `fix/user-profile-photo-upload` (minúsculas, guiones)

### Requirement: Excepciones a la regla de prefijos

El agente SHALL permitir nombres sin prefijo solo para: `main`, `master`, `develop`, `release/*`, y ramas técnicas como `sdd/<change-id>` (flujo SDD). Otros SHALL cumplir la regla.

#### Scenario: Rama SDD sin prefijo convencional

- GIVEN el SDD change `estrategia-git-media-cleanup`
- WHEN el agente sugiere rama
- THEN SHALL emitir `sdd/estrategia-git-media-cleanup` sin anteponer `feat/`

### Requirement: Validación pre-push

El agente SHALL validar con la regex:

```
^(feat|fix|hotfix|docs|refactor|perf|test|build|ci|chore|revert)/[a-z0-9-]+$
```

`main`, `master` y `develop` SHALL NO ser pusheadas directamente; SHALL recibir merges solo vía PR.

#### Scenario: Nombre que pasa

- GIVEN `feat/auth-google-login`
- WHEN el agente valida
- THEN SHALL confirmar y proceder

#### Scenario: Nombre que falla

- GIVEN `nueva-funcion` (sin prefijo)
- WHEN el agente valida
- THEN SHALL rechazar y proponer `feat/nueva-funcion`

## Depende de

Ninguna.

## Referenciada por

`commit-conventions`, `release-flow`, `git-tooling-integration`, `estrategia-git` (índice).
