/// <reference types="cypress" />

const bunName = 'Краторная булка N-200i';
const mainName = 'Биокотлета из марсианской Магнолии';

const preparePage = (isAuth = false) => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.intercept('GET', '**/api/ingredients', {
    fixture: 'ingredients.json'
  }).as('getIngredients');

  if (isAuth) {
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
  } else {
    cy.intercept('GET', '**/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'Unauthorized'
      }
    }).as('getUser');
  }

  cy.visit('/');
  cy.wait('@getIngredients');
};

describe('Constructor page', () => {
  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('отображает страницу конструктора', () => {
    preparePage();

    cy.contains('Соберите бургер', { timeout: 10000 }).should('exist');
  });

  it('добавляет булку и начинку в конструктор', () => {
    preparePage();

    cy.contains(bunName, { timeout: 20000 }).should('exist');
    cy.contains(mainName, { timeout: 20000 }).should('exist');

    cy.contains(bunName).parents('li').contains('Добавить').click();
    cy.contains(mainName).parents('li').contains('Добавить').click();

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains(bunName).should('exist');
      cy.contains(mainName).should('exist');
      cy.contains('Выберите начинку').should('not.exist');
      cy.contains('Оформить заказ').should('exist');
    });
  });

  it('открывает и закрывает модальное окно ингредиента', () => {
    preparePage();

    cy.contains(bunName, { timeout: 20000 }).should('exist').click();

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains(bunName).should('exist');
    });

    cy.get('[data-cy="modal-close"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('закрывает модальное окно ингредиента по клику на оверлей', () => {
    preparePage();

    cy.contains(bunName, { timeout: 20000 }).should('exist').click();

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('Детали ингредиента').should('exist');
      cy.contains(bunName).should('exist');
    });

    cy.get('[data-cy="modal-overlay"]').click({ force: true });

    cy.contains('Детали ингредиента').should('not.exist');
  });

  it('создаёт заказ и очищает конструктор', () => {
    preparePage(true);

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.contains(bunName, { timeout: 20000 })
      .parents('li')
      .contains('Добавить')
      .click({ force: true });

    cy.contains(mainName)
      .parents('li')
      .contains('Добавить')
      .click({ force: true });

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains(bunName).should('exist');
      cy.contains(mainName).should('exist');
    });

    cy.contains('Оформить заказ').click({ force: true });

    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').within(() => {
      cy.contains('12345').should('exist');
    });

    cy.get('[data-cy="modal-close"]').click({ force: true });

    cy.contains('12345').should('not.exist');

    cy.get('[data-cy="burger-constructor"]').within(() => {
      cy.contains(bunName).should('not.exist');
      cy.contains(mainName).should('not.exist');
      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});
