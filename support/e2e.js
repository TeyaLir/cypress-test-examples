import { BASE_URLS } from './testData';

// URL для сброса базы и запуска тестов
const demoResetUrl = `${BASE_URLS.API_GATEWAY}/reset-test-data`;
const demoAppUrl = BASE_URLS.APP;

before(() => {
  cy.request(demoResetUrl, { timeout: 60000 });
});

beforeEach(() => {
  cy.visit(demoAppUrl);
});
