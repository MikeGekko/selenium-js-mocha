import webdriver from '../utils/webdriver.js';

export default new (class SearchPage {
    searchResultLabel = async () => await webdriver.getElement('[class*="search-heading"]');
    filterInput = async () => await webdriver.getElement('rz-sort > select');
    filterOption = async (value) => await webdriver.getElement(`select option[value*="${value}"]`);
    itemPriceList = async (item) => await webdriver.getElement(`li:nth-child(${item}) span[class="goods-tile__price-value"]`);

    async getSearchResultLabelText() {
        return await (await this.searchResultLabel()).getText();
    }

    async filterResult (option) {
        await (await this.filterInput()).click()
        await (await this.filterOption(option)).click()
    }

    async getFirstSecondItemPrice() {
        const result = []
        await webdriver.driver.navigate().refresh()
        result.push(await(await this.itemPriceList(1)).getText())
        result.push(await(await this.itemPriceList(2)).getText())
        return result
    }
})();
