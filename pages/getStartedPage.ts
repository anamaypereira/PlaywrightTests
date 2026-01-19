import { type Locator, type Page, expect } from '@playwright/test';

export class GetStartedPage {
    readonly page: Page;
    readonly firstNameTextBox: Locator;
    readonly lastNameTextBox: Locator;
    readonly companyNameTextBox: Locator;
    readonly emailTextBox: Locator;
    readonly jobTitleTextBox: Locator;
    readonly phoneNumberTextBox: Locator
    readonly commentTextBox: Locator;
    readonly submitButton: Locator
    readonly fnameErrorMessage: Locator;
    readonly lnameErrorMessage: Locator;
    readonly companyErrorMessage: Locator;
    readonly emailErrorMessage: Locator;
    readonly jobTitleErrorMessage: Locator;
    readonly phoneErrorMessage: Locator;
    readonly commentErrorMessage: Locator;
    readonly submitBtnErrorMessage: Locator;

     constructor(page: Page) {
        this.page = page;
        // Form is inside an iframe, so we need to use frameLocator
        const formIframe = page.frameLocator('iframe').first();
        this.firstNameTextBox = formIframe.locator('//input[contains (@id, "firstname")]');
        this.lastNameTextBox = formIframe.locator('//input[contains (@id, "lastname")]');
        this.companyNameTextBox = formIframe.locator('//input[contains (@id, "company")]');
        this.emailTextBox = formIframe.locator('//input[contains (@id, "email")]');
        this.jobTitleTextBox = formIframe.locator('//input[contains (@id, "jobtitle")]');
        this.phoneNumberTextBox = formIframe.locator('//input[contains (@id, "phone")]');
        this.commentTextBox = formIframe.locator('//textarea[contains (@id, "message")]');
        this.submitButton = formIframe.locator('//input[@type="submit"]');
        this.fnameErrorMessage = formIframe.locator(
            '//span[contains (text(), "First")]/parent::label//following-sibling::ul//label');
        this.lnameErrorMessage = formIframe.locator(
            '//span[contains (text(), "Last")]/parent::label//following-sibling::ul//label');
        this.companyErrorMessage = formIframe.locator(
            '//span[contains (text(), "Company")]/parent::label//following-sibling::ul//label');
        this.emailErrorMessage = formIframe.locator(
            '//span[contains (text(), "Email")]/parent::label//following-sibling::ul//label');
        this.jobTitleErrorMessage = formIframe.locator(
          '//span[contains (text(), "Job title")]/parent::label//following-sibling::ul//label');
        this.phoneErrorMessage = formIframe.locator(
          '//span[contains (text(), "Phone number")]/parent::label//following-sibling::ul//label');
        this.commentErrorMessage = formIframe.locator(
          '//span[contains (text(), "Comments")]/parent::label//following-sibling::ul//label');
        this.submitBtnErrorMessage = formIframe.locator('.hs_error_rollup');
     }

      async fillDetails(fname: string, lname: string, company: string, email: string, jobTitle: string, phone: string, comment: string){
        await this.firstNameTextBox.fill(fname);
        await this.lastNameTextBox.fill(lname);
        await this.companyNameTextBox.fill(company);
        await this.emailTextBox.fill(email);
        await this.jobTitleTextBox.fill(jobTitle);
        await this.phoneNumberTextBox.fill(phone);
        await this.commentTextBox.fill(comment);
      }

      async clickSubmit(){
        await this.submitButton.click();
      }

      async verifyAllFieldsErrorMessages(expectedMessage: string){
        await expect(this.fnameErrorMessage).toHaveText(expectedMessage);
        await expect(this.lnameErrorMessage).toHaveText(expectedMessage);
        await expect(this.companyErrorMessage).toHaveText(expectedMessage);
        await expect(this.emailErrorMessage).toHaveText(expectedMessage);
        await expect(this.jobTitleErrorMessage).toHaveText(expectedMessage);
        await expect(this.phoneErrorMessage).toHaveText(expectedMessage);
        await expect(this.commentErrorMessage).toHaveText(expectedMessage);
      }

      async verifySingleFieldErrorMessage(fieldName: 'fname' | 'lname' | 'company' | 'email' | 'jobTitle' | 'phone' | 'comment', expectedMessage: string){
        const errorLocators = {
          fname: this.fnameErrorMessage,
          lname: this.lnameErrorMessage,
          company: this.companyErrorMessage,
          email: this.emailErrorMessage,
          jobTitle: this.jobTitleErrorMessage,
          phone: this.phoneErrorMessage,
          comment: this.commentErrorMessage
        };
        await expect(errorLocators[fieldName]).toHaveText(expectedMessage);
      }

      async submitErrorMessage(expectedMessage: string){
        await expect(this.submitBtnErrorMessage).toHaveText(expectedMessage);
      }

      async verifyAllFieldsNoErrorMessage(){
        await expect(this.fnameErrorMessage).toBeHidden();
        await expect(this.lnameErrorMessage).toBeHidden();
        await expect(this.companyErrorMessage).toBeHidden();
        await expect(this.emailErrorMessage).toBeHidden();
        await expect(this.jobTitleErrorMessage).toBeHidden();
        await expect(this.phoneErrorMessage).toBeHidden();
        await expect(this.commentErrorMessage).toBeHidden();
      }
        
}