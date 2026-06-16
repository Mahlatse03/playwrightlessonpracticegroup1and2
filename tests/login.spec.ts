import { expect, test } from '../src/fixtures/CustomFixtures';
import { validUsers, invalidUsers } from '../src/data/Testdata';

test.describe('Login Functionality', () => {
    test('Positive login - Admin', async ({ loginPage, homePage, page }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
         //soft assertion
        await expect.soft(page).toHaveURL(/dashboard/);
        await homePage.verifyHomePageIsVisible();
    
    });

    test.only('Positive login via API - class user', async ( {request} ) => {
        const response = await request.post('https://www.ndosiautomation.co.za/APIDEV/login', {
            //payload
            data: {
            "email": validUsers.classUser.email,
            "password": validUsers.classUser.password
            }
        });
        const body = await response.json();
        console.log (body);
        expect(response.status()).toBe(200);
       // expect(body.data.user.firstname).toBe(validUsers.classUser.name);
        expect(body.message).toBe("Login successful");
        
    
    });

    test('Missing Credentials', async ({ loginPage, page }, testInfo) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        
        // Expect error message or alert when trying to login without credentials
        await Promise.all([
            page.waitForEvent('dialog').then(async (dialog) => {
                const alertText = dialog.message();
                expect(alertText).toBeTruthy(); // Verify alert appears
                await dialog.accept();
            }),
            loginPage.clickLoginButton()
        ]);
        
        //take screenshot of home page after failed login attempt
        await testInfo.attach('failedLoginScreenshot', {path: 'Screenshots/LoginFailed.png', contentType: 'image/png'});
    });

    test('Negative login - Invalid username', async ({ loginPage, page }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(invalidUsers.invalidUserOne.email, invalidUsers.invalidUserOne.password);
        
        //interact with alert using Promise.all
    
        //a race condition occurs when two things happen almost simultaneously, 
        // and the test fails if they happen in the wrong order. 
        // Promise.all is Playwright's primary weapon against race conditions.
    
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

