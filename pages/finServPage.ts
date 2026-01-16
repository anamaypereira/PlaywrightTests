import { type Locator, type Page, type BrowserContext, expect } from '@playwright/test';

export class FinancialServicesPage {
    readonly page: Page;
    readonly letsTalkButton: Locator;

     constructor(page: Page) {
        this.page = page;
        this.letsTalkButton = page.locator('.btn.btn-primary.mt-4').first();
     }

      async clickLetsTalkAndGetNewPage(context: BrowserContext): Promise<Page> {
        const pagePromise = context.waitForEvent('page');
        await this.letsTalkButton.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
      }
}