import {
  BASE_URLS,
  TEST_USERS,
  PASSWORDS,
  TIMEOUTS,
  UI_TEXTS
} from '../support/testData';

describe('Восстановление пароля. Проверка валидации пароля', () => {

  it(`Должно появиться предупреждение о слабом пароле`, () => {
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

    // Ответ почтового сервиса
    cy.wait(TIMEOUTS.EMAIL_DELIVERY);
    cy.wrap({
      body: {
        success: true,
        url: `${BASE_URLS.APP}/setpassword/demo-token-weak-password`
      }
    }).as('emailResponse');
    cy.get('@emailResponse').then((response) => {
      const resetUrl = response.body.url;

      // Переход по ссылке и попытка установки слабого пароля
      cy.visit(resetUrl);

      // Ввод пароля
      cy.get('input[type="password"]')
        .first()
        .type(PASSWORDS.WEAK);

      // Подтверждение пароля
      cy.get('input[type="password"]')
        .last()
      type(PASSWORDS.WEAK);

      // Кнопка "Сменить пароль"
      cy.get('.dx-button-content')
        .contains('Сменить пароль')
        .click({ force: true });

      // Проверка появления предупреждения
      cy.get('.font-bold')
        .should('contain', UI_TEXTS.PASSWORD_REQUIREMENTS);

      // Проверка входа со старым паролем
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