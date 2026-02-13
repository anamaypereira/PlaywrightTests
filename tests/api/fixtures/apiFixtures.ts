import { test as base } from '@playwright/test';

// Export test and expect from Playwright
export const test = base;
export { expect } from '@playwright/test';

// Add API-specific fixtures here as needed
// Example:
// export const test = base.extend<{ apiClient: YourAPIClient }>({
//   apiClient: async ({ request }, use) => {
//     const client = new YourAPIClient(request);
//     await use(client);
//   }
// });
