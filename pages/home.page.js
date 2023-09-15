import {Key} from 'selenium-webdriver';
import webdriver from '../utils/webdriver.js';
import config from '../config/config.js';

export default new (class HomePage {
    searchInput = async () => await webdriver.getElement('[name="search"]');

    async open() {
        await webdriver.openUrl(config.baseUrl + '/ua');
    }

    async search(search) {
        await (await this.searchInput()).clear()
        await (await this.searchInput()).sendKeys(search, Key.ENTER);
    }
})();
