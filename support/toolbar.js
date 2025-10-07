export function refresh() {
  // Рефреш внутри программы
  cy.get('.dx-icon-refresh')
    .click({ force: true });
  cy.wait(2000);

  // Проверить, что появилось сообщение "Данные обновлены"
  cy.get('.dx-toast-message')
    .should("have.text", "Данные обновлены");
  cy.wait(2000);
}

export function copy() {
  // Копировать строку
  cy.get('.dx-icon-copy')
    .click({ force: true });
  cy.wait(2000);
}

export function add() {
  // Добавить строку
  cy.get('.dx-icon-add')
    .click({ force: true });
  cy.wait(2000);
}

export function trash() {
  // Удалить
  cy.get('.dx-icon-trash')
    .click({ force: true });
  cy.wait(2000);

  // Запрос на удаление
  cy.get('.dx-overlay-content > .dx-dialog-buttons')
    .find('.dx-toolbar-center')
    .children()
    // Да
    .first()
    .find('.dx-button-content > span')
    .contains('Да')
    .click({ force: true });
  cy.wait(2000);
}

export function save() {
  // Сохранить изменения
  cy.get('.dx-icon-save')
    .click({ force: true });
  cy.wait(1500);

  // Проверить, что появилось сообщение "Изменения данных прошли успешно"
  cy.get('.dx-toast-message')
    .should("have.text", "Изменения данных прошли успешно");
  cy.wait(2000);
}

export function settingsReset() {
  // Пользовательские настройки (шестерёнка)
  cy.get('.dx-icon-preferences')
    .click({ force: true });
  cy.wait(2000);

  // Сбросить
  cy.get('[title="Заводские настройки"]')
    .click({ force: true });
  cy.wait(2000);
}

