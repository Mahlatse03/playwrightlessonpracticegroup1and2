import { test } from '../src/fixtures/customFixtures';
import { validUsers } from '../src/data/Testdata';

test('Positive login - Admin', async ({ loginPage }) => {
    await loginPage.basePageGoToUrl('/');
    await loginPage.userLogin(validUsers.admin.email, validUsers.admin.password);
});
