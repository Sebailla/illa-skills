# UI/UX Testing — CI/CD Integration Guide

How to integrate UI component tests into CI/CD pipelines.

---

## GitHub Actions

### Unit Tests (Vitest)

```yaml
# .github/workflows/test-ui.yml
name: UI Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  unit-tests:
    name: Vitest Unit Tests
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Vitest
        run: npm run test:unit -- --ci --reporters=junit --outputFile=test-results/vitest.xml
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: vitest-results
          path: test-results/
          retention-days: 30
      
      - name: Upload coverage
        uses: actions/upload-artifact@v4
        with:
          name: coverage
          path: coverage/
          retention-days: 14

  e2e-tests:
    name: Playwright E2E Tests
    runs-on: ubuntu-latest
    needs: unit-tests
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium
      
      - name: Run Playwright tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-results
          path: playwright-report/
          retention-days: 30
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: screenshots
          path: test-results/screenshots/
          retention-days: 7
```

### Accessibility Tests

```yaml
# Add to existing workflow after unit tests
  a11y-tests:
    name: Accessibility Audit
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install browsers
        run: npx playwright install --with-deps chromium
      
      - name: Run accessibility tests
        run: npm run test:a11y
      
      - name: Upload a11y report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: a11y-report
          path: accessibility-report/
          retention-days: 30
```

---

## GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test

ui:vitest:
  stage: test
  image: node:20-alpine
  before_script:
    - npm ci
  script:
    - npm run test:unit -- --ci --reporters=junit --outputFile=test-results/vitest.xml
  artifacts:
    reports:
      junit: test-results/vitest.xml
    paths:
      - coverage/
    expire_in: 14 days
  allow_failure: false

ui:playwright:
  stage: test
  image: node:20-alpine
  services:
    - docker:24-dind
  before_script:
    - npm ci
    - npx playwright install --with-deps chromium
  script:
    - npm run test:e2e
  artifacts:
    paths:
      - playwright-report/
      - test-results/
    expire_in: 30 days
  allow_failure: true  # E2E can be flaky

ui:a11y:
  stage: test
  image: node:20-alpine
  before_script:
    - npm ci
    - npx playwright install --with-deps chromium
  script:
    - npm run test:a11y
  artifacts:
    paths:
      - accessibility-report/
    expire_in: 30 days
  allow_failure: false
```

---

## CircleCI

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  vitest:
    docker:
      - image: cimg/node:20
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
      - run:
          name: Install dependencies
          command: npm ci
      - save_cache:
          key: v1-dependencies-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      - run:
          name: Run unit tests
          command: npm run test:unit -- --ci --reporters=junit --outputFile=test-results/vitest.xml
      - store_test_results:
          path: test-results

  playwright:
    docker:
      - image: cimg/node:20
    steps:
      - checkout
      - restore_cache:
          keys:
            - v1-dependencies-{{ checksum "package-lock.json" }}
      - run:
          name: Install dependencies
          command: npm ci
      - save_cache:
          key: v1-dependencies-{{ checksum "package-lock.json" }}
          paths:
            - node_modules
      - run:
          name: Install Playwright
          command: npx playwright install --with-deps chromium
      - run:
          name: Run E2E tests
          command: npm run test:e2e
      - store_artifacts:
          path: playwright-report

workflows:
  test-workflow:
    jobs:
      - vitest
      - playwright:
          requires:
            - vitest
```

---

## Jenkins (Pipeline)

```groovy
// Jenkinsfile
pipeline {
    agent any
    
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit -- --ci --reporters=junit --outputFile=test-results/vitest.xml'
            }
            post {
                always {
                    junit 'test-results/vitest.xml'
                    publishHTML target: [
                        allowMissing: false,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ]
                }
            }
        }
        
        stage('E2E Tests') {
            steps {
                sh 'npx playwright install --with-deps chromium'
                sh 'npm run test:e2e'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                    publishHTML target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Report'
                    ]
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
}
```

---

## Test Reports Configuration

### Vitest JUnit Reporter

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'test-results/vitest.xml'
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'coverage'
    }
  }
})
```

### Playwright HTML Reporter

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],
  metadata: {
    project: 'ui-ux-developer',
    version: '1.5.0'
  }
})
```

---

## Running Tests Locally

### All Tests

```bash
npm run test           # Run all tests
npm run test:unit       # Unit tests only
npm run test:e2e       # E2E tests only
npm run test:a11y       # Accessibility tests only
```

### Watch Mode

```bash
npm run test:unit -- --watch
npm run test:e2e -- --ui  # Playwright UI mode
```

### Debug Mode

```bash
npm run test:unit -- --inspect-brk
npx playwright test --debug
```

---

## Coverage Requirements

| Metric | Minimum | Target |
|--------|---------|--------|
| Statements | 80% | 90% |
| Branches | 75% | 85% |
| Functions | 80% | 90% |
| Lines | 80% | 90% |

---

## Parallelization

### Vitest

```bash
# Run tests in parallel (auto-detect CPUs)
npm run test:unit -- --parallel

# Specify max workers
npm run test:unit -- --workers=4
```

### Playwright

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  // ...
})
```

---

**Version:** 1.6.1
**Last updated:** 2026-06-03 (v1.6.3)