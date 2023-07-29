/**
 * Containing specific selectors and methods for a specific page
 */

export const Pom_example = {

    /**loginPage: {
        loginSelector: {
            UserName: '[id="user-name"]',
            Password: '[id="password"]',
            SignInButton: '[id="login-button"]'
        }
    },*/

    weatherShopper:{
        landingPage:{
            Title: '.justify-content-center > h2',
            TitleToolTip: '[data-original-title]',
            TitleToolTipHeader: '.popover-header',
            TitleToolTipBody: '.popover-body',
            Temperature: '* :not(span) #temperature ',

            moisturizers:{
                Title: '.top-space-20 > div:nth-child(1) > h3',
                Description: '.top-space-20 > div:nth-child(1) > p',
                ButtonBuyMoisturizers:'a[href^="/moisturizer"]'
            },
            sunscreens:{
                Title: '.top-space-20 > div:nth-child(2) > h3',
                Description: '.top-space-20 > div:nth-child(2) > p',
                ButtonBuySunscreens:'a[href^="/sunscreen"]'

            }
        }
    },

};