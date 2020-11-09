# Minerva - Intelligence V2

Welcome to Minerva!

This is Rackspace's Intelligence UI for the Monitoriing & Metrics platform.

Also see https://github.com/racker/hedwig

## Getting Started

1. Clone this repository
2. Install Angular-ClI
3. NPM install
4. Run the application

## Cloning The Repo

```
cd working_dir
git clone git@github.com:racker/Minerva.git
```

## Install Angular-CLI

```
npm install -g @angular/cli
```

## NPM Install

This  will install all the application and developer dependencies into the project's `node_modules` folders.

```
npm install
```

## Setup the proxy

In order to run the application locally you will need to add the following to your `/etc/hosts` file on Mac/Linux and `C:\Windows\System32\drivers\etc\hosts` file on Windows.

```
0.0.0.0 dev.i.rax.io
```

## Run The App

Running the application is quite simple, after install of all `node_modules` we execute the local server setup

```
npm run start:dev
```

When this command fires you will be prompted for which environment you'd like to target. This sets up the difference between targeting `staging.portal.rackspace.com` or `portal.rackspace.com` for the API proxy.

**Important to note that if you're targeting the staging you**

When prompted for `__Secure-portal_sessionId`this can be attained by following the link provided in the terminal or just navigating to the designated portal login.

* Open browser developer tools and navigate cookie storage: e.g. On Chrome it is under the "Application" tab

* Copy the cookie value for "__Secure-portal_sessionid" and paste into the terminal


Once complete navigate to `http://dev.i.rax.io:4200/intelligence`.

## Code scaffolding

Run `ng generate component <component-name>` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build


Run `npm run build`. it will run `makefile build-frontend` to execute `makefile` file. `makefile` is a file containing a set of directives used by a make build automation tool to generate specified goal.

`makefile` execute two commands `ng build --project='minerva'` & `ng build --project='admin'` and generates two different builds named `admin` & `minerva`. The build artifacts will be stored in the `dist/` directory. The `--project='minerva'` context actually tells which project we are going to build as it internally interacts with the `angular.json` and look for the project name specified inside `projects` object.

## Running unit tests

Run `npm run test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation
We are using [Compodoc](https://compodoc.app) to create app structural documentation. It compiles a set of html files based on the `tsconfig.json` file. To view these run `npm run docs` and the files will populate in a folder labeled `docs`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
