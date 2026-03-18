import { Page, Locator } from '@playwright/test';

export class FactorialPage {
  readonly page: Page;
  readonly numberInput: Locator;
  readonly calculateBtn: Locator;
  readonly resultMessage: Locator;
  readonly aboutLink: Locator;
  readonly termsAndConditionsLink: Locator;
  readonly privacyLink: Locator;
  readonly qxf2Link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.numberInput = page.locator('#number');
    this.calculateBtn = page.locator('#getFactorial');
    this.resultMessage = page.locator('#resultDiv');
    this.aboutLink = page.getByRole('link', { name: 'About' });
    this.termsAndConditionsLink = page.getByRole('link', { name: 'Terms and Conditions' });
    this.privacyLink = page.getByRole('link', { name: 'Privacy' });
    this.qxf2Link = page.getByRole('link', { name: 'Qxf2 Services' });
  }

  async navigate() {
    await this.page.goto('https://qainterview.pythonanywhere.com/');
  }

  async calculateFactorial(num: string) {
    await this.numberInput.fill(num);
    await this.calculateBtn.click();
  }
}
