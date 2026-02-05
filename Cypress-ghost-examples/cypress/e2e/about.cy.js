describe("about page", () => {

  // Before each test, visit the about page
  beforeEach(() => {
    cy.visit("http://localhost:2368/about")
  })
  
  // Example, get an element and this has multiple elements with the same class
  it("the subtitles on the about page are correct", () => {

    // You can use the "eq" method to get the element by the index
    cy.get("h3").eq(0).contains("Access all areas")
    cy.get("h3").eq(1).contains("Fresh content, delivered")
    cy.get("h3").eq(2).contains("Meet people like you")
  })

  // Example, scroll to a specific element
  it("scroll to the second subtitle", () => {
    // You can use the "scrollIntoView" method to scroll to the element
    cy.get("h3").eq(1).scrollIntoView()
    cy.get("h3").eq(1).should("be.visible")
    cy.get("h3").eq(1).contains("Fresh content, delivered")
  })

  // Example, scroll to the bottom of the page
  it("scroll to the bottom of the page", () => {
    cy.scrollTo("bottom", { duration: 1000 })
    // Verify that the footer is visible after the scroll
    cy.get("footer").should("be.visible")
  })

  // Example, scroll to a specific position
  it("scroll to a specific position", () => {
    cy.scrollTo(0, 500) // Scroll to 500px from the top
    cy.wait(500)
    cy.scrollTo("50%", "50%") // Scroll to the center of the page
  })

})