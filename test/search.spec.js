import homePage from '../pages/home.page.js';
import searchPage from '../pages/search.page.js';
import {searchWord, searchResult} from '../constants/constants.js';
import assert from 'assert';

before(async () => {
    await homePage.open();
});

describe('Search Test', () => {
    it('Search for a product', async () => {
        await homePage.search(searchWord);
    });

    it('Validate search result', async () => {
        let result = await searchPage.getSearchResultLabelText();
        assert.equal(result, searchResult);
    });
});