---
name: branch-naming
description: "Trigger: crear rama, renombrar rama, validar nombre de branch, prefijo de tipo, kebab-case, pre-push validation. Cargar cuando el agente deba crear, renombrar o sugerir un nombre de rama."
license: MIT
metadata:
  author: Sebastian Illa
  version: "1.0"
---

# branch-naming

Skill LLM-first que define prefijos de tipo, forma canónica, regex de validación pre-push para nombres de rama.

## Activation Contract

Cargar cuando el agente deba crear, renombrar o validar una rama, o sugerir un nombre. No cargar para listado, merge, rebase, o tareas sin naming.

## Prefijos por tipo

Uno y solo uno de: `feat/`, `fix/`, `docs/`, `refactor/`, `perf/`, `test/`, `build/`, `ci/`, `chore/`, `revert/`, `hotfix/`.

| Prefijo     | Uso                                                |
|-------------|----------------------------------------------------|
| `feat/`     | Nueva funcionalidad visible.                       |
| `fix/`      | Corrección de bug.                                 |
| `docs/`     | Solo documentación.                                |
| `refactor/` | Cambio interno sin alterar comportamiento.         |
| `perf/`     | Mejora de rendimiento.                             |
| `test/`     | Tests.                                             |
| `build/`    | Build o deps externas.                             |
| `ci/`       | CI/CD.                                             |
| `chore/`    | Mantenimiento, deps, configuración.                |
| `revert/`   | Reversión.                                         |
| `hotfix/`   | Fix urgente en producción.                         |

## Forma canónica

`<tipo>/<slug-en-kebab-case>`. Slug: solo `[a-z0-9-]`, 3-60 caracteres, sin espacios ni mayúsculas.

## Excepciones

Sin prefijo solo para: `main`, `master`, `develop`, `release/*`, `sdd/<change-id>`.

## Validación

```
^(feat|fix|hotfix|docs|refactor|perf|test|build|ci|chore|revert)/[a-z0-9-]+$
```

`main`, `master` y `develop` NO se pushean directamente — solo vía PR.
