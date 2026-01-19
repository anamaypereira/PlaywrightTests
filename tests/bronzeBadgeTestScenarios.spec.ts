import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FinancialServicesPage } from '../pages/finServPage';
import { GetStartedPage } from '../pages/getStartedPage';
import { get } from 'node:http';

const test = base.extend<{
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

test.beforeEach(async ({ homePage }) => {
  await homePage.goTo3Csite();
});

test.describe('3Cloud website basic functionality tests', () => {
  test.skip('Who We Serve header dropdown', async ({ homePage }) => {
    await homePage.whoWeServeLink.hover();
    await expect(homePage.financialServicesLink).toBeVisible();
  });

  test.skip('Financial Services link', async ({ homePage }) => {
    await homePage.clickFinancialServices();
    await expect(homePage.page).toHaveTitle(/.*Financial Services*/i);

  });

  test.skip('Lets talk button new page', async ({ newPage }) => {
    await expect(newPage).toHaveTitle(/.*Get Started*/i);
  });

  test('error messages for no input', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(' ', ' ', ' ', ' ', ' ', ' ', ' ');
    await getStartedPage.verifyAllFieldsErrorMessages('Please complete this required field.');
    await getStartedPage.clickSubmit();
    await getStartedPage.submitErrorMessage('Please complete all required fields.');
  });

  test('error message for gmail account', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'anapereira@gmail.com', 'QA', '1234567890', 'This is a comment');
    await getStartedPage.verifySingleFieldErrorMessage('email', 
      'Please enter a different email address. This form does not accept addresses from gmail.com.');
  });

  test('error message for wrong email format', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'ana.com', 'QA', '1234567890', 'This is a comment');
    await getStartedPage.verifySingleFieldErrorMessage('email', 'Email must be formatted correctly.');
  });

  test('error message for wrong phone number format', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'ana@3cloud.com', 'QA', 'stardew', 'This is a comment');
    await getStartedPage.verifySingleFieldErrorMessage('phone',
      'A valid phone number may only contain numbers, +()-. or x');
  });

  test('error message for out of range phone number', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'ana@3cloud.com', 'QA', '123456789012345678901', 'This is a comment');
    await getStartedPage.verifySingleFieldErrorMessage('phone',
      'The number you entered is not in range.');
      await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'ana@3cloud.com', 'QA', '123', 'This is a comment');
    await getStartedPage.verifySingleFieldErrorMessage('phone',
      'The number you entered is not in range.');
  });

  test('all fields have correct input', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(
      'Ana', 'Pereira', 'MyCompany', 'ana@3cloud.com', 'QA', '123456789', 'This is a comment');
    await getStartedPage.verifyAllFieldsNoErrorMessage();
  });
});
