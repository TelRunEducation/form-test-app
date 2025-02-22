module.exports = {

  e2e: {
    baseUrl: 'http://localhost:63342/form-test-app/src/index.html',
  },
  component: {
    devServer: {
      bundler: 'webpack',
    },
    supportFile: false,
    specPattern: 'cypress/component/**/*.spec.ts',
  }
};