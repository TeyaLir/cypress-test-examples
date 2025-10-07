import { loginTest } from "../../support/loginTest";
import { input_EditGrid } from "../../support/inputs";
import { refresh, copy, add, trash, save, settingsReset } from "../../support/toolbar";
import { sort, sortAfter, verticalScrollDown, verticalScrollUp } from "../../support/actions";
import { realPress } from 'cypress-real-events';

const TEST_DATA = {
  NEW_ROW: {
    text: 'Тестовая строка 1',
    number1: 1111111111.11,
    number2: 111111111.111,
    integer: 42,
    boolean: 'true',
    json: '{}',
    uuid: '1e11f853-7138-4e1c-8268-057592ac2a98'
  },

  EDITED_ROW: {
    text: 'Редактируемая тестовая строка',
    number1: 1010101010.10,
    number2: 101010101.101,
    integer: 24,
    boolean: 'false',
    json: '{"test": "data"}',
    uuid: '2e22f222-7138-4e1c-8268-057592ac2a98'
  },

  SELECTORS: {
    LAST_ROW: '[aria-rowindex="990"]',
    ROW_BY_INDEX: '[aria-rowindex="989"]'
  },
};

describe('Работа с таблицей: добавление, редактирование и удаление строк', () => {

  it('1. Добавление новой строки в таблицу', () => {
    loginTest();
    input_EditGrid();
    refresh();
    settingsReset();

    // Установка сортировки по возрастанию ID
    sort();
    sortAfter();
    verticalScrollUp();

    // Данные для новой строки из констант
    let row = [
      TEST_DATA.NEW_ROW.text,
      TEST_DATA.NEW_ROW.number1,
      TEST_DATA.NEW_ROW.number2,
      TEST_DATA.NEW_ROW.integer,
      TEST_DATA.NEW_ROW.boolean,
      TEST_DATA.NEW_ROW.json,
      TEST_DATA.NEW_ROW.uuid
    ];

    // Добавление строки
    add();

    // Фокусировка на новой строке
    cy.get('.dx-row-focused')
      .children()
      .eq(2)
      .click({ force: true });

    // Заполнение данных строки
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== null) {
        if (typeof row[j] === 'object' && ('date' in row[j])) {
          // Обработка даты
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j].date, { delay: 10, force: true });
        } else if (typeof row[j] === 'object' && ('select' in row[j])) {
          // Обработка выпадающего списка
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .click({ force: true });
          cy.get('.dx-scrollview-content')
            .find('.dx-list-item-content')
            .contains(row[j].select)
            .click({ force: true });
        } else if (typeof row[j] === 'boolean') {
          // Обработка чекбокса
          cy.focused().should('match', 'div').find('input').then(($input) => {
            let expectedValue = row[j] ? 'true' : 'false';
            if ($input.val() !== expectedValue) {
              cy.focused().click({ force: true });
            }
          }
          );
        } else {
          // Обычное значение
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j], { delay: 10, force: true });
        }

        // Навигация Tab, кроме последнего элемента
        if (j !== row.length - 1) {
          cy.focused().realPress("Tab");
          cy.wait(1000);
        }
      }
    }
    cy.wait(1000);

    save();

    // =============================================
    // Проверка наличия созданной строки в таблице
    // =============================================

    verticalScrollDown();

    // Проверка ID строки
    cy.get(TEST_DATA.SELECTORS.ROW_BY_INDEX)
      .children()
      .eq(1)
      .should('have.text', '1000')
      .click({ force: true });

    // Проверка данных созданной строки
    let columnIndex = 2;
    for (let i = 0; i < row.length; i++) {
      cy.get(TEST_DATA.SELECTORS.LAST_ROW)
        .children()
        .eq(columnIndex++)
        .should('have.text', row[i]);
    }

    // Проверка после обновления страницы
    refresh();
    verticalScrollDown();

    let refreshColumnIndex = 2;
    for (let i = 0; i < row.length; i++) {
      cy.get(TEST_DATA.SELECTORS.LAST_ROW)
        .children()
        .eq(refreshColumnIndex++)
        .should('have.text', row[i]);
    }
  });

  it('2. Редактирование существующей строки', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Установка сортировки
    sortAfter();
    sortAfter();
    verticalScrollDown();

    // Фокусировка на последней строке для редактирования
    cy.get(TEST_DATA.SELECTORS.LAST_ROW)
      .children()
      .eq(2)
      .click({ force: true });

    // Данные для редактирования из констант
    let editRow = [
      TEST_DATA.EDITED_ROW.text,
      TEST_DATA.EDITED_ROW.number1,
      TEST_DATA.EDITED_ROW.number2,
      TEST_DATA.EDITED_ROW.integer,
      TEST_DATA.EDITED_ROW.boolean,
      TEST_DATA.EDITED_ROW.json,
      TEST_DATA.EDITED_ROW.uuid
    ];

    // Заполнение отредактированных данных
    for (let j = 0; j < row.length; j++) {
      if (row[j] !== null) {
        if (typeof row[j] === 'object' && ('date' in row[j])) {
          // Обработка даты
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j].date, { delay: 10, force: true });
        } else if (typeof row[j] === 'object' && ('select' in row[j])) {
          // Обработка выпадающего списка
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .click({ force: true });
          cy.get('.dx-scrollview-content')
            .find('.dx-list-item-content')
            .contains(row[j].select)
            .click({ force: true });
        } else if (typeof row[j] === 'boolean') {
          // Обработка чекбокса
          cy.focused().should('match', 'div').find('input').then(($input) => {
            let expectedValue = row[j] ? 'true' : 'false';
            if ($input.val() !== expectedValue) {
              cy.focused().click({ force: true });
            }
          }
          );
        } else {
          // Обычное значение
          cy.focused()
            .should('match', 'input[autocomplete="off"]')
            .type('{selectall}' + row[j], { delay: 10, force: true });
        }

        // Навигация Tab, кроме последнего элемента
        if (j !== row.length - 1) {
          cy.focused().realPress("Tab");
          cy.wait(1000);
        }
      }
    }
    cy.wait(1000);

    save();

    // =====================================
    // Проверка сохранения изменений
    // =====================================

    cy.get(TEST_DATA.SELECTORS.LAST_ROW);

    const checkRowData = [
      null,
      null,
      TEST_DATA.EDITED_ROW.text,
      TEST_DATA.EDITED_ROW.number1,
      TEST_DATA.EDITED_ROW.number2,
      TEST_DATA.EDITED_ROW.integer,
      TEST_DATA.EDITED_ROW.boolean,
      TEST_DATA.EDITED_ROW.json,
      TEST_DATA.EDITED_ROW.uuid
    ];

    for (let j = 0; j < checkRowData.length; j++) {
      let td = cy.get(TEST_DATA.SELECTORS.LAST_ROW)
        .children()
        .eq(j);
      if (checkRowData[j] !== null) {
        td.should('have.text', checkRowData[j]);
      }
    }

    // =====================================
    // Проверка после обновления
    // =====================================

    refresh();
    cy.wait(5000)

    verticalScrollDown();
    cy.wait(5000);

    cy.get(TEST_DATA.SELECTORS.LAST_ROW);

    for (let j = 0; j < checkRowData.length; j++) {
      let td = cy.get(TEST_DATA.SELECTORS.LAST_ROW)
        .children()
        .eq(j);
      if (checkRowData[j] !== null) {
        td.should('have.text', checkRowData[j]);
      }
    }
  });

  it('3. Удаление строки из таблицы', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Установка сортировки
    sortAfter();
    sortAfter();
    verticalScrollDown();

    // Проверка текста в строке перед удалением
    cy.get(TEST_DATA.SELECTORS.LAST_ROW)
      .children()
      .eq(2)
      .should('have.text', TEST_DATA.EDITED_ROW.text);

    // Выделение строки для удаления
    cy.get(TEST_DATA.SELECTORS.LAST_ROW)
      .children()
      .eq(0)
      .click({ force: true });
    cy.wait(1000);

    trash();
    save();
    cy.wait(3000);

    // Проверка, что строка удалена
    cy.get(TEST_DATA.SELECTORS.LAST_ROW)
      .should('not.exist');

    refresh();
    verticalScrollDown();

    // Проверка, что строка не восстановилась после обновления
    cy.get(TEST_DATA.SELECTORS.LAST_ROW)
      .should('not.exist');
  });
});