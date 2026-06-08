import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    //use a getter for the locator of the element you want to verify on the home page. 
    // This allows you to reuse the locator in multiple methods if needed, and keeps your code organized.
    get verifyHomePage(): Locator {
    return this.page.getByRole('heading', { name: /Welcome\s*back/i });
    }

    async verifyHomePageIsVisible() {
        await this.basePageVerifyElementVisible(this.verifyHomePage);
    }

    async navigateToInstructorPage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text()="Menu"]'));
        await this.page.waitForTimeout(1000); // Add a short wait to ensure the menu is fully expanded before clicking the next button
        //await this.basePageClickElement(this.page.locator('xpath=//button[text()="Instructor Panel"]')); //returns error because there are 2 items
        await this.basePageClickElement(this.page.locator('xpath=//button[text()="Instructor Panel"]').first()); //using first() to click the first matching element
    }

}