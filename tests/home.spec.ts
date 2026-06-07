import { expect, test } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/Testdata';


test.describe('Menu functions', () => {
    test.only('Open Instructor Panel', async ({ loginPage, homePage, instructorPage }) => {
        await loginPage.basePageGoToUrl('/');
        await loginPage.navigateToLoginPage();
        await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
        await homePage.navigateToInstructorPage();
        await instructorPage.verifyInstructorPageIsVisible();
    });


// test.describe('Learning Functionality', () => {
//     test('Curriculum ', async ({ homePage }) => {


//     });




// test.describe('Testimonial Functionality', () => {

    
// });
});
