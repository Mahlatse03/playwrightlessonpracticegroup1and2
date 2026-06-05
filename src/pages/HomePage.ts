import {Page,Locator} from '@playwright/test';  
import { BasePage } from './BasePage';


export class HomePage extends BasePage {

//     get verifyHomePage(): Locator {
//         return this.page.getByRole('heading',{ name: 'Welcome back, Magaye! 👋' });
//     }
    
//  async verifyHomePageIsVisible(){
//     await this.basePageVerifyElementVisible(this.verifyHomePage);
//  }

//Verifying just the static test
    // verifyHomePage(): Locator {
    //     return this.page.getByRole('heading', {
    //         name: /Welcome back/
    // });
    // }

    verifyHomePage(name: string): Locator {
        return this.page.getByRole('heading', {
            name: `Welcome back, ${name}! 👋`
        });
    }

    async verifyHomePageIsVisible(name: string) {
        await this.basePageVerifyElementVisible(
            this.verifyHomePage(name)
        );
    }
}