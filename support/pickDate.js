export function pickDay(day, month, year) {
  cy.wait(1500);

  cy.get('.dx-texteditor-input-container > input')
    .eq(2)
    .click({ force: true });
  cy.get('.dx-calendar-navigator > .dx-button-has-text > .dx-button-content')
    .click({ force: true })
    .click({ force: true });

  if (year <= 2019) {
    cy.get('.dx-calendar-navigator-previous-view > .dx-button-content')
      .click({ force: true })
    // get year
    cy.get(`[data-value="${year}/01/01"]`)
      .eq(0)
      .click({ force: true });
    // get month
    cy.get(`[data-value="${year}/${month}/01"]`)
      .click({ force: true });
    // get day
    cy.get(`[data-value="${year}/${month}/${day}"]`)
      .eq(0)
      .click({ force: true });
  } else {
    // 2020 >
    // get year
    cy.get(`[data-value="${year}/01/01"]`)
      .click({ force: true });
    // get month
    cy.get(`[data-value="${year}/${month}/01"]`)
      .click({ force: true });
    // get day
    cy.get(`[data-value="${year}/${month}/${day}"]`)
      .eq(0)
      .click({ force: true });
  }
}

export function pickMonth(year, month) {
  cy.wait(1500);

  if (year <= 2020) {
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon')
      .click({ force: true });
    cy.get('.dx-calendar-navigator > .dx-button-has-text > .dx-button-content').click({ force: true });
    cy.get('.dx-icon-chevronleft').click({ force: true });
    cy.get('.dx-calendar-navigator-previous-view > .dx-button-content').click({ force: true });
    cy.get(`td[data-value="${year}/01/01"]`).click({ force: true });
    cy.get('span').contains(month).click({ force: true });
    cy.wait(1500);
  } else {
    // 2021 >
    cy.get(':nth-child(3) > .dx-template-wrapper > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container > .dx-texteditor-buttons-container > .dx-widget > .dx-button-content > .dx-dropdowneditor-icon')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button').click({ force: true });
    cy.get(`td[data-value="${year}/01/01"]`).click({ force: true });
    cy.get('span').contains(month).click({ force: true });
    cy.wait(1500);
  }
}

export function pickDate(year, month) {
  cy.wait(1500);

  if (year <= 2020) {
    cy.get('.dx-button')
      .filter('.date-button')
      .contains('Месяц')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button').click({ force: true });
    cy.get('.dx-icon-chevronleft').click({ force: true });
    cy.get(`td[data-value="${year}/01/01"]`).click({ force: true });
    cy.get('span').contains(month).click({ force: true });
    cy.get('.dx-button-text').contains('OK').click({ force: true });
    cy.wait(1500);
  } else {
    cy.get('.dx-button')
      .filter('.date-button')
      .contains('Месяц')
      .click({ force: true });
    cy.get('.dx-calendar-caption-button').click({ force: true });
    cy.get(`td[data-value="${year}/01/01"]`).click({ force: true });
    cy.get('span').contains(month).click({ force: true });
    cy.get('.dx-button-text').contains('OK').click({ force: true });
    cy.wait(1500);
  }
}

export function pickDayInsideTable(day, month, year) {
  cy.wait(1500);

  cy.get('.dx-overlay-shader > .dx-overlay-content > .dx-popup-content')
  cy.get('.dx-calendar-body')
    .find(`[data-value="${year}/${month}/${day}"]`)
    .click({ force: true });
  cy.wait(2000);

  // Вручную
  cy.get('.dx-button-content > .dx-button-text')
    .contains('Вручную')
    .click({ force: true });
  cy.wait(2000);
}

export function pickDayInsideTableAfter(day, month, year) {
  cy.wait(1500);

  cy.get('.dx-overlay-shader > .dx-overlay-content > .dx-popup-content')
  cy.get('.dx-calendar-body')
    .find(`[data-value="${year}/${month}/${day}"]`)
    .click({ force: true });
  cy.wait(1000);

  // ОК
  cy.get('.dx-overlay-wrapper > .dx-overlay-content > .dx-toolbar > .dx-toolbar-items-container > .dx-toolbar-after > :nth-child(1) > .dx-item-content > .dx-widget > .dx-button-content')
    .click({ force: true });
  cy.wait(2000);
}

function enterManualMode() {
  cy.get('.info-container')
    .find('.dx-button-content')
    .contains('Вручную')
    .click({ force: true });
  cy.get('.dx-focused').click();
}
