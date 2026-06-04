# Spec: git-tooling-integration

**Tipo**: capacidad nueva (spec completo, meta-skill opt-in)
**Origen**: `estrategia-git-media-cleanup` — extracción de "Herramientas de Automatización" del monolítico.

> **BANNER OBLIGATORIO** (debe aparecer al inicio de la skill):
>
> "Plantilla para proyectos que adopten esta cadena (Husky, commitlint, GGA, git-c, GitHub Actions). Este repositorio (`illa-skills`) NO la usa. No aplicar las plantillas aquí; son contenido de referencia para trasladar a otros proyectos."

---

## Propósito

Skill LLM-first, opt-in, stack-agnostic, con plantillas de configuración para integrar automatización git en proyectos Node, Python o Go. Cubre el QUÉ; el diseño técnico describe los snippets.

## Activation Contract

Cargar cuando el agente deba inicializar hooks, configurar validación de Conventional Commits, integrar GGA o un revisor automático, o plantear un workflow de CI. No cargar en `illa-skills` ni en proyectos con hooks estables. No cargar para tareas sin tooling.

## Requirements

### Requirement: Árbol de decisión

El agente SHALL aplicar esta skill solo si se cumplen todas:
- El proyecto tiene código de aplicación (no es solo skills/docs).
- El equipo ha adoptado Conventional Commits.
- Existe al menos un runner de tests y un linter.
- El usuario ha confirmado explícitamente.

#### Scenario: Aplicación indebida en repo de solo docs

- GIVEN un repo de solo skills/docs
- WHEN el agente considera cargar
- THEN SHALL NO cargarla y SHALL NOT proponer hooks ni workflows

### Requirement: Plantillas por stack

| Stack    | Plantilla                                                   |
|----------|-------------------------------------------------------------|
| Node     | Husky + commitlint + lint-staged.                          |
| Python   | pre-commit + commitlint (wrapper Node) o script Python.     |
| Go       | lefthook + golangci-lint en pre-commit.                    |

#### Scenario: Stack Node

- GIVEN un proyecto con `package.json`
- WHEN el agente selecciona
- THEN SHALL proponer Husky + commitlint y SHALL NOT proponer lefthook ni pre-commit

### Requirement: GGA — opcional

Si el proyecto ya usa GGA, SHOULD añadir `gga run` al hook `pre-commit` o `pre-push` y SHALL NO modificar `.gga` si existe. Si GGA no está, SHALL NO proponer instalarlo como dependencia implícita.

#### Scenario: GGA ya configurado

- GIVEN un proyecto con `.gga`
- WHEN el agente integra el hook
- THEN SHALL añadir `gga run` sin tocar `.gga`

### Requirement: CI con GitHub Actions (plantilla)

Workflow base con tres jobs mínimos: `lint`, `test`, `build`. Servicios externos SHALL aparecer como placeholders parametrizados; SHALL NOT tener credenciales hardcodeadas.

#### Scenario: Workflow con DB

- GIVEN un proyecto con tests que requieren DB
- WHEN el agente genera YAML
- THEN SHALL parametrizar usuario, contraseña y versión de la imagen

### Requirement: Script git-c (opcional)

MAY proponer `git-c`: detecta tipo, slugifica, valida nombre, crea rama y commit. SHALL ser un único archivo ejecutable en la raíz, sin dependencias más allá de `git` y `bash`.

#### Scenario: Uso por el agente

- GIVEN "haz commit de esto como fix del bug de logout"
- WHEN el agente usa git-c
- THEN SHALL ejecutar `git c "fix: bug de logout"` y SHALL validar el resultado

## Depende de

Ninguna. Skill independiente y opt-in.

## Referenciada por

`commit-conventions`, `branch-naming`, `estrategia-git` (índice, marcada como opt-in).

## Restricción de aplicación

La skill SHALL NO cargarse automáticamente. SHALL requerir mención explícita o detección de proyecto de aplicación real. La frase en el frontmatter SHALL contener "opt-in" para evitar triggers accidentales.
