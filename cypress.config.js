const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: false,
    saveAllAttempts: false,
  },
  video: false,
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        'benchmark:log'(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});
