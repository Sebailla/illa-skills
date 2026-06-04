---
name: git-tooling-integration
description: "Trigger (opt-in): configurar Husky, GGA, git-c, GitHub Actions. Stack-agnostic template. NO se usa en este repo. Cargar solo cuando el usuario pide explícitamente setup de tooling en un proyecto de aplicación."
license: MIT
metadata:
  author: Sebastian Illa
  version: "1.0"
---

# git-tooling-integration

> **Banner obligatorio**: Plantilla para proyectos que adopten esta cadena (Husky, commitlint, GGA, git-c, GitHub Actions). Este repositorio (`illa-skills`) NO la usa. No aplicar las plantillas aquí; son contenido de referencia para trasladar a otros proyectos.

Skill LLM-first, **opt-in**, stack-agnostic, con plantillas de configuración para integrar automatización git en proyectos Node, Python o Go.

## Activation Contract

Cargar cuando el agente deba inicializar hooks, configurar validación de Conventional Commits, integrar GGA o un revisor automático, o plantear un workflow de CI. No cargar en `illa-skills` ni en proyectos con hooks estables. No cargar para tareas sin tooling.

## Árbol de decisión

Aplicar esta skill solo si se cumplen todas:

- El proyecto tiene código de aplicación (no es solo skills/docs).
- El equipo ha adoptado Conventional Commits.
- Existe al menos un runner de tests y un linter.
- El usuario ha confirmado explícitamente.

## Plantillas por stack

| Stack    | Plantilla                                                   |
|----------|-------------------------------------------------------------|
| Node     | Husky + commitlint + lint-staged.                          |
| Python   | pre-commit + commitlint (wrapper Node) o script Python.     |
| Go       | lefthook + golangci-lint en pre-commit.                    |

Seleccionar la plantilla que matchee el stack del proyecto. NO mezclar stacks.

## GGA — opcional

Si el proyecto ya usa GGA, añadir `gga run` al hook `pre-commit` o `pre-push`. NO modificar `.gga` si existe. Si GGA no está, NO proponer instalarlo como dependencia implícita.

## CI con GitHub Actions (plantilla)

Workflow base con tres jobs mínimos: `lint`, `test`, `build`. Servicios externos como placeholders parametrizados; NO credenciales hardcodeadas.

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: <linter-command>
  test:
    runs-on: ubuntu-latest
    services:
      db:
        image: <db-image>:<version>
        env:
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
    steps:
      - uses: actions/checkout@v4
      - run: <test-command>
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: <build-command>
```

## Script git-c (opcional)

Detecta tipo, slugifica, valida nombre, crea rama y commit. Único archivo ejecutable en la raíz, sin dependencias más allá de `git` y `bash`.

```bash
git c "fix: bug de logout"
```

## Restricción de aplicación

Esta skill NO se carga automáticamente. Requiere mención explícita o detección de proyecto de aplicación real. La descripción en el frontmatter contiene "opt-in" para evitar triggers accidentales.

## Referencia

Spec canónica: `openspec/specs/git-tooling-integration/spec.md`
