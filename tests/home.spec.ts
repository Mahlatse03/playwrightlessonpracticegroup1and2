import { expect, test } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/Testdata';
import { readCsv } from '../src/utils/CsvReader';


test.describe('Instructor panel functions', () => {
    test('Open Instructor Panel', async ({ loginPage, homePage, instructorPage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
        await homePage.navigateToInstructorPage();
        await instructorPage.verifyInstructorPageIsVisible();
        await instructorPage.navigateToMytimetable();
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
    test(`Open User Profile Page for ${user.Username}`, async ({ loginPage, homePage, userProfilePage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(user.Username, user.Password);
        await homePage.navigateToUserProfilePage();
        await userProfilePage.verifyUserProfilePageIsVisible();
    });
    
    test.only(`Edit User Profile for ${user.Username}`, async ({ loginPage, homePage, userProfilePage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(user.Username, user.Password);
        await homePage.navigateToUserProfilePage();
        await userProfilePage.editUserProfile(user.Gitusername);
        await userProfilePage.verifyGitUsernameUpdated(user.Gitusername); //ask class to fix this verification method, which is currently not working as expected. It should verify that the GitHub username was updated successfully, but it is not doing so correctly.
    });
   
}
