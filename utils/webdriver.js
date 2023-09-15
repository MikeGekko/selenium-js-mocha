import {Builder, By, until} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import config from '../config/config.js';

export default new (class WebDriver {
    constructor() {
        this.driver = new Builder().forBrowser(config.browser).setChromeOptions(new chrome.Options().headless()).setFirefoxOptions(new firefox.Options().headless()).build();
        this.driver.manage().window().maximize();
        this.driver.manage().setTimeouts({implicit: config.timeout});
    }

    async openUrl(url) {
        await this.driver.get(url);
    }

    async quit() {
        await this.driver.quit();
    }

    async getElement(locator, timeout = config.timeout) {
        try {
            const element = await this.driver.findElement(By.css(locator));
            await this.driver.wait(until.elementIsVisible(element), timeout);
            return element;
        } catch (error) {
            throw new Error(`Failed to find element with locator: ${locator},\nError message: ${error.message}`);
        }
    }
})();
