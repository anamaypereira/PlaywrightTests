import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly whoWeServeLink: Locator;
    readonly financialServicesLink: Locator;

     constructor(page: Page) {
        this.page = page;
        this.whoWeServeLink = page.getByRole('link', { name: 'Who We Serve' });
        this.financialServicesLink = page.getByRole('link', { name: 'Financial Services' });
     }

     async goTo3Csite(){
        await this.page.goto('https://3cloudsolutions.com/');
        await expect(this.page).toHaveTitle(/.*3cloud.*/i);
      }

      async clickFinancialServices(){
        await this.whoWeServeLink.hover();
        await this.financialServicesLink.click();
      }
}
