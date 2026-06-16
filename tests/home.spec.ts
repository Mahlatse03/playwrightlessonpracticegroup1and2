import { expect, test } from '../src/fixtures/CustomFixtures';
import { validUsers } from '../src/data/Testdata';
import { readCsv } from '../src/utils/CsvReader';
import { log } from 'node:console';


test.describe('Instructor panel functions', () => {
    test('Open Instructor Panel', async ({ loginPage, homePage, instructorPage, page }) => {
        // await loginPage.basePageGoToUrl('/');
        // await loginPage.navigateToLoginPage();
        // await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
        await loginPage.performFullLogin(validUsers.admin.email, validUsers.admin.password)
        await homePage.navigateToInstructorPage();
        await instructorPage.verifyInstructorPageIsVisible();
        await instructorPage.navigateToMytimetable();
        // Verify navigation to My Timetable succeeded
        await expect(page).toHaveURL(/.*timetable/i);
    });



// test.describe('Learning Functionality', () => {
//     test('Curriculum ', async ({ homePage }) => {


//     });


// test.describe('Testimonial Functionality', () => {

    
// });
});

const users = readCsv('src/data/PlaywrightTests.csv');

for (const user of users) {
    //take care to use backticks and ${} to create dynamic test titles that include the username, which improves test reporting and debugging.
    test(`Open User Profile Page for ${user.Username}`, async ({ loginPage, homePage, userProfilePage, page }) => {
        // await loginPage.basePageGoToUrl('/');
        // await loginPage.navigateToLoginPage();
        // await loginPage.userLogin(user.Username, user.Password);
        await loginPage.performFullLogin(user.Username, user.Password);
        await homePage.navigateToUserProfilePage();
        
        //await userProfilePage.verifyUserProfilePageIsVisible();
       
        // Assert that the My Profile heading is visible
        await expect(page.getByRole('heading', { name: /My\s*Profile/i })).toBeVisible({ timeout: 4000 });
    });
    
    test(`Edit User Profile for ${user.Username}`, async ({ loginPage, homePage, userProfilePage, page }) => {
        // await loginPage.basePageGoToUrl('/');
        // await loginPage.navigateToLoginPage();
        // await loginPage.userLogin(user.Username, user.Password);
         await loginPage.performFullLogin(user.Username, user.Password);
        await homePage.navigateToUserProfilePage();
        await userProfilePage.editUserProfile(user.Gitusername);
        const updatedUsername = await userProfilePage.verifyGitUsernameUpdated(user.Gitusername);
        // Assert that the GitHub username was successfully updated
        await expect(page.getByPlaceholder('e.g., octocat')).toHaveValue(user.Gitusername);
        expect(updatedUsername).toBe(user.Gitusername);
    });
   
}
