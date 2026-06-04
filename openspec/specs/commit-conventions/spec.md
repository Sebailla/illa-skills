# Spec: commit-conventions

**Tipo**: capacidad nueva (spec completo)
**Origen**: `estrategia-git-media-cleanup` — extracción de la sección "Commits Conventional" del skill monolítico.
**Aplica a**: cualquier repositorio que adopte Conventional Commits.

---

## Propósito

Skill LLM-first que define el formato, tipos, scope y breaking changes de los mensajes de commit. Cubre el QUÉ; el diseño técnico describe la estructura de la skill.

## Activation Contract

Cargar cuando el agente deba redactar, validar o explicar mensajes de commit. No cargar para `git status/log/diff`, resolución de conflictos, o trabajo sin commit.

## Requirements

### Requirement: Formato del mensaje

El mensaje SHALL seguir `<tipo>(<alcance>): <descripción>`. `<tipo>` SHALL estar en la tabla de tipos. `<alcance>` SHOULD indicar el módulo y MAY omitirse. `<descripción>` SHALL estar en imperativo presente, sin punto final, ≤72 caracteres.

#### Scenario: Commit válido con tipo, alcance y descripción

- GIVEN un cambio en `auth` que añade Google login
- WHEN el agente redacta el mensaje
- THEN SHALL emitir `feat(auth): add Google login provider` con ≤72 caracteres

#### Scenario: Commit sin alcance

- GIVEN un cambio de docs global
- WHEN el agente redacta
- THEN SHALL emitir `docs: update installation steps` (sin paréntesis vacíos)

### Requirement: Tipos permitidos

El agente SHALL usar solo: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

#### Scenario: Tipo fuera de la tabla

- GIVEN un cambio de reorganización interna
- WHEN el agente selecciona el tipo
- THEN SHALL emitir `refactor: ...` y SHALL NOT emitir `restructure`, `cleanup`, `misc`

### Requirement: Breaking changes

El agente SHALL marcar un breaking change con `!` antes de los dos puntos (`feat(api)!: change token format`) o con pie `BREAKING CHANGE: <desc>`. SHALL NOT combinar ambos.

#### Scenario: Breaking change con `!`

- GIVEN un cambio incompatible de contrato
- WHEN el agente redacta
- THEN SHALL usar `feat(api)!: change auth token format` y SHALL NOT añadir pie `BREAKING CHANGE:`

### Requirement: Cuerpo y pie

El cuerpo SHOULD incluirse si la justificación no es evidente. SHALL envolverse a 72 caracteres. El pie SHALL usarse para `Closes #<n>`, `Refs #<n>` o tokens especiales.

#### Scenario: Commit con referencia a issue

- GIVEN un cambio que cierra el issue #42
- WHEN el agente redacta
- THEN SHOULD añadir pie `Closes #42` en línea separada

### Requirement: Atomicidad

El agente SHALL producir un commit por cambio lógico y redactar la descripción de modo que otro ingeniero entienda el cambio sin ver el diff.

#### Scenario: Commit que mezcla fix y refactor

- GIVEN un cambio que corrige un bug y refactoriza código cercano
- WHEN el agente evalúa la atomicidad
- THEN SHALL dividir en dos commits separados (uno `fix`, otro `refactor`)

## Depende de

Ninguna.

## Referenciada por

`branch-naming`, `pr-template`, `release-flow`, `estrategia-git` (índice).
