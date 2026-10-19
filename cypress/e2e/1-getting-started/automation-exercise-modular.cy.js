/// <reference types="cypress" />

const testUserEmail = `michaelfelipe${Date.now()}@gmail.com`;
const testUserPassword = '123456578';

function submitLogin(email, password) {
    cy.get('[data-qa="login-email"]').clear().type(email);
    cy.get('[data-qa="login-password"]').clear().type(password);
    cy.get('[data-qa="login-button"]').click();
}

function submitSignup(name, email) {
    cy.get('[data-qa="signup-name"]').type(name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
}

function fillAccountDetails() {
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
}

function logout() {
    cy.contains('a', 'Logout').click();
    cy.url().should('include', '/login');
    cy.get('[data-qa="login-email"]').should('be.visible');
}

describe('Automation Exercise - testes modularizados', { testIsolation: false }, () => {
    before(() => {
        cy.visit('https://www.automationexercise.com');
        cy.get('a[href*=login]').click();
    });

    it('Cadastrar usuario com sucesso', () => {
        submitSignup('michael', testUserEmail);
        fillAccountDetails();

        cy.get('[data-qa="create-account"]').click();
        cy.get('[data-qa="continue-button"]').click();
        cy.contains('a', 'Logged in as').should('be.visible');
        logout();
    });

    it('Efetuar login de Usuario com email e senha correto', () => {
        submitLogin(testUserEmail, testUserPassword);

        cy.contains('a', 'Logged in as').should('be.visible');
        logout();
    });

    it('Efetuar Login de Usuário com e-mail e senha incorretos', () => {
        submitLogin('usuario.inexistente@example.com', 'senha-incorreta');

        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Efetuar Logout', () => {
        submitLogin(testUserEmail, testUserPassword);
        cy.contains('a', 'Logged in as').should('be.visible');
        logout();
    });

    it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
        submitSignup('michael', testUserEmail);
        cy.contains('Email Address already exist!').should('be.visible');
    });
});
