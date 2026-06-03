# AI Integrator Bangla Lab

AI Integrator Bangla Lab is a public GitHub Pages learning application for Bengali speaking learners who want to become practical AI Integrators. The first version is a static browser based foundation that introduces the learning path, practice areas, portfolio preparation, readiness checks, and future resource sections.

## Who It Is For

This project is designed for:

- Bengali speaking learners moving from video watching to hands on practice.
- Students and career changers exploring AI integration work.
- Freelancers who need structured practice before preparing public portfolio projects.
- Educators who want a simple public learning hub for guided exercises.

## Core Purpose

Many organisations do not need to build brand new AI models. They need help connecting AI capability with existing websites, files, customer messages, policies, product lists, and work processes. This lab helps learners understand that AI Integrator role through guided practice, prompt planning, small projects, and portfolio preparation.

## Planned Features

The initial foundation includes polished Home content and placeholder sections for the wider learning lab. Planned future features include:

- Step by step AI Integrator roadmap.
- Practice brief generator for realistic business scenarios.
- Prompt builder with structured fields.
- Portfolio project planner and README guidance.
- Readiness checklist using browser local storage.
- Curated resource library for safe public learning materials.
- Separate professional English output areas for GitHub, freelancing profiles, and client proposals.

## Technology Stack

- Vite
- React
- Plain CSS
- Static HTML, CSS, and JavaScript
- GitHub Pages hosting

No backend, database, login system, payment system, file upload flow, API key, or AI API integration is included in this version.

## Local Development

Install dependencies and run the Vite development server:

```bash
npm install
npm run dev
```

Build the production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment Approach

The Vite base path is configured for the repository URL:

```text
https://haquenam.github.io/ai-integrator-bangla-lab/
```

The deployment ready output is generated in the `dist` directory by running:

```bash
npm run build
```

A future GitHub Actions workflow can publish the `dist` directory to GitHub Pages. The important setting for this repository is the Vite `base` value:

```js
base: '/ai-integrator-bangla-lab/'
```

## Privacy And Safety Principles

- No learner login is required.
- No backend stores learner data.
- No database is used.
- No file uploads are accepted.
- No API keys or external secrets are needed.
- Future learner progress should only use browser local storage for simple optional progress tracking.
- Public learning content must not include confidential client information, restricted documents, private project records, credentials, or commercially sensitive material.

## Licence

This repository includes a licence file. See [`LICENSE`](./LICENSE) for the current licence terms.
