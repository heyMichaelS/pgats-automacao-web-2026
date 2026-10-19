/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Automation Exercise - seletores XPath', () => {
    const password = '123456578';
    const userName = 'PGATS Aut';

    const openLoginPage = () => {
        cy.visit('https://www.automationexercise.com');
        cy.xpath('//a[contains(@href, "login")]').click();
        cy.contains('Login to your account').should('be.visible');
    };

    const registerUser = (email) => {
        openLoginPage();
        cy.xpath('//*[@data-qa="signup-name"]').type(userName);
        cy.xpath('//*[@data-qa="signup-email"]').type(email);
        cy.xpath('//*[@data-qa="signup-button"]').click();

        cy.xpath('//*[@id="id_gender2"]').check();
        cy.xpath('//*[@data-qa="password"]').type(password);
        cy.xpath('//*[@data-qa="days"]').select('10');
        cy.xpath('//*[@data-qa="months"]').select('May');
        cy.xpath('//*[@data-qa="years"]').select('1990');
        cy.xpath('//*[@id="newsletter"]').check();
        cy.xpath('//*[@id="optin"]').check();
        cy.xpath('//*[@data-qa="first_name"]').type('PGATS');
        cy.xpath('//*[@data-qa="last_name"]').type('Aut');
        cy.xpath('//*[@data-qa="company"]').type('PGATS');
        cy.xpath('//*[@data-qa="address"]').type('Example Address');
        cy.xpath('//*[@data-qa="address2"]').type('Address 2');
        cy.xpath('//*[@data-qa="country"]').select('United States');
        cy.xpath('//*[@data-qa="state"]').type('California');
        cy.xpath('//*[@data-qa="city"]').type('San Francisco');
        cy.xpath('//*[@data-qa="zipcode"]').type('12345');
        cy.xpath('//*[@data-qa="mobile_number"]').type('999999999');
        cy.xpath('//*[@data-qa="create-account"]').click();

        cy.contains('Account Created!').should('be.visible');
        cy.xpath('//*[@data-qa="continue-button"]').click();
        cy.contains(`Logged in as ${userName}`).should('be.visible');
    };

    const loginUser = (email) => {
        cy.xpath('//*[@data-qa="login-email"]').clear().type(email);
        cy.xpath('//*[@data-qa="login-password"]').clear().type(password);
        cy.xpath('//*[@data-qa="login-button"]').click();
    };

    const logoutUser = () => {
        cy.xpath('//a[contains(@href, "logout")]').click();
        cy.url().should('include', '/login');
        cy.contains('Login to your account').should('be.visible');
    };

    const deleteAccount = () => {
        cy.xpath('//a[contains(@href, "delete_account")]').click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.xpath('//*[@data-qa="continue-button"]').click();
    };

    it('Caso de Teste 01: Registrar usuário', () => {
        const email = `pgats.xpath.${Date.now()}@mail.com`;

        registerUser(email);
        deleteAccount();
    });

    it('Caso de Teste 02: Login com e-mail e senha corretos', () => {
        const email = `pgats.xpath.${Date.now()}@mail.com`;

        registerUser(email);
        logoutUser();
        openLoginPage();
        loginUser(email);

        cy.contains(`Logged in as ${userName}`).should('be.visible');
        deleteAccount();
    });

    it('Caso de Teste 03: Login com e-mail e senha incorretos', () => {
        openLoginPage();
        cy.xpath('//*[@data-qa="login-email"]').type(`invalid.${Date.now()}@mail.com`);
        cy.xpath('//*[@data-qa="login-password"]').type('senha-incorreta');
        cy.xpath('//*[@data-qa="login-button"]').click();

        cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Caso de Teste 04: Deslogar usuário', () => {
        const email = `pgats.xpath.${Date.now()}@mail.com`;

        registerUser(email);
        logoutUser();
        openLoginPage();
        loginUser(email);
        cy.contains(`Logged in as ${userName}`).should('be.visible');
        logoutUser();

        openLoginPage();
        loginUser(email);
        deleteAccount();
    });

    it('Caso de Teste 05: Cadastrar usuário com e-mail já existente', () => {
        const email = `pgats.xpath.${Date.now()}@mail.com`;

        registerUser(email);
        logoutUser();
        openLoginPage();

        cy.xpath('//*[@data-qa="signup-name"]').type(userName);
        cy.xpath('//*[@data-qa="signup-email"]').type(email);
        cy.xpath('//*[@data-qa="signup-button"]').click();
        cy.contains('Email Address already exist!').should('be.visible');

        loginUser(email);
        deleteAccount();
    });
});
