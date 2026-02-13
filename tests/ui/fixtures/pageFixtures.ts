import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/3cloudSite/homePage';
import { FinancialServicesPage } from '../pages/3cloudSite/finServPage';
import { GetStartedPage } from '../pages/3cloudSite/getStartedPage';

export const test = base.extend<{
  homePage: HomePage,
  finServPage: FinancialServicesPage,
  getStartedPage: GetStartedPage,
  newPage: Page,
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  finServPage: async ({ page }, use) => {
    const finServPage = new FinancialServicesPage(page);
    await use(finServPage);
  },
  newPage: async ({ homePage, finServPage, context }, use) => {
    await homePage.clickFinancialServices();
    const newPage = await finServPage.clickLetsTalkAndGetNewPage(context);
    await use(newPage);
    await newPage.close();
  },
  getStartedPage: async ({ newPage }, use) => {
    const getStartedPage = new GetStartedPage(newPage);
    await use(getStartedPage);
  }
});

export { expect } from '@playwright/test';
