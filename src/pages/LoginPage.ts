import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";

export class LoginPage extends BasePage {

//private readOnly pageUrl: string = 'https://ndosisimplifiedautomation.vercel.app'; //relative url of the login page

    async openNdosiPage() {
        await this.basePageGoToUrl('/');
    
    }

    async navigateToLoginPage() {
        await this.basePageClickElement(this.page.getByRole('button', { name: 'Login' }));
        //await expect(this.page.locator('#login-email')).toBeVisible(); //causes test to fail if login page is not visible after clicking login button
        await this.basePageVerifyElementVisible(this.page.locator('#login-email')); //using base page method to verify login page is visible after clicking login button
         //best practice is to put this assertion in the test

    }

    async userLogin(username: string, password: string) {
        // Fill username and password fields using helper from BasePage:
        await this.basePageEnterText(this.page.locator('#login-email'), username);
        await this.basePageEnterText(this.page.locator('#login-password'), password);
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(., "Login")]')); //using xpath

        //puttiing an assertion here is not best practice, but it can be done if you want to verify login success immediately after login action.
        //The Only Exceptions (When to use expect in a POM)
        //Guard Assertions (Ensuring State)
        //Immediate Feedback (Critical Actions)
        //Debugging (Troubleshooting Failures)
    }

    //combine all methods to call one full login method in the test
    async performFullLogin(username: string, password: string) {
        await this.basePageGoToUrl('/');
        await this.navigateToLoginPage();
        await this.userLogin(username, password);
    }

    async clickLoginButton() {
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(., "Login")]')); //using xpath
    }

    // Assert failed login message -Move to test 
    async assertFailedUsername() {
        await this.basePageVerifyElementVisible(this.page.locator('#flash'));
        // if needed you can use playwright's api directly instead of basePage methods
        await expect(this.page.locator('#flash')).toContainText('Invalid credentials. Please try again.');
    }
}