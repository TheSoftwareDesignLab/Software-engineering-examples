# Cypress Ghost Examples

This repository contains Cypress test examples demonstrating common testing scenarios using Ghost CMS (version 5.9).

## Test Files Overview

### 1. `home.cy.js` - Element Selection Examples
Demonstrates different methods for selecting elements in Cypress:
- Selecting elements by `data-testid`, `id`, `class`, and `xpath`
- Combining multiple selectors
- Waiting for page load and element visibility
- Working with iframes (checking existence and visibility)

### 2. `about.cy.js` - Scrolling Examples
Shows various scrolling techniques:
- Scrolling to specific elements using `scrollIntoView()`
- Selecting multiple elements with the same class using `eq()`
- Scrolling to the bottom of the page
- Scrolling to specific positions (pixels or percentages)

### 3. `site.cy.js` - Modal Interactions
Covers modal dialog interactions:
- Opening modals (search modal example)
- Typing text inside modals
- Closing modals by clicking outside (using `force: true` for covered elements)
- Verifying modal visibility and existence

### 4. `setup.cy.js` - Form Testing
Demonstrates form handling and validation:
- Filling out forms with multiple fields
- Negative testing (invalid password example)
- Positive testing (successful form submission)
- Verifying error messages
- Checking URL navigation after form submission

## Prerequisites

- Node.js installed
- Ghost CMS running locally on `http://localhost:2368`
- Admin user credentials: `test@test.com` / `ASASDASasadasdwe!`

## Running Tests

Run all tests:
```bash
npx cypress open
```

Run tests in headless mode:
```bash
npx cypress run
```

## Key Concepts Covered

- **Element Selection**: Multiple strategies for finding and selecting DOM elements
- **Scrolling**: Different methods to scroll pages and scroll elements into view
- **Modal Interactions**: Opening, interacting with, and closing modal dialogs
- **Form Handling**: Filling forms and validating both positive and negative scenarios
- **Waiting Strategies**: Using `cy.wait()` and checking element visibility
- **Force Clicks**: Using `{ force: true }` when elements are covered by other elements

## Notes

- Some tests use `cy.wait()` for demonstration purposes. In production tests, prefer waiting for specific elements or conditions.
- The `force: true` option is used when clicking on elements covered by other elements (e.g., modal backdrops).
- Iframes require special handling - Cypress can select the iframe element but cannot directly interact with its internal content.
- **Element Selection Best Practices**: When selecting elements, follow this priority order (from best to worst):
  1. `data-testid` attributes (most reliable and testing-specific)
  2. `id` attributes (unique and stable)
  3. `name` attributes (for form elements)
  4. Semantic selectors like `button[type="submit"]` (meaningful and stable)
  5. `class` selectors (less stable, may change with styling)
  6. Tag selectors like `h1`, `button` (least specific, use with caution)
  7. XPath (avoid if possible, harder to maintain)
