import {loginTest} from '../../../../../support/loginTest.js'
import {pickDay, pickMonth, pickDayInsideTable, pickDayInsideTableAfter} from '../../../../../support/pickDate.js'
import {refresh, copy, add, trash, save} from "../../../../../support/toolbar"
import {realPress} from 'cypress-real-events'


let item_33_1_1_63;
let item_33_1_1_205;
let item_33_1_2_63;
let item_33_1_2_205;
let item_33_1_3_63;
let item_33_1_3_205;
let item_33_1_0_63;
let item_33_1_0_205;

const BASE_OFFSET = 3;
const SHEET_4_63 = BASE_OFFSET + 4;
const SHEET_5_205 = BASE_OFFSET + 1;


describe('Проверка расчётов формы 2-ПЭК - показатель 205 по разделу 33.1.0', () => {

  it('Внесение тестовых значений и сбор данных для расчёта', () => {

    loginTest();

    cy.contains('Форма 2-ПЭК').click({force: true});
    cy.get('.dx-context-menu')
      .contains('Форма 2-ПЭК')
      .click({force: true});

    pickMonth(2021, "окт.");

    // Обработка информационного окна
    cy.get('.dx-popup-wrapper')
      .contains('В БД отсутствует информация');
    cy.get('.dx-popup-bottom')
      .contains('OK')
      .click({force: true});
    cy.get('.dx-popup-wrapper')
      .should('not.exist');

    add();

    // ============================================
    // Работа с Листом 4 - показатели 63
    // ============================================

    // Переход на Лист 4
    cy.get('.dx-toolbar-before')
      .find('span.dx-button-text')
      .contains('Лист 4')
      .click({force: true});
    cy.wait(1000);

    // Ввод значения - 33.1.1 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(SHEET_4_63)
      .type('{selectall}' + 18611)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.1 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(SHEET_4_63)
      .find('div')
      .then(($col) => {
        item_33_1_1_63 = $col.text();
        cy.log('Показатель № 63 по оч 33.1.1 = ' + item_33_1_1_63)
      });

    // -------------------------------

    // Ввод значения - 33.1.2 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(SHEET_4_63)
      .type('{selectall}' + 5048)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.2 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(SHEET_4_63)
      .find('div')
      .then(($col) => {
        item_33_1_2_63 = $col.text();
        cy.log('Показатель № 63 по оч 33.1.2 = ' + item_33_1_2_63)
      });

    // -------------------------------

    // Ввод значения - 33.1.3 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(2)
      .children()
      .eq(SHEET_4_63)
      .type('{selectall}' + 15347)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.3 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(2)
      .children()
      .eq(SHEET_4_63)
      .find('div')
      .then(($col) => {
        item_33_1_3_63 = $col.text();
        cy.log('Показатель № 63 по оч 33.1.3 = ' + item_33_1_3_63)
      });

    // ============================================
    // Работа с Листом 5 - показатели 205
    // ============================================

    // Выбрать Лист 5
    cy.get('.dx-toolbar-before')
      .find('span.dx-button-text')
      .contains('Лист 5')
      .click({force: true});
    cy.wait(1000);

    // Ввод значения - 33.1.1 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(SHEET_5_205)
      .type('{selectall}' + 1.25)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.1 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(0)
      .children()
      .eq(SHEET_5_205)
      .find('div')
      .then(($col) => {
        item_33_1_1_205 = $col.text();
        cy.log('Показатель № 205 по оч 33.1.1 = ' + item_33_1_1_205)
      });

    // -------------------------------

    // Ввод значения - 33.1.2 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(SHEET_5_205)
      .type('{selectall}' + 1.28)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.2 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(1)
      .children()
      .eq(SHEET_5_205)
      .find('div')
      .then(($col) => {
        item_33_1_2_205 = $col.text();
        cy.log('Показатель № 205 по оч 33.1.2 = ' + item_33_1_2_205)
      });

    // -------------------------------

    // Ввод значения - 33.1.3 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(2)
      .children()
      .eq(SHEET_5_205)
      .type('{selectall}' + 1.25)
      .realPress("Tab");
    cy.wait(1000);

    // Получение значения - 33.1.2 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(2)
      .children()
      .eq(SHEET_5_205)
      .find('div')
      .then(($col) => {
        item_33_1_3_205 = $col.text();
        cy.log('Показатель № 205 по оч 33.1.3 = ' + item_33_1_3_205)
      });


    // =======================================
    // 33.1.0 - получить значения п.63
    // 33.1.0 - получить значения п.205
    // =======================================

    // Выбрать Лист 4
    cy.get('.dx-toolbar-before')
      .find('span.dx-button-text')
      .contains('Лист 4')
      .click({force: true});
    cy.wait(1000);

    // Получение значения - 33.1.0 п.63
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(3)
      .children()
      .eq(SHEET_4_63)
      .find('div')
      .then(($col) => {
        item_33_1_0_63 = $col.text();
        cy.log('Показатель № 63 по оч 33.1.0 = ' + item_33_1_0_63)
      });

    // ----------------------------------

    // Выбрать Лист 5
    cy.get('.dx-toolbar-before')
      .find('span.dx-button-text')
      .contains('Лист 5')
      .click({force: true});
    cy.wait(1000);

    // Получение значения - 33.1.0 п.205
    cy.get('.dx-row')
      .filter('.dx-data-row')
      .eq(3)
      .children()
      .eq(SHEET_5_205)
      .find('div')
      .then(($col) => {
        item_33_1_0_205 = $col.text();
        cy.log('Показатель № 205 по оч 33.1.0 = ' + item_33_1_0_205)
      });
  });

  it('33.1.0 п.205 - Проверка вычисленных значений', () => {

    // Удаление пробела
    item_33_1_1_205 = item_33_1_1_205.replace(/\s/g, "");
    item_33_1_1_63 = item_33_1_1_63.replace(/\s/g, "");
    item_33_1_2_205 = item_33_1_2_205.replace(/\s/g, "");
    item_33_1_2_63 = item_33_1_2_63.replace(/\s/g, "");
    item_33_1_3_205 = item_33_1_3_205.replace(/\s/g, "");
    item_33_1_3_63 = item_33_1_3_63.replace(/\s/g, "");
    item_33_1_0_63 = item_33_1_0_63.replace(/\s/g, "");
    item_33_1_0_63 = item_33_1_0_63.replace(/\s/g, "");
    item_33_1_0_205 = item_33_1_0_205.replace(/\s/g, "");

    // Замена в значениях запятой на точку
    item_33_1_1_205 = item_33_1_1_205.replace(',', '.');
    item_33_1_1_63 = item_33_1_1_63.replace(',', '.');
    item_33_1_2_205 = item_33_1_2_205.replace(',', '.');
    item_33_1_2_63 = item_33_1_2_63.replace(',', '.');
    item_33_1_3_205 = item_33_1_3_205.replace(',', '.');
    item_33_1_3_63 = item_33_1_3_63.replace(',', '.');
    item_33_1_0_63 = item_33_1_0_63.replace(',', '.');
    item_33_1_0_63 = item_33_1_0_63.replace(',', '.');
    item_33_1_0_205 = item_33_1_0_205.replace(',', '.');

    let value = (((+item_33_1_1_205 * +item_33_1_1_63) + (+item_33_1_2_205 * +item_33_1_2_63) + (+item_33_1_3_205 * +item_33_1_3_63)) / +item_33_1_0_63).toFixed(2);

    cy.log('item_33_1_1_205 = ' + item_33_1_1_205)
    cy.log('item_33_1_1_63 = ' + item_33_1_1_63)
    cy.log('item_33_1_2_205 = ' + item_33_1_2_205)
    cy.log('item_33_1_2_63 = ' + item_33_1_2_63)
    cy.log('item_33_1_3_205 = ' + item_33_1_3_205)
    cy.log('item_33_1_3_63 = ' + item_33_1_3_63)
    cy.log('item_33_1_0_63 = ' + item_33_1_0_63)
    cy.log('Показатель № 205 = ' + item_33_1_0_205)
    cy.log('Вычисленное значение = ' + value)

    if (item_33_1_0_205 == value) {
      cy.log('Вычисления верны')
    } else {
      cy.log(reportError('Вычисления не верны'))
    }
  });

});
