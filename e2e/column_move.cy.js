import { loginTest } from "../../../support/loginTest";
import { input_EditGrid } from "../../../support/inputs";
import { refresh } from "../../../support/toolbar";
import { reloadBrowserPage } from "../../../support/actions";
import { realPress } from 'cypress-real-events';

const COLUMN = {
  // Индексы колонок
  INDEXES: {
    SOURCE: 1,  // Исходная позиция колонки ID
    TARGET: 2   // Целевая позиция после перемещения
  },

  // Координаты для перемещения
  DRAG_COORDINATES: {
    INITIAL_MOVE_X: 315,    // Первоначальное перемещение по X
    INITIAL_MOVE_Y: 0,      // Первоначальное перемещение по Y
    FINAL_MOVE_X: 350,      // Финальное перемещение по X  
    FINAL_MOVE_Y: 25        // Финальное перемещение по Y
  },

  // Тексты для проверок
  TEXTS: {
    COLUMN_NAME: 'ID',
    MOVED_SUCCESS: 'Колонка передвинулась',
    SAVED_AFTER_REFRESH: 'После рефреша внутри программы колонка осталась на прежнем месте',
    SAVED_AFTER_RELOAD: 'После перезагрузки страницы браузера колонка осталась на прежнем месте'
  }
};

describe('Перемещение колонки ID в таблице', () => {

  it('Перемещение колонки ID и проверка сохранения позиции', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Проверить исходное название колонки
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .children()
      .eq(1)
      .should('have.text', COLUMN.TEXTS.COLUMN_NAME);

    // Перемещение колонки
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .click()
      .realMouseDown()
      .realMouseMove(
        COLUMN.DRAG_COORDINATES.INITIAL_MOVE_X,
        COLUMN.DRAG_COORDINATES.INITIAL_MOVE_Y
      );

    cy.get('.dx-bordered-top-view')
      .realMouseMove(
        COLUMN.DRAG_COORDINATES.FINAL_MOVE_X,
        COLUMN.DRAG_COORDINATES.FINAL_MOVE_Y
      );

    cy.get('.dx-datagrid-columns-separator')
      .realMouseUp();

    // Проверить, что колонка переместилась
    cy.get('.dx-header-row')
      .children()
      .eq(2)
      .children()
      .eq(1)
      .should('have.text', COLUMN.TEXTS.COLUMN_NAME);

    cy.log(COLUMN.TEXTS.MOVED_SUCCESS);

    // Проверка после обновления таблицы
    refresh();
    cy.get('.dx-header-row')
      .children()
      .eq(2)
      .children()
      .eq(1)
      .should('have.text', COLUMN.TEXTS.COLUMN_NAME);

    cy.log(COLUMN.TEXTS.SAVED_AFTER_REFRESH);

    // Проверка после полной перезагрузки страницы
    reloadBrowserPage();
    cy.get('.dx-header-row')
      .children()
      .eq(2)
      .children()
      .eq(1)
      .should('have.text', COLUMN.TEXTS.COLUMN_NAME);

    cy.log(COLUMN.TEXTS.SAVED_AFTER_RELOAD);
  });
});