import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
export const usePuppeteer = process.env.PPT === 'true';
export const isNativeTest = process.env.IS_NATIVE_TEST || false;

const browserName = process.env.BROWSER_NAME || 'chrome';
const headless = process.env.HEADLESS === 'true';
export const openDevTools = process.env.OPEN_DEVTOOLS === 'true' && ['chrome', 'firefox'].includes(browserName) && !headless;

const browserVersion = process.env.BROWSER_VERSION;
const platformName = process.env.PLATFORM_NAME || linuxOrMac();

const prefs = {
    'intl.accept_languages': 'en,en_US'
};
export const browserCapabilities = (() => {


    if (isNativeTest) {
        return {
            project: process.env.BROWSERSTACK_PROJECT,
            build: process.env.BROWSERSTACK_BUILD,
            name: process.env.BROWSERSTACK_NAME,
            device: process.env.BROWSERSTACK_DEVICE,
            os_version: process.env.BROWSERSTACK_OS_VERSION,
        };
    }

    switch (browserName) {
        case 'edge':
        case 'MicrosoftEdge':

        case 'chrome': {
            const args = headless
                ? ['--headless', '--no-sandbox', '--disable-gpu', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
                : [];

            if (openDevTools) {
                args.push('--auto-open-devtools-for-tabs');
                args.push('--window-size=1990,1024');
            }

            return {
                browserName,
                browserVersion: browserVersion,
                platformName: platformName,
                'goog:chromeOptions': {
                    args,
                    prefs
                }
            };
            configDotenv({
                path: resolve(__dirname, "../.env")
            })
        }
        case 'firefox': {
            const args = headless ? ['--headless=new'] : [];

            if (openDevTools) {
                args.push('-devtools');
            }
            return {
                browserName,
                browserVersion: browserVersion,
                platformName: platformName,
                'moz:firefoxOptions': {
                    // flag to activate Firefox headless mode (see https://developer.mozilla.org/en-US/docs/Web/WebDriver/Capabilities)
                    args,
                    prefs
                }
            };
            configDotenv({
                path: resolve(__dirname, "../.env")
            })
        }
        case 'safari':
            return {
                browserName,
                'safari:options': {
                    args: headless ? ['--disable-gpu', '--disable-infobars', '--ignore-certificate-errors'] : [],
                    prefs
                }
            };

        default:
            return {
                browserName
            };
    }
})();

export const browser = {
    automation: usePuppeteer ? 'puppeteer' : 'selenium',
    name: browserName,
    capabilities: browserCapabilities,
    runner: ''
};

function linuxOrMac() {
    if (process.platform === 'linux') {
        return 'linux';
    } else {
        return 'mac';
    }
}
