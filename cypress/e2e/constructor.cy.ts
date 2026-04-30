/// <reference types="cypress" />

const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';

describe('Constructor page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('отображает страницу конструктора', () => {
    cy.contains('Соберите бургер', { timeout: 10000 }).should('exist');
  });

  it('добавляет булку и начинку в конструктор', () => {
    cy.contains(bunName, { timeout: 20000 }).should('exist');
    cy.contains(mainName, { timeout: 20000 }).should('exist');

    cy.contains(bunName).parents('li').contains('Добавить').click();
    cy.contains(mainName).parents('li').contains('Добавить').click();

    cy.contains('Оформить заказ').should('exist');
    cy.contains('Выберите начинку').should('not.exist');
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    cy.contains(bunName, { timeout: 20000 }).should('exist').click();

    cy.contains('Детали ингредиента').should('exist');
    cy.contains(bunName).should('exist');

    cy.get('[data-cy="modal-close"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывает модальное окно ингредиента по клику на оверлей', () => {
    cy.contains(bunName, { timeout: 20000 }).should('exist').click();

    cy.contains('Детали ингредиента').should('exist');

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.contains(bunName, { timeout: 20000 })
      .parents('li')
      .contains('Добавить')
      .click({ force: true });

    cy.contains(mainName)
      .parents('li')
      .contains('Добавить')
      .click({ force: true });

    cy.contains('Оформить заказ').click({ force: true });

    cy.wait('@createOrder');

    cy.contains('12345').should('exist');

    cy.get('[data-cy="modal-close"]').click({ force: true });

    cy.contains('12345').should('not.exist');
    cy.contains('Выберите начинку').should('exist');
  });
});
