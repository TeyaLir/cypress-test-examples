import { loginTest } from "../../support/loginTest";
import { input_EditGridLookUp } from "../../support/inputs";
import { refresh, copy, add, trash, save, settingsReset } from "../../support/toolbar";
import { sort, sortAfter, verticalScrollDown } from "../../support/actions";
import { realPress } from 'cypress-real-events';

describe('Изменение цвета строки при редактировании табличных данных', () => {

  it('Проверка цветового выделения при редактировании таблицы.', () => {
    loginTest();
    input_EditGridLookUp();
    refresh();

    // Получить первый ряд в таблице
    cy.get('[aria-rowindex="1"]')
      .children()
      .eq(1)
      .click({ force: true });

    // Данные для редактирования строки
    let row = [
      'Редактируемая тестовая строка',
      {select: 'Тестовое значение 1'}
    ];

    // Заполнение данных строки
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== null) {
        if (typeof row[j] === 'object' && ('date' in row[j])) {
          // обработка даты
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j].date, { delay: 10, force: true });
        } else if (typeof row[j] === 'object' && ('select' in row[j])) {
          // обработка выпадающего списка
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .click({ force: true });
          cy.get('.dx-scrollview-content')
            .find('.dx-list-item-content')
            .contains(row[j].select)
            .click({ force: true });
        } else if (typeof row[j] === 'boolean') {
          // обработка чекбокса
          cy.focused().should('match', 'div').find('input').then(($input) => {
            let expectedValue = row[j] ? 'true' : 'false';
            if ($input.val() !== expectedValue) {
              cy.focused().click({ force: true });
            }
          }
          );
        } else {
          // обычное значение
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j], { delay: 10, force: true });
        }

        // навигация Tab, кроме последнего элемента
        if (j !== row.length - 1) {
          cy.focused().realPress("Tab");
          cy.wait(1000);
        }
      }
    }
    cy.wait(1000);

    // ====================================================
    //    Проверить, что изменённая строка стала зелёной
    // ====================================================

    for (let i = 0; i < row.length; i++) {
      cy.get('[aria-rowindex="1"]')
        .children()
        .eq(i + 1)
        .should('have.css', 'background-color', 'rgba(139, 195, 74, 0.32)');
    }
  });
});