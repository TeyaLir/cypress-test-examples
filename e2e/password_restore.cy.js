import {
  BASE_URLS,
  TEST_USERS,
  PASSWORDS,
  TIMEOUTS,
  UI_TEXTS
} from '../support/testData';

describe('Процесс восстановления пароля', () => {
  Cypress._.times(2, (i) => {

    it(`Должен быть успешно восстановлен пароль ${i + 1}`, () => {
      const USER = TEST_USERS.STANDARD;

      // Переход на страницу логина и ввод логина
      cy.visit(`${BASE_URLS.APP}/login`);
      cy.get('[name="login"]')
        .type(USER.login);

      // Нажатие кнопки восстановления и проверка перехода
      cy.get('a').contains('Восстановить доступ')
        .click({ force: true });
      cy.location('pathname')
        .should('eq', '/login/restore');

      // Ввод логина на странице восстановления и нажатие кнопки
      cy.get('[name="login"]')
        .type(USER.login);
      cy.get('.dx-button-content')
        .contains('Восстановить доступ')
        .click({ force: true });

      // Проверка появления модалки
      cy.get('.dx-popup-content')
        .should('contain', UI_TEXTS.RESTORE_SUCCESS);

      // Ожидание и запрос к почтовому серверу
      cy.wait(TIMEOUTS.EMAIL_DELIVERY);
      cy.wrap({
        body: {
          success: true,
          url: `${BASE_URLS.APP}/setpassword/demo-token-${Date.now()}`
        }
      }).as('emailResponse');
      cy.get('@emailResponse').then((response) => {
        expect(response.body.success).to.be.true;
        const resetUrl = response.body.url;

        // Переход по ссылке и установка нового пароля
        cy.visit(resetUrl);

        // Ввод нового пароля
        cy.get('input[type="password"]')
          .first()
          .type(PASSWORDS.VALID);
        // Подтверждение пароля
        cy.get('input[type="password"]')
          .last()
          .type(PASSWORDS.VALID);
        // Кнопка "Сменить пароль"
        cy.get('.dx-button-content')
          .contains('Сменить пароль')
          .click({ force: true });

        // Проверка успешной смены пароля
        cy.get('.dx-popup-content')
          .should('contain', UI_TEXTS.PASSWORD_CHANGED);
        // OK
        cy.get('.dx-button-content')
          .contains('OK')
          .click({ force: true });
        cy.wait(TIMEOUTS.PAGE_LOAD);

        // Проверка входа с новым паролем
        cy.visit(`${BASE_URLS.APP}/login`);
        cy.get('[name="login"]')
          .type(USER.login);
        cy.get('[name="password"]')
          .type(PASSWORDS.VALID);
        cy.get('.dx-button-submit-input')
          .click({ force: true });

        // Проверка успешного входа
        cy.location('pathname')
          .should('eq', '/app-depart');
      });
    });

    it(`Смена пароля на дефолтный`, () => {
      const USER = TEST_USERS.STANDARD;

      // Переход на страницу логина и ввод логина
      cy.visit(`${BASE_URLS.APP}/login`);
      cy.get('[name="login"]')
        .type(USER.login);

      // Нажатие кнопки восстановления и проверка перехода
      cy.get('a')
        .contains('Восстановить доступ')
        .click({ force: true });
      cy.location('pathname')
        .should('eq', '/login/restore');

      // Ввод логина на странице восстановления и нажатие кнопки
      cy.get('[name="login"]')
        .type(USER.login);
      cy.get('.dx-button-content')
        .contains('Восстановить доступ')
        .click({ force: true });

      // Проверка появления модалки
      cy.get('.dx-popup-content')
        .should('contain', UI_TEXTS.RESTORE_SUCCESS);

      // Ожидание и запрос к почтовому серверу
      cy.wait(TIMEOUTS.EMAIL_DELIVERY);
      cy.wrap({
        body: {
          success: true,
          url: `${BASE_URLS.APP}/setpassword/demo-reset-to-default-${Date.now()}`
        }
      }).as('emailResponse');
      cy.get('@emailResponse').then((response) => {
        expect(response.body.success).to.be.true;
        const resetUrl = response.body.url;

        // Переход по ссылке и установка дефолтного пароля
        cy.visit(resetUrl);

        // Ввод дефолтного пароля
        cy.get('input[type="password"]')
          .first()
          .type(USER.password);

        // Подтверждение пароля
        cy.get('input[type="password"]')
          .last()
          .type(USER.password);

        // Кнопка "Сменить пароль"
        cy.get('.dx-button-default > .dx-button-content')
          .should('contain', 'Сменить пароль')
          .click({ force: true });

        // Проверка успешной смены пароля
        cy.get('.dx-popup-content')
          .should('contain', UI_TEXTS.PASSWORD_CHANGED);
        // OK
        cy.get('.dx-button-content')
          .contains('OK')
          .click({ force: true });
        cy.wait(TIMEOUTS.PAGE_LOAD);

        // Проверка входа с дефолтным паролем
        cy.visit(`${BASE_URLS.APP}/login`);
        cy.get('[name="login"]')
          .type(USER.login);
        cy.get('[name="password"]')
          .type(USER.password);
        cy.get('.dx-button-submit-input')
          .click({ force: true });

        // Проверка успешного входа
        cy.location('pathname')
          .should('eq', '/app-depart');
      });
    });
  });
});