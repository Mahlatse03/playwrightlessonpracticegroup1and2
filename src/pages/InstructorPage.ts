import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';


export class InstructorPage extends BasePage {

    get verifyInstructorPage(): Locator {
        return this.page.getByRole('heading', { name: /Instructor\s*Dashboard/i });
    }

    async verifyInstructorPageIsVisible() {
        await this.basePageVerifyElementVisible(this.verifyInstructorPage);
    }

     async navigateToMytimetable() {
        await this.basePageClickElement(this.page.locator('xpath=//button[contains(., "My Timetable")]')); 
        
    }

}

