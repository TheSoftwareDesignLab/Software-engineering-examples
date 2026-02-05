describe("setup page", () => {

  // Before each test, visit the setup page
  beforeEach(() => {
    cy.visit("http://localhost:2368/ghost/#/setup")
  })

  
  // Example, fill the form and click the button, negative test
  it("fill the form and click the button, negative test", () => {
    // In case of the element does not have the "data-testid" attribute, you can use the "id" selector
    // type the text into the element
    cy.get("#blog-title").type("Test Blog")
    cy.get("#name").type("Test Name")
    cy.get("#email").type("test@test.com")
    cy.get("#password").type("testpassword")
    // click the button
    cy.get("#ember8").click()
    // Wait for the error message to be visible
    cy.wait(1000)
    // Verify that text "Sorry, you cannot use an insecure password" is visible
    // selects the element with class 'response' that is a direct child of the element with id 'ember7'
    cy.get('#ember7 > .response').should("contain.text", "Sorry, you cannot use an insecure password")
  })

  // Example, fill the form and click the button, positive test
  it("fill the form and click the button, positive test", () => {

    // In case of the element does not have the "data-testid" attribute, you can use the "id" selector
    // type the text into the element
    cy.get("#blog-title").type("Test Blog")
    cy.get("#name").type("Test Name")
    cy.get("#email").type("test@test.com")
    cy.get("#password").type("ASASDASasadasdwe!")
    // click the button
    cy.get("#ember8").click()

    // wait for the next page to load
    cy.wait(1000)
    // Verify that the url includes "/ghost/#/dashboard"
    cy.url().should("include", "/setup/done")
  })

})