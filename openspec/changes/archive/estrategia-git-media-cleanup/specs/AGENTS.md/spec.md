# Delta Spec: AGENTS.md — sección "Git Strategy"

**Tipo**: capacidad modificada (delta)
**Origen**: `estrategia-git-media-cleanup` — trim de la sección Git Strategy en `AGENTS.md`.
**Baseline**: `AGENTS.md` líneas 1058–1087.

> **Nota sobre el path**: la skill global `el-gentleman` vive en `~/.pi/agent/skills/user-profile/SKILL.md` y no contiene esta sección. La sección "Git Strategy" es propia del `AGENTS.md` del proyecto, contrato de persona que Pi/opencode carga en cada sesión. Este delta se aplica al archivo del proyecto, no a la skill global. Se eligió el dominio `AGENTS.md` por esa razón.

## MODIFIED Requirements

### Requirement: Regla "develop es la base" (L1081, regla 2 actual)

La regla SHALL permanecer textual. El agente SHALL verificar, antes de crear una rama, que `origin/develop` existe (`git ls-remote origin develop`); si no, SHALL bloquear y pedir al usuario que suba la rama primero.

(Previously: declaraba la política sin verificar la existencia real. La rama `develop` fue creada como housekeeping y está pusheada a `origin/develop`.)

#### Scenario: develop pusheada

- GIVEN `origin/develop` existente
- WHEN el agente crea feature branch
- THEN SHALL basarla en `develop` y SHALL NOT bloquear

#### Scenario: develop ausente

- GIVEN un repo sin `origin/develop`
- WHEN el agente intenta crear feature
- THEN SHALL bloquear y pedir al usuario crear y pushear `develop` primero

### Requirement: Trim de 6 a 5 reglas (L1078–1085)

Las cinco reglas que SHALL permanecer:

1. `main` es intocable: nunca se trabaja directamente en `main`.
2. `develop` es la base: todas las ramas derivan de `develop`.
3. Ramas cortas: crear, trabajar, mergear, borrar.
4. Conventional Commits: todo commit en formato convencional.
5. No AI Attribution: nunca añadir "Co-authored-by" ni trailers de IA.

La regla 6 actual ("Husky: local validations") SHALL eliminarse (este repo no usa Husky; el contenido se conserva en `git-tooling-integration` como opt-in).

(Previously: la sexta regla declaraba Husky sin que el repositorio tuviera `.husky/` instalado — compromiso falso.)

#### Scenario: Verificación de reglas

- GIVEN el agente que prepara un commit
- WHEN consulta Git Strategy en `AGENTS.md`
- THEN SHALL encontrar exactamente cinco reglas numeradas y SHALL NOT encontrar la regla "Husky"

### Requirement: Referencia a las cinco skills divididas

Tras la lista SHALL añadirse una línea:

> "Para detalle de políticas específicas, consultar las skills dedicadas: `commit-conventions`, `branch-naming`, `pr-template`, `release-flow`, `git-tooling-integration` (opt-in). Índice router en `estrategia-git`."

(Previously: no existía referencia a skills dedicadas; la duplicación residía en el monolítico.)

#### Scenario: Agente busca política de PR

- GIVEN el agente que debe redactar un PR
- WHEN consulta `AGENTS.md`
- THEN SHALL encontrar el puntero a `pr-template` y SHALL cargarla

### Requirement: Diagrama de ramas preservado (L1060–1066)

Diagrama ASCII `main ← develop ← feat/* | fix/* | docs/*` SHALL permanecer textual. SHALL NOT expandirse para incluir `release/*` ni `hotfix/*` (se describen en `release-flow`).

(Previously: correcto pero duplicado con el monolítico; tras la reducción del índice queda como única representación canónica.)

## REMOVED Requirements

### Requirement: Bloque de código "Commits" (L1068–1076)

**Razón**: el snippet `git commit -m "<type>(<scope>): <description>"` y la lista de tipos SHALL eliminarse. El contenido es el activation contract de `commit-conventions`; el `AGENTS.md` SHALL NO duplicar skills dedicadas. La regla transversal "Conventional Commits" SHALL ser el único recordatorio.

(Previously: copia casi literal de la sección "Commits Conventional" del monolítico.)

#### Scenario: Verificación de duplicación

- GIVEN `AGENTS.md` tras el trim
- WHEN el agente busca sintaxis exacta de commit
- THEN SHALL cargar `commit-conventions` y SHALL NOT encontrarla inline

## ADDED Requirements

### Requirement: Pie de sección con marca de versión

La sección SHALL terminar con:

> *v3.0 — alineado con la división de `estrategia-git` en cinco skills dedicadas.*

(Previously: sin marca de versión.)

#### Scenario: Trazabilidad

- GIVEN un revisor del historial de `AGENTS.md`
- WHEN consulta la sección Git Strategy
- THEN SHALL poder atribuir el trim a este change y a la versión 3.0
