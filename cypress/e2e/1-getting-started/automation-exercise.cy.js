/// <reference types="cypress" />

const testUserEmail = `michaelfelipe${Date.now()}@gmail.com`;
const testUserPassword = '123456578';

describe('Automation Exercise', { testIsolation: false }, () => {
    before(() => {
        cy.visit('https://www.automationexercise.com');
    });

    it('Cadastrar usuario com sucesso', () => {
        cy.get('a[href*=login]').click();

        cy.get('[data-qa="signup-name"]').type('michael');
        cy.get('[data-qa="signup-email"]').type(testUserEmail);
        cy.get('[data-qa="signup-button"]').click();

        cy.get('#id_gender2').check();

        cy.get('[data-qa="password"]').type(testUserPassword);

        cy.get('[data-qa="days"]').select('10');
        cy.get('[data-qa="months"]').select('May');
        cy.get('[data-qa="years"]').select('1990');


        cy.get('#newsletter').check();
        cy.get('#optin').check();

        cy.get('[data-qa="first_name"]').type('michael');
        cy.get('[data-qa="last_name"]').type('felipe');
        cy.get('[data-qa="company"]').type('pgats');

        cy.get('[data-qa="address"]').type('rua teste');
        cy.get('[data-qa="address2"]').type('rua teste 2');

        cy.get('[data-qa="country"]').select('United States');

        cy.get('[data-qa="state"]').type('California');
        cy.get('[data-qa="city"]').type('San Francisco');
        cy.get('[data-qa="zipcode"]').type('12345678');
        cy.get('[data-qa="mobile_number"]').type('11999999999');

        cy.get('[data-qa="create-account"]').click();
        cy.get('[data-qa="continue-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible');
        cy.contains('a', 'Logout').click();
    });

    it('Efetuar login de Usuario com email e senha correto', () => {
        cy.get('[data-qa="login-email"]').clear().type(testUserEmail);
        cy.get('[data-qa="login-password"]').clear().type(testUserPassword);

        cy.get('[data-qa="login-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible');
        cy.contains('a', 'Logout').click();
    });

    it('Efetuar Login de Usuário com e-mail e senha incorretos', () => {
        cy.get('[data-qa="login-email"]').clear().type('usuario.inexistente@example.com');
        cy.get('[data-qa="login-password"]').clear().type('senha-incorreta');
        cy.get('[data-qa="login-button"]').click();

        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Efetuar Logout', () => {
        cy.get('[data-qa="login-email"]').clear().type(testUserEmail);
        cy.get('[data-qa="login-password"]').clear().type(testUserPassword);
        cy.get('[data-qa="login-button"]').click();

        cy.contains('a', 'Logged in as').should('be.visible');
        cy.contains('a', 'Logout').click();
        cy.url().should('include', '/login');
        cy.get('[data-qa="login-email"]').should('be.visible');
    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        cy.get('[data-qa="signup-name"]').type('michael');
        cy.get('[data-qa="signup-email"]').type(testUserEmail);
        cy.get('[data-qa="signup-button"]').click();

        cy.contains('Email Address already exist!').should('be.visible');
    });

});






//michaelfelipe180@gmail.com
//123456578