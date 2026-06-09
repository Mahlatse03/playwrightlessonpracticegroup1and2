import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';

export class UserProfilePage extends BasePage {

    get verifyUserProfilePage(): Locator {
        return this.page.getByRole('heading', { name: /My\s*Profile/i });
    }

    async verifyUserProfilePageIsVisible() {
        await this.basePageVerifyElementVisible(this.verifyUserProfilePage);
    }

    async editUserProfile(gitUsername: string) {
        await this.basePageClickElement(this.page.locator('css=button:has-text("Edit Profile")')); //using css selector to click the Edit Profile button
        await this.basePageEnterText(this.page.getByPlaceholder('e.g., octocat'), gitUsername); //using getByPlaceholder to enter text into the GitHub Username field, which is more resistant to UI structure changes and accessibility-focused
        await this.basePageClickElement(this.page.locator('css=button:has-text("Save Changes")')); //using css selector to click the Save Changes button
    }

    async verifyGitUsernameUpdated(gitUsername: string) {
        await this.page.waitForTimeout(3000); 
        const actualGitUsername = await this.basePageGetElementText(this.page.getByPlaceholder('e.g., octocat'));
        console.log (`Actual GitHub username: ${actualGitUsername}`);    //using getByPlaceholder to get the text of the GitHub Username field
        if (actualGitUsername !== gitUsername) {
            throw new Error(`Expected GitHub username "${gitUsername}", but found "${actualGitUsername}"`);
        }
    }
}
