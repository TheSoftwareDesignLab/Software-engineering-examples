describe("site page", () => {

  // Before each test, visit the site page
  beforeEach(() => {
    // visit the signin page
    cy.visit("http://localhost:2368/ghost/#/signin")
    // wait for the page to load completely
    cy.wait(1000)
    // login with the admin user
    cy.get('[name="identification"]').type("test@test.com")
    cy.get('[name="password"]').type("ASASDASasadasdwe!")
    cy.get('button[type="submit"]').click()

    // wait for the page to load completely
    cy.wait(1000)

  })

  // Example: open a modal and check if it is visible and exists
  it('opens the search modal', () => {
    cy.get('.gh-nav-btn-search').first().click()
    cy.get('.epm-modal-container').should('exist').and('be.visible')
  })
  
  // Example: type text inside the search modal
  it('types text inside the search modal', () => {
    cy.get('.gh-nav-btn-search').first().click()
    cy.get('[name="selectSearchTerm"]').type('Ghost')
    cy.wait(1000)
    cy.get('[name="selectSearchTerm"]').should('have.value', 'Ghost')
  })
  
  // Example: close the search modal by clicking outside the modal
  it('closes the search modal by clicking outside the modal', () => {
    cy.get('.gh-nav-btn-search').first().click()
  
    cy.get('.epm-modal-container').should('be.visible')
  
    // in this case we use the force:true because .epm-backdrop is covered by .epm-modal-container
    // if we don't use the force:true, the click will not work and we will get an error
    // Timed out retrying after 10050ms: cy.click() failed because this element: 
    // <div class="epm-backdrop " tabindex="-1" role="presentation" aria-hidden="true"></div> is being covered by another element: 
    // <div class="epm-modal-container">...</div> Fix this problem, or use {force: true} to disable error
    cy.get('.epm-backdrop').should('exist').click({ force: true })
  
    cy.get('.epm-modal-container')
      .should('not.exist')
  })
  
})