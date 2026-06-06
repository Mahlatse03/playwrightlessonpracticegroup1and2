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

}