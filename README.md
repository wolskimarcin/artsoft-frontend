# ArtsoftFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Generate api layer based on api-docs.yaml
`npx ng-openapi-gen`

## Deploy to GitHub Pages
1. `ng build --output-path docs --base-href /artsoft-frontend/`
2. When the build is complete, make a copy of docs/index.html and name it docs/404.html
3. Commit your changes and push
4. On the GitHub project page, go to Settings and select the Pages option from the left sidebar to configure the site to publish from the docs folder.
