import {Base} from "../../objects/Base";
import {Pom_example} from "../pageobjects/pom_example";
import {data} from "../../data";

export class FixtureUser extends Base{

    /**
    * Opens a page
    * @param path path of the subpage (e.g. /path/to/page.html)
    */

    public static async login(): Promise<void> {
        await Base.open('');
        //await Base.setValue(Pom_example.loginPage.loginSelector.UserName, data.clientUserName);
        //await Base.setValue(Pom_example.loginPage.loginSelector.Password, data.clientPassword);
        //await Base.click(Pom_example.loginPage.loginSelector.SignInButton);
    }
}