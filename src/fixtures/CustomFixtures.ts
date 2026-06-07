import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { InstructorPage } from '../pages/InstructorPage';
// import { AdminPage } from '../pages/adminPage';
// import { StudentPage } from '../pages/studentPage';

type CustomFixtures = { 
    loginPage: LoginPage;
    homePage: HomePage;
    instructorPage: InstructorPage;
    // adminPage: AdminPage;
    // studentPage: StudentPage;
};

// --> base.extend
// base: This is the original Playwright test runner (usually imported as import { test as base } from '@playwright/test').
// .extend: This is a built-in function that says: "Keep everything the original runner can do, 
// but add these extra capabilities on top of it."

// --> <CustomFixtures> (The Generics)
// These angle brackets are TypeScript Generics.
// It tells the .extend function exactly what the new "shape" of the test runner will look like.
// By passing your CustomFixtures type here, you are guaranteeing that whenever someone writes a test, 
// they will get autocomplete for your page objects (like loginPage).

export const test = base.extend<CustomFixtures>({ //create instances of pages
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

   instructorPage: async ({ page }, use) => {
        await use(new InstructorPage(page));
    }

    // adminPage: async ({ page }, use) => {
    //     await use(new AdminPage(page));
    // },

    // studentPage: async ({ page }, use) => {
    //     await use(new StudentPage(page));
    // }
});

export { expect } from '@playwright/test';
