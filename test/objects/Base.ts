/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects selection
 */
import {data} from "../data";

export class Base {
    /**
     * open a url
     * @param {string} path
     * @returns {*}
     */

    public static async open(path) {
        return browser.url(data.redirectURL + (path && path[0] === '/' ? '' : '/') + path);
    }

    /**
     * Clicks on an element
     * @param selector
     * @param parent An optional parent for selecting the click target.
     * @param waitForDisplayed Toggle to disable wait for logic of the click target.
     * @param catchErrors Toggle to disable error catching in this method. By default all errors are caught :(
     * @param scrollIntoView Toggle to enable "scrollIntoView" before checking for "clickability".
     */
    public static async click(
        selector: string,
        parent?: WebdriverIO.Element,
        waitForDisplayed = true,
        catchErrors = true,
        scrollIntoView = false
    ): Promise<void> {
        const target = await Base.select(selector, parent, false, true);

        try {
            if (waitForDisplayed) {
                await target.waitForDisplayed({
                    timeout: 10000
                });
            }
            if (scrollIntoView) {
                await target.scrollIntoView();
            }
            await target.waitForClickable({
                timeout: 10000
            });
        } catch (e) {
            // just for stabilizing
            // no error handling here as this wait selector does not work for every element and there is no
            // useful error message so just skip it in error case :P
            //logger.error(`An error occurred during Base.click method: ${e}`);
            if (!catchErrors) {
                throw e;
            }
        }
        await target.click();
    }

    /**
     * Sets focus context to an iframe
     * @param selector
     * @param [parent]
     */
    public static async focusIframe(selector: string, parent?: WebdriverIO.Element): Promise<void> {
        const iFrame: WebdriverIO.Element = await Base.select(selector, parent, true);
        expect(iFrame).toBeDefined();
        await browser.switchToFrame(iFrame);
    }

    /**
     * Leaves the current iframe context
     */
    public static async leaveIframe(): Promise<void> {
        //logger.debug('leaving iFrame');
        await browser.switchToParentFrame();
    }

    /**
     * Gets an attribute of an element
     * @param selector
     * @param attribute
     * @param parent
     */
    public static async getAttribute(selector: string, attribute: string, parent?: WebdriverIO.Element): Promise<string> {
        const el = await Base.select(selector, parent, true);
        return el.getAttribute(attribute);
    }

    /**
     * Returns an element text
     * @param selector
     * @param [parent]
     * @param [waitForDisplayed] skip waiting for
     */
    public static async getText(
        selector: string,
        parent?: WebdriverIO.Element,
        waitForDisplayed?: boolean
    ): Promise<string> {
        const el = await Base.select(selector, parent, waitForDisplayed);
        // remove new lines and tailing spaces (IE11 compatibility)
        return (await el.getText()).replace(/\u00a0/g, ' ').replace(/\s+$/, '');
    }

    /**
     * Checks if an element is existing. Does not necessarily to be displayed
     * @param selector
     * @param parent
     */
    public static async isExisting(selector: string, parent?: WebdriverIO.Element): Promise<boolean> {
        const element = await this.select(selector, parent, false);
        return element.isExisting();
    }

    /**
     * Returns an element based on another element or a selector
     * @param selector
     * @param [parent] The parent container. Leave it empty to use `document`
     * @param [waitForDisplayed = true] skip waiting for
     * @param [waitForExist = false] skip existing for
     * @param [debug = false] debugging
     */
    public static async select(
        selector: string,
        parent?: WebdriverIO.Element,
        waitForDisplayed = true,
        waitForExist = false,
        debug = false
    ): Promise<WebdriverIO.Element> {
        let element;
        if (selector) {
            if (debug) {
                console.log('DEBUG pre');
                console.log(JSON.stringify(await browser.printPage()));
            }
            element = parent ? await parent.$(selector) : await browser.$(selector);
            if (debug) {
                console.log('DEBUG post');
                console.log(JSON.stringify(await browser.printPage()));
            }
        } else {
            element = parent;
        }
        if (waitForDisplayed) {
            await element.waitForDisplayed({
                timeout: 30000
            });
        }
        if (waitForExist) {
            await element.waitForExist({
                timeout: 30000
            });
        }
        return element;
    }

    /**
     * Switches window handle to iFrame and wait for element to be existing
     * @param selector
     * @param [parent] The parent container. Leave it empty to use `document`
     */
    public static async selectIframe(iframeSelector: string, waitSelector: string): Promise<boolean | void> {
        await Base.waitForDisplayed(iframeSelector, undefined);
        const el = await Base.select(iframeSelector);
        await browser.switchToFrame(el);
        return Base.waitForExist(waitSelector, undefined);
    }

    /**
     * set a value into an element
     * @param selector
     * @param parent
     * @param value
     * @param {boolean} [waitForDisplayed] flag indicating if we should wait for element being displayed
     * @param {boolean} [doClick] if element should be clicked in the first step or not
     * @returns {*}
     */
    public static async setValue(
        selector: string,
        value: string,
        parent?: WebdriverIO.Element,
        waitForDisplayed = true,
        doClick = true
    ) {
        if (doClick) {
            await this.click(selector, parent, waitForDisplayed, false);
        }
        const target = await this.select(selector, parent, waitForDisplayed);
        return target.setValue(value);
    }

    /**
     * get a value from an element
     * @param selector
     * @param parent
     * @param {boolean} [preventWait] skip waiting for
     * @returns {*}
     */
    public static async getValue(selector: string, parent?: WebdriverIO.Element, waitForDisplayed = true) {
        await this.click(selector, parent, waitForDisplayed, false);
        const target = await this.select(selector, parent, waitForDisplayed);
        return target.getValue();
    }

    /**
     * send a key to the browser
     * @param {string} key
     * @returns {*}
     */
    public static async keyPress(key): Promise<void> {
            await browser.keys(key);
    }

    /**
     * Doesn't fail, when the element is there in the given time
     * @param selector
     * @param [parent]
     */
    public static async waitForDisplayed(selector: string, parent?: WebdriverIO.Element): Promise<void> {
        await this.select(selector, parent, true);
    }

    /**
     * Returns true if the element is in the DOM within the given time
     * @param selector
     * @param [parent]
     * @param [timeoutInMs] maximum timeout to wait in milliseconds
     */
    public static async waitForExist(
        selector: string,
        parent?: WebdriverIO.Element,
        timeoutInMs: number = 10000
    ): Promise<boolean | void> {
        return (await Base.select(selector, parent, false)).waitForExist({
            timeout: timeoutInMs
        });
    }

    /**
     * Returns if an element which match the selector and parent is displayed in the dom
     * @param selector
     * @param parent
     */
    public static async isDisplayed(selector: string, parent?: WebdriverIO.Element): Promise<boolean> {
        return (await Base.select(selector, parent, false)).isDisplayed();
    }

    /**
     * Wait until an element contained the expected text node
     * @param selector
     * @param parent
     * @param text
     */
    public static async waitForText(selector: string, parent?: WebdriverIO.Element, text?: string) {
        const el = await this.select(selector, parent, false);
        return browser.waitUntil(async () => {
            return (await el.getText()) === text;
        });
    }

    /**
     * Wait until the page is loaded
     * @param selector
     * @param parent
     * @param text
     */
    public static async pageLoad(){
        browser.waitUntil(
            () => browser.execute(() => document.readyState === 'complete'),
            {
                timeout: 60 * 1000, // 60 seconds
                timeoutMsg: 'Message on failure'
            }
        );
    }

}