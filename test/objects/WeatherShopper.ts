/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects selection
 */
import {Base} from "./Base";
import {Pom_example} from "../src/pageobjects/pom_example";

export class WeatherShopper {
    /**
     * @returns {*}
     */

    public static async returnTemperature (): Promise<number> {
        const temp = await Base.getText(Pom_example.weatherShopper.landingPage.Temperature);
        const el = temp.split(' ').map(Number);
        return el[0];
    }


}