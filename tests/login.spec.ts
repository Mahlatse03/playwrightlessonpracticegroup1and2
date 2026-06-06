import { expect, test } from '../src/fixtures/customFixtures';
import { validUsers, invalidUsers } from '../src/data/Testdata';

test.describe('Login Functionality', () => {
    test('Positive login - Admin', async ({ loginPage, homePage }, testInfo) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
        await homePage.verifyHomePageIsVisible();
    
    });

    test('Missing Credentials', async ({ loginPage, homePage }, testInfo) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.clickLoginButton(); //using xpath to click login without entering credentials

    
        //take screenshot of home page after login
        await testInfo.attach('homePageScreenshot', {path: 'Screenshots/LoginSuccess.png', contentType: 'image/png'});
    
    });

    test('Negative login - Invalid username', async ({ loginPage, page }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(invalidUsers.invalidUserOne.email, invalidUsers.invalidUserOne.password);
        
        //interact with alert using Promise.all
    
        //a race condition occurs when two things happen almost simultaneously, 
        // and the test fails if they happen in the wrong order. Promise.all is Playwright's primary weapon against race conditions.
    
        await Promise.all([
            // This listener waits for the dialog event to fire
            page.waitForEvent('dialog').then(async (dialog) => {
            const alertText = dialog.message();
            expect(alertText).toContain('Invalid credentials');
            await dialog.accept();
            }),

            // This triggers the alert
            page.getByRole('button', { name: 'Login' }).click()
        ]);
    });
});

