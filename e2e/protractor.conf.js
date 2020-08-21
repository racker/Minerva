// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require("jasmine-spec-reporter");

exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./src/**/*e2e-spec.ts"],
  // specs:[".src/features/monitoring/monitordetails/monitordetailslabelinfodisplay.e2e-spec.ts"],
  // specs:["e2e/src/features/monitoring/monitorlist/monitorsPagination.e2e-spec.ts"],
    capabilities: {
    browserName: "chrome",
    chromeOptions: {
       args: ["no-sandbox","--headless","--disable-gpu","--disable-web-security"],

    },
  },
  directConnect: true,
  baseUrl: "http://dev.i.rax.io:4200/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1000 * 60 * 60, // Default Timeout is one hour, because some tests are long-running
    print: function () {},
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.e2e.json"),
    });
    jasmine
      .getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};
