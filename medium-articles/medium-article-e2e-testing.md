# JavaScript E2E Testing: Test Complete User Workflows

End-to-End (E2E) testing verifies complete user workflows from start to finish. Master Playwright and Cypress to test real user scenarios and catch integration issues.

## Playwright Example

```javascript
import { test, expect } from '@playwright/test';

test('user can login and view dashboard', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://example.com/login');
    
    // Fill login form
    await page.fill('[name="email"]', 'user@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Wait for navigation
    await page.waitForURL('**/dashboard');
    
    // Verify dashboard content
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('.user-name')).toContainText('John Doe');
});
```

## Cypress Example

```javascript
describe('Shopping Cart', () => {
    it('adds items and completes checkout', () => {
        cy.visit('/products');
        
        // Add items to cart
        cy.get('[data-testid="product-1"]').click();
        cy.get('[data-testid="add-to-cart"]').click();
        
        // Go to cart
        cy.get('[data-testid="cart-icon"]').click();
        cy.url().should('include', '/cart');
        
        // Verify cart contents
        cy.get('.cart-item').should('have.length', 1);
        
        // Checkout
        cy.get('[data-testid="checkout-btn"]').click();
        cy.get('[name="cardNumber"]').type('4242424242424242');
        cy.get('[data-testid="submit-payment"]').click();
        
        // Verify success
        cy.contains('Order confirmed').should('be.visible');
    });
});
```

## Best Practices

- Test critical user paths
- Use data-testid attributes
- Handle async operations properly
- Keep tests independent
- Run in CI/CD pipeline
- Use page object pattern
- Avoid flaky tests

## Key Takeaways

- E2E tests verify complete workflows
- Playwright and Cypress are popular tools
- Test from user's perspective
- Handle waits and async operations
- Keep tests maintainable
- Run regularly in CI/CD
- Catch integration issues

## Learn More

Full tutorial at [rws8.tech/tutorials/javascript/e2e-testing](https://rws8.tech/tutorials/javascript/e2e-testing/).

---

**About the Author**

Bohdan Tsap is a software engineer passionate about teaching JavaScript.

**Tags:** #JavaScript #E2ETesting #Playwright #Cypress #Testing #QA
