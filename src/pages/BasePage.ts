import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    // BasePage stores Playwright `Page` instance. Class is protected, so only extending classes can access it.
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
        await locator.scrollIntoViewIfNeeded();
        await locator.click();
    }


    async basePageEnterText(locator: Locator, text: string) {
        console.log(`Entering text: "${text}" into element: ${locator}`);
        await locator.scrollIntoViewIfNeeded();
        await locator.fill(text);
    }

    async basePageVerifyElementVisible(locator: Locator) {
        console.log(`Verifying element is visible: ${locator}`);
        await expect(locator).toBeVisible();
    }
}
