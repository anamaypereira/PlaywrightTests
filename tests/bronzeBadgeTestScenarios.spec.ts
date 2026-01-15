import { test, expect } from '@playwright/test';

test.beforeAll(async ({ page }) => {
  await page.goto('https://3cloudsolutions.com/');
  await expect(page).toHaveTitle('3Cloud');
});

test('Who We Serve header dropdown', async ({ page }) => {
  await page.getByRole('link', {name: 'Who We Serve'}).hover();
  await expect(page.getByText('INDUSTRIES')).toBeVisible(); 
});

test('Financial Services link', async ({ page }) => {
  //await page.getByRole('link', {name: 'Financial Services'}).click();
  
});

test('Lets talk button new page', async ({page}) => {

});

test('error message for incorrect email', async ({page}) => {

});

test('error message for phone number', async ({page}) => {

});

test('successful submission of Get Started inquiry', async ({page}) => {

});
