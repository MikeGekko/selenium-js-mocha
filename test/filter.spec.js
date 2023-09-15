import homePage from '../pages/home.page.js';
import searchPage from '../pages/search.page.js';
import {searchWord, searchResult} from '../constants/constants.js';
import assert from 'assert';
import webdriver from '../utils/webdriver.js';

before(async () => {
    await homePage.open();
});

describe('Filter Test', () => {
    it('Search for a product', async () => {
        await homePage.search(searchWord);
    });

    it('Validate search result', async () => {
        let result = await searchPage.getSearchResultLabelText();
        assert.equal(result, searchResult);
    });

    it('Filter by price', async () => {
        await searchPage.filterResult(1);
        const url = await webdriver.driver.getCurrentUrl()
        assert(url.includes('&sort=cheap'));
    });

    it('Validate filtered result', async () => {
        let result = await searchPage.getFirstSecondItemPrice();
        assert(parseInt(result[0]) < parseInt(result[1]));
    });
});
