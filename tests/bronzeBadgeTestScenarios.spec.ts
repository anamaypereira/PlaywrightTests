import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { FinancialServicesPage } from '../pages/finServPage';
import { GetStartedPage, GetStartedForm } from '../pages/getStartedPage';
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

const getValidFormData = (): GetStartedForm => ({
  fname: 'Ana',
  lname: 'Pereira',
  company: 'MyCompany',
  email: 'anapereira@3cloud.com',
  jobTitle: 'QA',
  phone: '123456789',
  comment: 'This is a comment'
});

test.beforeEach(async ({ homePage }) => {
  await homePage.goTo3Csite();
});

test.describe('3Cloud website Get Started fields validation', () => {
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
    const formNullData: GetStartedForm = {
      fname: '',
      lname: '',
      company: '',
      email: '',
      jobTitle: '',
      phone: '',
      comment: ''
    };
    await getStartedPage.fillDetails(formNullData);
    await getStartedPage.clickSubmit();
    await verifyAllFieldsErrorMsgs(getStartedPage, 'Please complete this required field.');
    await verifySubmitErrorMsg(getStartedPage, 'Please complete all required fields.');
  });

  test('error message for gmail account', async ({ getStartedPage }) => {
    const formData = { ...getValidFormData(), email: 'anapereira@gmail.com' };
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'email',
      'Please enter a different email address. This form does not accept addresses from gmail.com.');
  });

  test('error message for wrong email format', async ({ getStartedPage }) => {
    const formData = { ...getValidFormData(), email: 'ana.com' };
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'email', 'Email must be formatted correctly.');
  });

  test('error message for wrong phone number format', async ({ getStartedPage }) => {
    const formData = { ...getValidFormData(), phone: 'stardewvalley' };
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'phone',
      'A valid phone number may only contain numbers, +()-. or x');
  });

  test('error message for out of range phone number', async ({ getStartedPage }) => {
    const formData = { ...getValidFormData(), phone: '123456789012345678901' };
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'phone',
      'The number you entered is not in range.');
    formData.phone = '123';
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'phone',
      'The number you entered is not in range.');
  });

  test('all fields have correct input', async ({ getStartedPage }) => {
    await getStartedPage.fillDetails(getValidFormData());
    await verifyAllFieldsNoErrorMsg(getStartedPage);
  });

  test('incorrect email, null company and job title', async ({ getStartedPage }) => {
    const formData = { ...getValidFormData() , company: '', email: 'anapereira.com', jobTitle: '' };
    await getStartedPage.fillDetails(formData);
    await verifySingleFieldErrorMsg(getStartedPage, 'email', 'Email must be formatted correctly.');
    await verifySingleFieldErrorMsg(getStartedPage, 'company', 'Please complete this required field.');
    await verifySingleFieldErrorMsg(getStartedPage, 'jobTitle', 'Please complete this required field.');
  });
  
});

// Helper functions
const verifyAllFieldsErrorMsgs = async (getStartedPage: GetStartedPage, expectedMessage: string) => {
  await expect(getStartedPage.fnameErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.lnameErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.companyErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.emailErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.jobTitleErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.phoneErrorMessage).toHaveText(expectedMessage);
  await expect(getStartedPage.commentErrorMessage).toHaveText(expectedMessage);
};

const verifySingleFieldErrorMsg = async (getStartedPage: GetStartedPage, fieldName: 'fname' | 'lname' | 'company' | 'email' | 'jobTitle' | 'phone' | 'comment', expectedMessage: string) => {
  const errorLocators = {
    fname: getStartedPage.fnameErrorMessage,
    lname: getStartedPage.lnameErrorMessage,
    company: getStartedPage.companyErrorMessage,
    email: getStartedPage.emailErrorMessage,
    jobTitle: getStartedPage.jobTitleErrorMessage,
    phone: getStartedPage.phoneErrorMessage,
    comment: getStartedPage.commentErrorMessage
  };
  await expect(errorLocators[fieldName]).toHaveText(expectedMessage);
};

const verifySubmitErrorMsg = async (getStartedPage: GetStartedPage, expectedMessage: string) => {
  await expect(getStartedPage.submitBtnErrorMessage).toHaveText(expectedMessage);
};

const verifyAllFieldsNoErrorMsg = async (getStartedPage: GetStartedPage) => {
  await expect(getStartedPage.fnameErrorMessage).toBeHidden();
  await expect(getStartedPage.lnameErrorMessage).toBeHidden();
  await expect(getStartedPage.companyErrorMessage).toBeHidden();
  await expect(getStartedPage.emailErrorMessage).toBeHidden();
  await expect(getStartedPage.jobTitleErrorMessage).toBeHidden();
  await expect(getStartedPage.phoneErrorMessage).toBeHidden();
  await expect(getStartedPage.commentErrorMessage).toBeHidden();
};