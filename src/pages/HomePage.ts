import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

    //use a getter for the locator of the element you want to verify on the home page. 
    // This allows you to reuse the locator in multiple methods if needed, and keeps your code organized.
    get verifyHomePage(): Locator {
    return this.page.getByRole('heading', { name: /Welcome\s*back/i }); // /i to make it case-insensitive, \s* to allow for any amount of whitespace between words 
    }

    async verifyHomePageIsVisible() {
        await this.basePageVerifyElementVisible(this.verifyHomePage);
    }

    async navigateToInstructorPage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text()="Menu"]'));
        await this.page.waitForTimeout(1000); // Add a short wait to ensure the menu is fully expanded before clicking the next button
       //using first() to click the first matching element
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(., "Instructor Panel")]').first());
        //await this.basePageClickElement(this.page.getByRole('button', { name: /Instructor Panel/i })); //recommended
        //resistant to UI structure changes and accessibility-focused
    }

     async navigateToUserProfilePage() {
        await this.basePageClickElement(this.page.locator('xpath=//button//span[text()="Menu"]'));
        await this.page.waitForTimeout(1000); // Add a short wait to ensure the menu is fully expanded before clicking the next button
        await this.basePageClickElement(this.page.getByText('My Profile')); //using getByText to click the My Profile button, which is more resistant to UI structure changes and accessibility-focused
     
    }

}