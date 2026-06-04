# Delta Spec: estrategia-git

**Tipo**: capacidad modificada (delta)
**Origen**: `estrategia-git-media-cleanup` — reducción del monolítico a índice router.
**Baseline**: `estrategia-git/SKILL.md` actual, 632 líneas, versión 2.0.

---

## REMOVED Requirements

### Requirement: Secciones "Workflow Completo", "Release Flow", "Herramientas de Automatización", "Comandos Útiles", "Escenarios Comunes", "Integración con Pi/Agent", "Archivos que NO se versionan", tabla de "Herramientas Incluidas"

**Razón consolidada**: el contenido se redistribuye en cinco skills dedicadas (`commit-conventions`, `branch-naming`, `pr-template`, `release-flow`, `git-tooling-integration`). El índice router SHALL delegar y SHALL NOT duplicar.

## MODIFIED Requirements

### Requirement: Frontmatter `description`

El campo SHALL ser una sola línea física, entre comillas, YAML-safe, ≤250 caracteres, con triggers discriminantes. Contenido:

> "Trigger: git strategy, branching model, commit policy, PR workflow, release flow. Router skill — apunta a `commit-conventions`, `branch-naming`, `pr-template`, `release-flow` y `git-tooling-integration`. Cargar cuando no sepas qué skill de git aplica."

(Previously: descripción multi-línea de ~280 caracteres listando Husky, GGA, git-c y GitHub Actions; ya no aplica a este repositorio.)

#### Scenario: Triggers no solapados

- GIVEN "escribe un commit de fix"
- WHEN el router evalúa
- THEN SHALL preferir `commit-conventions` y SHALL NOT cargar `estrategia-git` por colisión trivial de la palabra "commit"

### Requirement: Cuerpo del skill

Estructura SHALL ser, en orden:
1. **Tabla de decisión** (≤8 filas): tarea → skill.
2. **Diagrama de ramas** ASCII (≤6 líneas): `main ← develop ← feat/*`.
3. **Reglas universales** (5 reglas, una línea cada una).
4. **Notas del repositorio** (≤6 bullets): ramas reales, ausencia de tooling, política.

Cuerpo SHALL NOT exceder 100 líneas. SHALL NOT incluir ejemplos de código extensos. SHALL NOT anidar subsecciones más allá de las 4.

(Previously: 632 líneas, 12 secciones H2, con scripts, tablas, ejemplos y referencias a infraestructura inexistente.)

#### Scenario: Tamaño del nuevo índice

- GIVEN el archivo reescrito
- WHEN el agente lo lee
- THEN SHALL encontrar ≤100 líneas, ≤450 tokens, description de una línea ≤250 caracteres

### Requirement: Tabla de decisión

| Necesitás                                       | Cargá                              |
|--------------------------------------------------|------------------------------------|
| Redactar un commit                              | `commit-conventions`               |
| Crear, renombrar o validar una rama             | `branch-naming`                    |
| Abrir, revisar o mergear un PR                  | `pr-template`                      |
| Calcular versión, crear tag, preparar release   | `release-flow`                     |
| Configurar Husky, GGA, git-c o GitHub Actions   | `git-tooling-integration` (opt-in) |

(Previously: flujo narrativo lineal sin tabla; workflows mezclados con ejemplos, comandos y referencias de stack.)

#### Scenario: Consulta al índice

- GIVEN el agente que debe calcular versión
- WHEN evalúa la tabla
- THEN SHALL cargar `release-flow` y SHALL NOT intentar resolver desde el índice

### Requirement: Reglas universales (cinco, inline)

1. `main` es intocable: solo recibe PRs.
2. Conventional Commits: todo commit en formato convencional.
3. No AI Attribution: nunca añadir "Co-authored-by" ni trailers de IA.
4. Ramas cortas: crear, trabajar, mergear, borrar.
5. Referencia: ver la sección "Git Strategy" del `AGENTS.md` del proyecto.

(Previously: 7 reglas, dos de las cuales — Husky y GGA — no aplicaban a este repositorio.)

#### Scenario: Verificación de regla transversal

- GIVEN el agente que redacta un commit
- WHEN consulta "No AI Attribution"
- THEN SHALL encontrar la regla en el índice sin cargar otra skill

## ADDED Requirements

### Requirement: Versión bumped a 3.0

`metadata.version` SHALL ser `"3.0"` para señalar el corte estructural.

(Previously: `"2.0"`.)

### Requirement: Banner de verdad sobre el repositorio

El índice SHALL contener un párrafo inicial declarando que las cinco reglas y las cinco skills dedicadas son la política vigente para `illa-skills`, y que el contenido de toolchain del monolítico original era aspiracional y se conserva solo en `git-tooling-integration` como plantilla opt-in.
