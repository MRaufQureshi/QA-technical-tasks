import {Pom_example} from '../pageobjects/pom_example';
import {Base} from "../../objects/Base";
import {FixtureUser} from "../fixtures/Fixture";
import {WeatherShopper} from "../../objects/WeatherShopper";

describe('E2E tests cases (Weather Shopper)', () => {

    beforeEach(async () => {
        await FixtureUser.login();
    });

    afterAll(async () =>{
    })

   it('should load and verify UI', async () => {
        await Base.pageLoad();

        console.log ('Checking if Weathershopper UI is displayed successfully');

        await expect(Base.select(Pom_example.weatherShopper.landingPage.Title)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.Temperature)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.TitleToolTip)).toBeDisplayed();
        await expect(Base.click(Pom_example.weatherShopper.landingPage.TitleToolTip));
        await expect(Base.select(Pom_example.weatherShopper.landingPage.moisturizers.Title)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.moisturizers.Description)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.moisturizers.ButtonBuyMoisturizers)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.sunscreens.Title)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.sunscreens.Description)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.sunscreens.ButtonBuySunscreens)).toBeDisplayed();
    });

    it('should verify "Your Task" tooltip', async () => {
        console.log ('Checking if "Your Task" tooltip is displayed and is clickable');
        await Base.click(Pom_example.weatherShopper.landingPage.TitleToolTip);
        await expect(Base.select(Pom_example.weatherShopper.landingPage.TitleToolTipHeader)).toBeDisplayed();
        await expect(Base.select(Pom_example.weatherShopper.landingPage.TitleToolTipBody)).toBeDisplayed();
    });

    it('should verify temp. and navigate to Moisturizers URL', async () => {
        console.log ('Checking if temp. is below 19 Degree');
        const temp = await WeatherShopper.returnTemperature();
        if (temp <= 19) {
            await expect(temp).toBeLessThanOrEqual(19);
            await Base.click(Pom_example.weatherShopper.landingPage.moisturizers.ButtonBuyMoisturizers);
        } else if (temp >= 34) {
            await expect(temp).toBeGreaterThanOrEqual(34);
            await Base.click(Pom_example.weatherShopper.landingPage.sunscreens.ButtonBuySunscreens);
        } else {
            console.log('Current temperature is above 19; Sunscreens test case will be executed');
        }


    });

    it('should verify temp. and navigate to Sunscreens URL', async () => {
        console.log ('Checking if temp. is above 34 Degree');
        const temp = await WeatherShopper.returnTemperature();
        if (temp >= 34) {
            await expect(temp).toBeGreaterThanOrEqual(34);
            await Base.click(Pom_example.weatherShopper.landingPage.sunscreens.ButtonBuySunscreens);
        } else if (temp <= 19) {
            await expect(temp).toBeLessThanOrEqual(19);
            await Base.click(Pom_example.weatherShopper.landingPage.moisturizers.ButtonBuyMoisturizers);
        } else {
            console.log('Current temperature is below 34; Moisturizers test case will be executed');
        }
    });
});