import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";

export class LoginPage extends BasePage {
  async openNdosiPage() {
        await this.basePageGoToUrl('/');
    
    }

    async userLogin(username: string, password: string) {
        // Fill username and password fields using helper from BasePage:
        await this.basePageEnterText(this.page.locator('#login-email'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(., "Login")]'));
    }

    // Assert failed login message -Move to test 
    // async assertFailedUsername() {
    //     await this.basePageExpectVisible(this.page.locator('#flash'));
    //     // if needed you can use playwright's api directly instead of basePage methods
    //     await expect(this.page.locator('#flash')).toContainText('Your username is invalid!');
    // }
}