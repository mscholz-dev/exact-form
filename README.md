Fonts -> Saria condensed && Exo2

=> All refacto but not FormSignin and FormContact

// TEST //

e2e: this is simply where we write our E2E tests
interface: we’ll get back to this later; it isn’t required by Cypress, but we’ll use this to organize our code
support: this is where we will write our custom commands with TypeScript
tasks: this is where we will write our custom tasks

// has class ???
cy.get('locator')
.should('have.class', 'validClassname')
.and('not.have.class', 'invalidClassname');
