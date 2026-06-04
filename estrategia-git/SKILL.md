---
name: estrategia-git
description: "Trigger: git strategy, branching, commit policy, PR workflow, release flow. Router — apunta a commit-conventions, branch-naming, pr-template, release-flow, git-tooling-integration. Cargar cuando no sepas qué skill de git aplica."
license: MIT
metadata:
  author: Sebastian Illa
  version: "3.0"
---

# Estrategia Git — Índice Router

> **Política vigente para `illa-skills`**: las cinco reglas universales y las cinco skills dedicadas son la fuente de verdad. El contenido de toolchain del monolítico original era aspiracional y se conserva solo en `git-tooling-integration` como plantilla opt-in.

## Tabla de decisión

| Necesitás                                       | Cargá                              |
|--------------------------------------------------|------------------------------------|
| Redactar un commit                              | `commit-conventions`               |
| Crear, renombrar o validar una rama             | `branch-naming`                    |
| Abrir, revisar o mergear un PR                  | `pr-template`                      |
| Calcular versión, crear tag, preparar release   | `release-flow`                     |
| Configurar Husky, GGA, git-c o GitHub Actions   | `git-tooling-integration` (opt-in) |

## Modelo de ramas

```
main (producción) ←── develop (integración) ←── feat/*, fix/*, docs/*, chore/*
```

`main` solo recibe PRs desde `develop`. Toda rama de tarea se crea off `develop`.

## Reglas universales

1. **`main` es intocable**: solo recibe PRs desde `develop`.
2. **Conventional Commits**: todo commit en formato `<type>(<scope>): <description>`.
3. **No AI Attribution**: nunca añadir "Co-authored-by" ni trailers de IA en commits.
4. **Ramas cortas**: crear, trabajar, mergear, borrar. No mantener feature branches vivos.
5. **Referencia canónica**: ver la sección "Git Strategy" de `AGENTS.md` para el contexto completo del proyecto.

## Notas del repositorio

- Branching actual: `main` y `develop` (develop es la base obligatoria; main solo producción).
- Husky, GGA, git-c, GitHub Actions **NO** se usan en este repo — `git-tooling-integration` los cubre como plantilla opt-in.
- `CHANGELOG.md` presente desde PR1 del change `estrategia-git-media-cleanup`. Convención Keep a Changelog + SemVer.
- Las 5 skills divididas viven en `openspec/specs/` (no en la raíz de `skills/`).
- Conventional Commits validados manualmente (no hay hook configurado en este repo).
