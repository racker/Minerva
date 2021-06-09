# Minerva - Admin Tools

This is the Admin Tools UI for Intelligence V2. It's intended usage is for Rackers to have the ability to view/edit tenant monitoring settings.

This project works in accordance with the Minerva project as they both share many of the same components.

## Run The App

Install the NPM dependecies at the root of this project, all dependencies will appear in the`node_modules` folder.

``` npm run start-admin ```

To start the mock version of the app run:

``` npm run start-admin:mock    ```

Once complete navigate to `http://localhost:4200`.

## Build

Run `npm run build` and it will run `makefile build-frontend` to execute `makefile` file. `makefile` is a file containing a set of directives used by a make build automation tool to generate specified goal.

`makefile` execute two commands `ng build --project='minerva'` & `ng build --project='admin'` and generates two different builds named `admin` & `minerva`. The build artifacts will be stored in the `dist/` directory. The `--project='minerva'` context actually tells which project we are going to build as it internally interacts with the `angular.json` and look for the project name specified inside `projects` object.

## CI/CD
We're using GCP Cloudbuild for testing and deploying.

Build:
[cloudbuild-admin.yaml](https://github.com/racker/Minerva/blob/devel/cloudbuild-admin.yaml)

Deploy:
[cloudbuild-admin-deploy.yaml](https://github.com/racker/Minerva/blob/devel/cloudbuild-admin-deploy.yaml)

## Running unit tests

Run `npm run test:admin` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run test:admin-e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Documentation
For best documentation view

Also see https://one.rackspace.com/display/SegSup/Admin+Tools+UI

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
