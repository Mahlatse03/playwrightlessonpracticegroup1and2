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

    async verifyGitUsernameUpdated(gitUsername: string): Promise<string> {
        await this.page.waitForTimeout(3000); 
        const gitUsernameField = this.page.getByPlaceholder('e.g., octocat');
        const actualGitUsername = await gitUsernameField.inputValue();
        console.log (`GitHub username field value: ${actualGitUsername}`);
        return actualGitUsername;
    }
}
