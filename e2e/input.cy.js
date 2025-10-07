import {loginTest} from "../support/loginTest";

describe('Фокус кнопки "ОК" при выборе приложения и подразделения', () => {

  it('Кнопка "ОК" не в фокусе до выбора приложения и подразделения', () => {
    loginTest();

    // Проверяем, что мы на правильных страницах
    cy.get('.page-app__title').should('have.text', 'Выберите приложение')
    cy.get('.page-department__title').should('have.text', 'Выберите подразделение')

    // Проверяем, что кнопка изначально не в фокусе
    cy.get('.dx-button')
      .should('not.have.focus')

    // Выбираем приложение
    cy.get('.page-app')
      .find('.dx-item-content')
      .contains('Тестовое приложение')
      .click({force: true});

    // Кнопка все еще не в фокусе после выбора только приложения
    cy.get('.dx-button')
      .should('not.have.focus')

    // Выбираем подразделение
    cy.get('.page-department')
      .find('.dx-item')
      .contains('Тестовое подразделение')
      .click({force: true});

    // Теперь кнопка должна быть в фокусе после выбора обоих параметров
    cy.get('.dx-button')
      .focus();

    // Кликаем на кнопку
    cy.get('.dx-button')
      .click({force: true});

    // Проверяем переход на следующую страницу
    cy.get('.dx-toolbar-items-container')
      .should('be.visible')
  });
});