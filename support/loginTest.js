import { BASE_URLS, TEST_USERS } from './testData';

export function loginTest(userType = 'STANDARD') {
  const user = TEST_USERS[userType] || TEST_USERS.STANDARD;

  cy.visit(BASE_URLS.APP_GATEWAY);
  cy.wait(2000);

  cy.get('[name="login"]')
    .type(user.login)
    .should('have.value', user.login);

  cy.get('[name="password"]')
    .type(user.password)
    .should('have.value', user.password);

  cy.get('.dx-button-submit-input')
    .click({ force: true });
  cy.wait(1000);
}