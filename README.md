# QA-technical-tasks

🤌 Hi there,

Skeleton and body implementation of basic user journey using WebdriverIO + Jasmine + TypeScript + TSLINT + Spec Reporting.

Extra implementation but not used Axios + Appium (android) 

<img width="600" alt="xyz" src="https://www.monkeyuser.com/assets/images/2022/248-unit-tests.png" class="center">

### Table of Contents

- [Getting Started](#getting-started)
- [Testing Framework](#testing-framework)
- [Local Setup](#local-setup)
- [Running E2E tests](#running-e2e-tests-locally)
- [Task Checklist](#What-might-be-required-for-Setting-up-Appium-and-Appium-Inspector)
---

# Getting Started

The tests cases are coded in `Typescript` and project has the following files and folders defined which should enable any QA/dev to start writing tests right away.
In:
- `objects` - Consists of `Base` class which has [wrappers](https://github.com/MRaufQureshi/QA-technical-tasks/tree/main/test/objects) of webdriver
- `config` - Consists of Browser [capabilities](https://github.com/MRaufQureshi/QA-technical-tasks/blob/main/test/src/_config/config.ts).
- `api` - Basic example of using Axios [api](https://github.com/MRaufQureshi/QA-technical-tasks/blob/main/test/src/api/example_Api.ts).
- `fixtures` - For login purposes [fixtures](https://github.com/MRaufQureshi/QA-technical-tasks/blob/main/test/src/fixtures/Fixture.ts).
- `pageobjects` - To maintain [page objects for web and native](https://github.com/MRaufQureshi/QA-technical-tasks/tree/main/test/src/pageobjects).
- `specs` - To code all [test cases for web and native](https://github.com/MRaufQureshi/QA-technical-tasks/tree/main/test/src/specs).
- `utils` - To code for native devices [test cases for web and native](https://github.com/MRaufQureshi/QA-technical-tasks/tree/main/test/src/utils).
- `data` - To set default values for user, url, api, ..etc [labels and titles](https://github.com/MRaufQureshi/QA-technical-tasks/blob/main/test/data.ts).

# Testing Framework

# Local Setup
Clone repo using git cli : `gh repo clone MRaufQureshi/QA-technical-tasks` or any other cloning process of your choosing.

To install the dependencies you're going need to authenticate your npm client.
In the terminal of your IDE or in terminal command line , install the package dependencies by executing the command `npm install` or `npm i`

# Running E2E tests locally
First, change the directory via: `$ cd path to the specs folder in this repo`.

Run `npm run test:web` or review `scripts` in [package.json](https://github.com/MRaufQureshi/QA-technical-tasks/blob/main/package.json) to execute test cases.

### WebdriverIO for Node.js
For detailed documentation of WebdriverIO and its related API references is [here](https://webdriver.io/docs/gettingstarted).
### Jasmine for TypeScript
For detailed documentation of [Jasmine](https://jasmine.github.io/).
### Axios for promise based HTTP client for the browser and node.js
For detailed documentation of [Axios](https://www.npmjs.com/package/axios)

