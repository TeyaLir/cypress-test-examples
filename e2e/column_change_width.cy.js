import { loginTest } from "../../../support/loginTest";
import { input_EditGrid } from "../../../support/inputs";
import { refresh, copy, add, trash, save, settingsReset } from "../../../support/toolbar";
import { sort, reloadBrowserPage } from "../../../support/actions";
import { realPress } from 'cypress-real-events';

const MOUSE = {
  VERTICAL_POSITION: 25,  // Y-координата для перемещения мыши
  DRAG_DISTANCE: 140 // Расстояние для перетаскивания разделителя
};

// Переменные для хранения значений ширины колонок
let initialWidths = {
  firstColumn: null,
  idColumn: null
};

let changedWidths = {
  afterChange: null,
  afterRefresh: null,
  afterReload: null
};

let totalWidth;

describe('Изменение ширины колонки ID в таблице', () => {

  it('1. Получение исходной ширины колонок', () => {
    loginTest();
    input_EditGrid();
    refresh();

    // Получить ширину первой колонки
    cy.get('.dx-header-row')
      .children()
      .eq(0)
      .invoke('css', 'width')
      .then(($width) => {
        initialWidths.firstColumn = $width;
        cy.log(`Ширина первой колонки: ${$width}`);
      });

    // Получить исходную ширину колонки ID
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .invoke('css', 'width')
      .then(($width) => {
        initialWidths.idColumn = $width;
        cy.log(`Исходная ширина колонки ID: ${$width}`);
      });
  });

  it('2. Расчёт координат для изменения ширины колонки', () => {
    // Преобразование значений из "px" в числа
    const firstColWidth = parseInt(initialWidths.firstColumn);
    const idColWidth = parseInt(initialWidths.idColumn);

    cy.log(`Ширина первой колонки: ${firstColWidth}px`);
    cy.log(`Ширина колонки ID: ${idColWidth}px`);

    // Сумма ширин для позиционирования мыши на границе колонок
    totalWidth = firstColWidth + idColWidth;
    cy.log(`Суммарная ширина для позиционирования: ${totalWidth}px`);
  });

  it('3. Изменение ширины колонки ID и проверка сохранения', () => {
    loginTest();
    input_EditGrid();

    // Перемещение мыши к разделителю колонок
    cy.get('.dx-bordered-top-view')
      .realMouseMove(totalWidth, MOUSE.VERTICAL_POSITION);

    // Перетаскивание разделителя для изменения ширины
    cy.get('.dx-datagrid-columns-separator')
      .realMouseDown()
      .realMouseMove(MOUSE.DRAG_DISTANCE, 0)
      .realMouseUp();

    // Получение изменённой ширины колонки
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .invoke('css', 'width')
      .then(($width) => {
        changedWidths.afterChange = $width;
        cy.log(`Ширина колонки после изменения: ${$width}`);
      });

    // Проверка после обновления таблицы
    refresh();
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .invoke('css', 'width')
      .then(($width) => {
        changedWidths.afterRefresh = $width;
        cy.log(`Ширина после обновления таблицы: ${$width}`);
      });

    // Проверка после полной перезагрузки страницы
    reloadBrowserPage();
    cy.get('.dx-header-row')
      .children()
      .eq(1)
      .invoke('css', 'width')
      .then(($width) => {
        changedWidths.afterReload = $width;
        cy.log(`Ширина после перезагрузки страницы: ${$width}`);
      });
  });

  it('4. Проверка результатов изменения ширины колонки', () => {
    cy.log(`Исходная ширина колонки: ${initialWidths.idColumn}`);
    cy.log(`Ширина после изменения: ${changedWidths.afterChange}`);
    cy.log(`Ширина после обновления таблицы: ${changedWidths.afterRefresh}`);
    cy.log(`Ширина после перезагрузки страницы: ${changedWidths.afterReload}`);

    // Проверка изменения ширины
    const isWidthChanged = (initialWidths.idColumn !== changedWidths.afterChange);
    cy.log(`Ширина изменилась: ${isWidthChanged}`);

    if (isWidthChanged) {
      cy.log('Ширина колонки успешно изменилась');
    } else {
      cy.log('Ширина колонки не изменилась');
    }

    // Проверка сохранения после обновления таблицы
    const isSavedAfterRefresh = (changedWidths.afterChange === changedWidths.afterRefresh);
    cy.log(`Сохранение после обновления: ${isSavedAfterRefresh}`);

    if (isSavedAfterRefresh) {
      cy.log('Изменённая ширина сохранилась после обновления таблицы');
    } else {
      cy.log('Изменённая ширина не сохранилась после обновления таблицы');
    }

    // Проверка сохранения после перезагрузки страницы
    const isSavedAfterReload = (changedWidths.afterChange === changedWidths.afterReload);
    cy.log(`Сохранение после перезагрузки: ${isSavedAfterReload}`);

    if (isSavedAfterReload) {
      cy.log('Изменённая ширина сохранилась после перезагрузки страницы');
    } else {
      cy.log('Изменённая ширина не сохранилась после перезагрузки страницы');
    }
  });
});