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
cd localenv && npm install
```

## Setup the proxy

In order to run the application locally you will need to add the following to your `/etc/hosts` file on Mac/Linux and `C:\Windows\System32\drivers\etc\hosts` file on Windows.(run sudo nano /etc/hosts command and add the following )

```
0.0.0.0 dev.i.rax.io
```

## Run The App

Running the application is quite simple, but there are a few options for us to take a look at

## Development server

The dev environment is setup to authenticate against either staging (staging) or production (prod), and is in part separated from the rest of the environment via the `localenv` folder. You have the option to use `--password` or `--apikey` to authenticate with.

To launch either staging or pod environments run:

```
cd localenv
NODE_ENV=[staging, or prod] npm run dev -- --username [username] --password [password]
```

or..

```
cd localenv
NODE_ENV=[staging, or prod] npm run dev -- --username [username] --apikey [apikey]
```

Your option for `NODE_ENV` will depend on which identity environment you're wanting to target.

Once complete navigate to `http://dev.i.rax.io:3000/intelligence` to use `browsersync` switch to port `3001`.

## Code scaffolding

Run `ng generate component <component-name>` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test:unit` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation
We are using [Compodoc](https://compodoc.app) to create app structural documentation. It compiles a set of html files based on the `tsconfig.json` file. To view these run `npm run docs` and the files will populate in a folder labeled `docs`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
