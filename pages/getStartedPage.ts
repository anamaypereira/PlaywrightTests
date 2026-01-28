import { type Locator, type Page, expect } from '@playwright/test';

export interface GetStartedForm {
  fname: string, lname: string, company: string, email: string, jobTitle: string, phone: string, comment: string
}

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

      async fillDetails(formData: GetStartedForm){
        await this.firstNameTextBox.fill(formData.fname);
        await this.lastNameTextBox.fill(formData.lname);
        await this.companyNameTextBox.fill(formData.company);
        await this.emailTextBox.fill(formData.email);
        await this.jobTitleTextBox.fill(formData.jobTitle);
        await this.phoneNumberTextBox.fill(formData.phone);
        await this.commentTextBox.fill(formData.comment);
      }

      async clickSubmit(){
        await this.submitButton.click();
      }
        
}