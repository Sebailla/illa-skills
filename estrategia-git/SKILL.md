---
name: estrategia-git
description: >
  Estrategia Git completa para proyectos con Pi.
  Incluye: Conventional Commits, Husky hooks, GGA code review, git-c automation, GitHub Actions.
  Trigger: Cuando necesitas crear ramas, hacer commits, abrir PRs, o gestionar releases.
license: MIT
metadata:
  author: Sebastian Illa
  version: "2.0"
---

# Git Strategy Skill v2.0

Estrategia Git completa para proyectos desarrollados con Pi.
Integración de: Husky, GGA, git-c, GitHub Actions.

## Resumen de la Estrategia

```
main (producción) ←── PRs solo desde develop
        ↑
        └── develop (integración) ←── PRs desde feat/*, fix/*, docs/*, etc.
```

### Reglas Fundamentales

1. **main es intocable**: Nunca trabajar directamente en main. Solo recibe merges desde develop.
2. **develop es la base**: Todas las ramas de tarea salen de develop.
3. **Ramas cortas**: Crear, trabajar y mergear. No mantener ramas vivas por mucho tiempo.
4. **Conventional Commits**: Todos los commits en formato convencional.
5. **No AI Attribution**: No agregar "Co-authored-by" ni trailers de IA.
6. **Validación local**: Husky valida commits y nombres de rama antes de push.
7. **Code review automático**: GGA revisa cambios antes de commit.

---

## Herramientas Incluidas

| Herramienta | Propósito | Ubicación |
|-------------|-----------|-----------|
| `husky` | Git hooks (commit-msg, pre-push, pre-commit) | `.husky/` |
| `commitlint` | Validar Conventional Commits | `commitlint.config.js` |
| `git-c` | Automatización de commits | `git-c` |
| `gga` | Code review automático | `.gga` |
| `github actions` | CI/CD | `.github/workflows/` |

---

## Resumen de la Estrategia

```
main (producción) ←── PRs solo desde develop
        ↑
        └── develop (integración) ←── PRs desde feature/*, fix/*, docs/*, etc.
```

### Reglas Fundamentales

1. **main es intocable**: Nunca trabajar directamente en main. Solo recibe merges desde develop.
2. **develop es la base**: Todas las ramas de tarea salen de develop.
3. **Ramas cortas**: Crear, trabajar y mergear. No mantener ramas vivas por mucho tiempo.
4. **Conventional Commits**: Todos los commits en formato convencional.
5. **No AI Attribution**: No agregar "Co-authored-by" ni trailers de IA.

---

## Workflow Completo

### 1. Sincronizar develop

Antes de crear cualquier rama nueva, sincronizá con lo último:

```bash
git checkout develop && git pull origin develop
```

### 2. Crear Rama de Tarea

Desde `develop`, crear una rama con el formato:

```bash
git checkout -b <tipo>/<nombre-tarea>
```

#### Tipos de Rama

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feat/` | Nueva funcionalidad | `feat/auth-google-login` |
| `fix/` | Corrección de bug | `fix/posts-not-loading` |
| `docs/` | Documentación | `docs/api-endpoints` |
| `chore/` | Mantenimiento, deps | `chore/upgrade-prisma` |
| `refactor/` | Refactorización | `refactor/user-service` |
| `perf/` | Optimización | `perf/database-queries` |
| `test/` | Tests | `test/auth-middleware` |
| `build/` | Build/CI/CD | `build/docker-setup` |
| `ci/` | CI/CD config | `ci/github-actions` |
| `revert/` | Revertir cambios | `revert/broken-commit` |

#### Ejemplos de Nombres

```bash
# Bueno ✅
feat/atlas-entries-creation
fix/library-visibility-bug
docs/setup-guide-update
chore/add-docker-healthcheck

# Mal ❌
nueva-funcion
fix-bug
trabajo
feature
```

### 3. Implementar

Trabajar siguiendo:
- Modular Vertical Slicing
- Especificaciones del SDD
- Clean Code principles
- Tests donde existan

### 4. Commits Conventional

```bash
# Formato
git commit -m "<tipo>(<alcance>): <descripción>"

# Ejemplos
git commit -m "feat(atlas): add GBIF autocomplete for scientific name"
git commit -m "fix(auth): resolve token refresh race condition"
git commit -m "docs(readme): update installation instructions"
git commit -m "chore(deps): upgrade NestJS to 11.0.1"
git commit -m "refactor(api): extract validation to shared service"
git commit -m "test(library): add visibility permission tests"
git commit -m "perf(db): add index on atlas discipline field"
```

#### Reglas del Commit Message

- **Tipo**: minúsculas, sin espacios
- **Alcance**: opcional, en español para dominio, inglés para código
- **Descripción**: imperativo, presente, max 72 caracteres
- **No punto final**
- **Primera palabra del tipo en minúsculas**

#### Tipos Permitidos

| Tipo | Descripción | Cuándo usar |
|------|-------------|-------------|
| `feat` | Nueva funcionalidad | Feature completa |
| `fix` | Bug fix | Corrección de error |
| `docs` | Documentación | README, comments, guides |
| `style` | Formateo | Prettier, indentación |
| `refactor` | Refactor | Sin cambio de funcionalidad |
| `perf` | Performance | Optimización |
| `test` | Tests | unit, e2e, integration |
| `build` | Build | Build system, Docker |
| `ci` | CI/CD | GitHub Actions, etc. |
| `chore` | Mantenimiento | Deps, configs |
| `revert` | Revert | Revertir commit anterior |

#### Breaking Changes

```bash
# Con breaking change
git commit -m "feat(api)!: change auth token format"
git commit -m "fix(db)!: rename userId to id"
```

### 5. Push y Sincronización

```bash
# Push inicial de la rama
git push -u origin <rama>

# Updates posteriores
git push
```

### 6. Abrir Pull Request

```bash
# Usando gh CLI
gh pr create --base develop --title "feat: <descripción>" --body "
## Descripción
<explicación>

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change

## Checklist
- [ ] Tests agregados/actualizados
- [ ] Docs actualizadas si aplica
- [ ] CHANGELOG.md actualizado

Closes #<issue>
"
```

### 7. Code Review

Esperar review. Revisar:
- Consistencia con arquitectura
- Tests pasando
- Sinconsole.log o debug code
- Documentación actualizada

### 8. Merge a develop

Una vez aprobado:
- Squash merge recomendado para feature branches
- Delete branch después de merge

---

## Release Flow (develop → main)

###触发条件

Solo merge a main cuando:
- Feature completo o milestone alcanzado
- Tests pasando
- Documentación actualizada
- CHANGELOG.md actualizado

### Pasos

```bash
# 1. Asegurarse que develop está sincronizado
git checkout develop && git pull

# 2. Verificar tests
bun test

# 3. Actualizar CHANGELOG.md si no se hizo
# (opcional si se mantiene al día)

# 4. Crear PR de develop a main
gh pr create --base main --title "Release vX.Y.Z" --body "
## Release vX.Y.Z

### Cambios
<resumen de cambios>

### Checklist
- [ ] Tests pasando
- [ ] Docs actualizada
- [ ] CHANGELOG.md actualizado
"

# 5. Una vez mergeado, crear tag
git checkout main && git pull
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

---

## Herramientas de Automatización

### 1. Git Hooks (Husky)

Husky ejecuta validaciones locales antes de cada acción Git.

#### Archivos de Configuración

| Hook | Archivo | Propósito |
|------|---------|-----------|
| `commit-msg` | `.husky/commit-msg` | Valida formato de commit |
| `pre-commit` | `.husky/pre-commit` | Lint-staged + GGA review |
| `pre-push` | `.husky/pre-push` | Valida nombre de rama |

#### commit-msg (Validación de Commits)

```bash
#!/usr/bin/env bash
npx commitlint --edit "$1"
```

#### pre-push (Validación de Ramas)

```bash
#!/usr/bin/env bash
LOCAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
VALID_REGEX="^(feat|fix|hotfix|patch|chore|docs|refactor|test|perf|ci)/[a-z0-9-]+$"

# main/master = prohibido
if [[ "$LOCAL_BRANCH" == "main" || "$LOCAL_BRANCH" == "master" ]]; then
    echo "No podés pushear directo a main."
    exit 1
fi

# develop o tipo/nombre = OK
if [[ "$LOCAL_BRANCH" != "develop" ]] && [[ ! $LOCAL_BRANCH =~ $VALID_REGEX ]]; then
    echo "Rama inválida. Usá: tipo/nombre-en-kebab-case"
    exit 1
fi
```

### 2. commitlint.config.js

```javascript
module.exports = { extends: ['@commitlint/config-conventional'] };
```

### 3. Script git-c (Automatización)

Script personalizado que automatiza el workflow completo:

```bash
# Uso
git c "agrego login con JWT"
# Genera: feat/agrego-login-con-jwt

git c "fix: bug en logout"
# Genera: fix/bug-en-logout

# Qué hace:
# 1. Verifica que estés en develop
# 2. Detecta el tipo de cambio (feat/fix/docs/chore/etc)
# 3. Genera nombre de rama con slugify
# 4. Verifica que la rama no exista
# 5. Corre los tests
# 6. Corre GGA (si está instalado)
# 7. Crea la rama y hace commit
```

#### Contenido del script `git-c`

```bash
#!/usr/bin/env bash
set -e
# ... (script completo en el proyecto)
```

### 4. GGA (Gentleman Guardian Angel)

Code review automático con IA antes de cada commit.

#### Configuración (.gga)

```ini
# AI Provider (claude, gemini, codex, opencode, ollama, etc.)
PROVIDER="claude"

# Archivos a revisar
FILE_PATTERNS="*.ts,*.tsx,*.js,*.jsx"

# Archivos excluidos
EXCLUDE_PATTERNS="*.test.ts,*.spec.ts,*.d.ts,dist/**,node_modules/**"

# Archivo con reglas de revisión
RULES_FILE="AGENTS.md"

# Modo estricto
STRICT_MODE="true"

# Timeout en segundos
TIMEOUT="300"
```

### 5. GitHub Actions (CI/CD)

Workflow automático para lint, type check y tests.

#### Triggers

```yaml
on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]
```

#### Jobs

| Job | Descripción | Servicios |
|-----|-------------|-----------|
| `lint` | Lint + Type Check | - |
| `test-api` | Tests API | PostgreSQL 16, Redis 7 |
| `test-web` | Tests Web | - |

#### Ejemplo de Workflow

```yaml
name: CI/CD

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run lint -w api
      - run: bun run lint -w web

  test-api:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: neomycelio
          POSTGRES_PASSWORD: test_pass
      redis:
        image: redis:7-alpine
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run --filter api prisma generate
      - run: bun run --filter api test
```

---

## Comandos Útiles

### Estado del Repositorio

```bash
# Ver estado actual
git status

# Ver diferencias
git diff
git diff --staged

# Ver commits recientes
git log --oneline -10
git log --oneline --graph --all
```

### Manejo de Ramas

```bash
# Ver ramas locales
git branch

# Ver ramas remotas
git branch -r

# Ver todas las ramas
git branch -a

# Eliminar rama local
git branch -d <rama>

# Eliminar rama remota
git push origin --delete <rama>

# Renombrar rama actual
git branch -m <nuevo-nombre>
```

### Sincronización

```bash
# Traer cambios de origin
git fetch

# Pull con rebase
git pull --rebase origin develop

# Fetch + prune ramas eliminadas
git fetch --prune
```

### Stashing

```bash
# Guardar cambios temporalmente
git stash save "trabajo en progreso"

# Listar stashes
git stash list

# Recuperar stash más reciente
git stash pop

# Recuperar stash específico
git stash apply stash@{n}
```

### Deshacer Cambios

```bash
# Descartar cambios en archivo
git checkout -- <archivo>
git restore <archivo>

# Deshacer último commit (mantiene cambios)
git reset --soft HEAD~1

# Deshacer último commit (descarta cambios)
git reset --hard HEAD~1

# Revertir commit específico
git revert <commit-sha>
```

---

## Escenarios Comunes

### Scenario: Continuar trabajo en branch existente

```bash
git checkout feat/mi-feature
git pull origin develop  # Traer cambios de develop si hay
# Trabajar...
git commit -m "feat: agregar funcionalidad"
git push
```

### Scenario: Abortar PR y continuar en branch

```bash
# Trabajar en branch
git commit -m "fix: corregir problema"
git push --force  # Solo si no hay PR mergeado aún

# Cerrar PR en GitHub manualmente
```

### Scenario: Rebase con develop

```bash
git checkout feat/mi-feature
git fetch origin
git rebase origin/develop
# Resolver conflictos si hay
git push --force-with-lease
```

### Scenario: Cherry-pick commit

```bash
git checkout feat/mi-feature
git cherry-pick <commit-sha>
git push
```

---

## Integración con Pi/Agent

Cuando uses Pi para trabajar en cualquier proyecto:

1. **Inicio de sesión**: Pi debe hacer `git checkout develop && git pull` antes de empezar
2. **Creación automática**: Pi crea branch con formato correcto al detectar nueva tarea
3. **Commits**: Pi usa Conventional Commits
4. **Opcional: git-c**: Si el script `git-c` está disponible, Pi puede usarlo para automatizar
5. **Code review con GGA**: Pi ejecuta `gga run` si está configurado
6. **Antes de finalizar**: Pi hace `gh pr create` o reporta qué falta
7. **PRs a main**: Solo desde develop, nunca desde feature branches

### Uso de git-c con Pi

```bash
# Pi puede usar git-c para automatizar:
# 1. git c "feat: agregar nueva funcionalidad"
# 2. git c "fix: corregir bug"
# 3. git c "docs: actualizar docs"

# El script:
# - Verifica que esté en develop
# - Detecta el tipo de cambio
# - Genera nombre de rama
# - Corre tests
# - Corre GGA review
# - Crea rama y commit
```

---

## Archivos que NO se versionan

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Build
.next/
out/
dist/
build/

# Environment
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/

# Prisma
apps/api/prisma/*.db
apps/api/prisma/*.db-journal

# Uploads
uploads/
```

---

## Notas Finales

1. **Commits atómicos**: Un commit = un cambio lógico
2. **Mensajes descriptivos**: Otros deben entender el commit sin ver el diff
3. **Ramas cortas**: Mergear rápido reduce conflictos
4. **Review temprano**: Abrir PR aunque no esté 100% listo (draft PR)
5. **Tags semánticos**: Usar versionado semántico (v1.0.0)

---

*Skill creado: 2026-05-31*
*Para: Proyectos con Pi*