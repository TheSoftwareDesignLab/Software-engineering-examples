describe("home page", () => {

  // Before each test, visit the home page (Ghost 5.9)
  beforeEach(() => {
    cy.visit("http://localhost:2368/")
  })

  // Example: get an element and check if it contains the correct text
  it("the h1 contains the correct text", () => {
    
    // It is recommended to use the "data-testid" attribute to get the element
    // But, if the element does not have the "data-testid" attribute, you can use the 
    // "h1" selector, the "id" selector, the "class" selector or the "xpath" selector or a combination of them
    // For example (by data-testid):
    //cy.get('[data-testid="h1"]').should('contain.text', 'Ghost')
    // Or (by id):
    //cy.get('#blog-title').should('contain.text', 'Ghost')
    // Or (by class):
    //cy.get('.blog-title').should('contain.text', 'Ghost')
    // Or (by xpath):
    //cy.get('//h1[contains(text(), "Ghost")]').should('contain.text', 'Ghost')
    // Or (by combination of selectors):
    //cy.get('h1.blog-title').should('contain.text', 'Ghost')
    // In this case the element does not have the "data-testid" attribute or the "id" attribute
    cy.get('h1').should('contain.text', 'Ghost')
  })

  // Example: wait for the page to load completely
  it("wait for the page to load completely", () => {
    // Wait for the h1 element to be visible
    cy.get('h1', { timeout: 10000 }).should('be.visible')
    // Wait for the document to be ready
    cy.document().its('readyState').should('eq', 'complete')
  })

  // Example: iframe
  // In some cases, elements in the first view may look like a modal or popup.
  // However, you must be careful: in the DOM this is actually an iframe.
  //
  // Cypress can select the iframe as a regular element,
  // but it cannot automatically access or interact with the elements inside it.
  //
  // For this reason, we only check that the iframe exists and is visible, instead of interacting with its internal content.
  it('opens the subscription popup', () => {
    cy.get('.gh-head-button').click()
  
    cy.get('#ghost-portal-root iframe', { timeout: 10000 })
      .should('exist')
      .and('be.visible')
  })
  
})
