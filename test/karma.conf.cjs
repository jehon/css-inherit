/* eslint-env node */
/* eslint no-console: off */

const path = require("path");
const fse = require("fs-extra");
const root = path.dirname(__dirname);
fse.emptyDirSync(path.join(root, "tmp"));

// https://blog.cepharum.de/en/post/natively-unit-testing-es6-modules-in-browser-including-coverage.html

module.exports = function (config) {
  const configuration = {
    basePath: root,

    frameworks: ["jasmine", "jasmine-html"],

    reporters: ["progress", "coverage-istanbul"],

    files: [
      { pattern: "jehon-css-inherit.js" },
      { pattern: "test/*-test.js" },
      { pattern: "**/*", included: false, watched: false }
    ],

    autoWatch: true,

    browsers: ["ChromeHeadlessNoSandbox"],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    preprocessors: {
      "jehon-css-inherit.js": ["karma-coverage-istanbul-instrumenter"]
    },

    coverageIstanbulReporter: {
      reports: ["html", "text"],
      dir: path.join(root, "tmp/coverage")
    }
  };

  config.set(configuration);
};
