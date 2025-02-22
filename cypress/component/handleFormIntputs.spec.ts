import * as cypress from "cypress";
describe('Form input checks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');

    cy.get('#first-name').type('John');
    cy.get('#last-name').focus();
  })
  it('should add class "valid" to input in case of valid input', () => {
    cy.get('#first-name').should('have.class', 'valid');
  })
  it('error for invalid field should be visible only after focus loss', () => {
    cy.get('#first-name').type('1');
    cy.get('label[for="first-name"]').children('span').should('not.be.visible');
    cy.get('#last-name').focus();
    cy.get('label[for="first-name"]').children('span').should('be.visible');
  })
  it('submit button should be disabled if not all fields are filled', () => {
    cy.get('input[type="submit"]').should('be.disabled');
  })
})

describe('Form input checks', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9000/');

    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Smith');
    cy.get('#email').type("test@gmail.com");
    cy.get('#password').type("1111qqqQ$");
    cy.get('#confirm-password').type("1111qqqQ$");
    cy.get('#birthdate').type('2000-01-01')
  })

  it('if all fields are filled correctly submit button is enabled', () => {
    cy.get('input[type="submit"]').should('not.be.disabled');
  })
  it('if field is filled incorrectly submit button is disabled', () => {
    cy.get('#first-name').type('1');
    cy.get('input[type="submit"]').should('be.disabled');
  })
})