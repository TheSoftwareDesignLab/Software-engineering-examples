# Cold Tests vs Hot Tests

When writing automated tests, you will face different initial state scenarios. Some tests require an empty database and an unconfigured application, while others require pre-existing users or specific data. Recognizing the difference between **cold tests** and **hot tests** is essential for correctly structuring your testing strategy.

### Cold Test
A cold test is one that requires a **clean initial state** of the application (empty database, no registered users).

### Hot Test
A hot test is one that requires **pre-existing state or data** (registered users, prior configuration).

---

## Examples

### Cold Test: `setup.cy.js`

**Requires:** Clean database, no registered users.

This is a cold test because it validates Ghost's initial setup process, which only works when there are no users in the system.

```javascript
describe("setup page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2368/ghost/#/setup")
  })

  it("fill the form and click the button, positive test", () => {
    cy.get("#blog-title").type("Test Blog")
    cy.get("#name").type("Test Name")
    cy.get("#email").type("test@test.com")
    cy.get("#password").type("ASASDASasadasdwe!")
    cy.get("#ember8").click()
    
    cy.wait(1000)
    cy.url().should("include", "/setup/done")
  })
})
```

---

### Hot Test: `site.cy.js`

**Requires:** Already registered user (`test@test.com` / `ASASDASasadasdwe!`).

This is a hot test because it needs to authenticate with existing credentials to test admin panel features.

**Ghost Behavior:**
- If a user already exists, Ghost automatically redirects to `/ghost/#/signin` (login)
- If no admin user has been created yet, Ghost automatically redirects to `/ghost/#/setup` (initial configuration)

Therefore, this test only works if the cold test that created the user was previously executed.

```javascript
describe("site page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2368/ghost/#/signin")
    cy.wait(1000)
    // Login con usuario existente
    cy.get('[name="identification"]').type("test@test.com")
    cy.get('[name="password"]').type("ASASDASasadasdwe!")
    cy.get('button[type="submit"]').click()
    cy.wait(1000)
  })

  it('opens the search modal', () => {
    cy.get('.gh-nav-btn-search').first().click()
    cy.get('.epm-modal-container').should('exist').and('be.visible')
  })
})
```

---

### State-Independent Tests: `home.cy.js` and `about.cy.js`

**Require:** No specific state — work at any time.

These are neutral tests; they test public pages that do not depend on authentication or configuration.

```javascript
describe("home page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:2368/")
  })

  it("the h1 contains the correct text", () => {
    cy.get('h1').should('contain.text', 'Ghost')
  })
})
```

---

## Comparison Table

| File | Type | Requires | Purpose |
|------|------|----------|---------|
| `setup.cy.js` | Cold | Clean DB | Validate initial setup |
| `site.cy.js` | Hot | Registered user | Validate admin features |
| `home.cy.js` | Neutral | Nothing | Validate public page |
| `about.cy.js` | Neutral | Nothing | Validate public page |

---

## Recommended Execution Order

1. **Cold tests first** → `setup.cy.js` (creates the user)
2. **Hot tests next** → `site.cy.js` (uses the created user)
3. **Neutral tests** → `home.cy.js`, `about.cy.js` (any time)
