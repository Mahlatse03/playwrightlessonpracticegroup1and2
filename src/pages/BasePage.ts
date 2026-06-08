import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    // Base page export: Making the “blueprint” available to the rest of your project, 
    // because Typescript files are private by default.
    // BasePage stores Playwright `Page` instance. Class is protected, so only extending classes can access it.
    //Check notes to explain the Base classconcept
    protected readonly page: Page; // to interact with browser

    constructor(page: Page) {
        this.page = page;
    }

    async basePageGoToUrl(url: string) {
        console.log(`Navigating to ${url}`); //use parameter on url
        await this.page.goto(url);
    }

    //second lesson
    // async basePageClickElement(locator: Locator, options?: { force?: boolean }) {
    //     console.log(`Clicking on element: ${locator}`);
    //     if (options?.force) {
    //         await locator.click({ force: true }); //Click the element even if some actionability checks fail.
    //         return; //stop here
    //     }
    //     await locator.scrollIntoViewIfNeeded();
    //     await locator.click();
    // }

    async basePageClickElement(locator: Locator) {
        await locator.click();
    }


    async basePageEnterText(locator: Locator, text: string) {
        console.log(`Entering text: "${text}" into element: ${locator}`);
        await locator.fill(text);
    }

    async basePageVerifyElementVisible(locator: Locator) {
        console.log(`Verifying element is visible: ${locator}`);
        await expect(locator).toBeVisible({ timeout: 4000});
        
    }
}
