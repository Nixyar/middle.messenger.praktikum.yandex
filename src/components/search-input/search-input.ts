import { Block } from '@core';
import './search-input.css';

export class SearchInput extends Block {
    constructor() {
        super();
    }
    protected render(): string {
        // language=hbs
        return `
            <label class="search-input__label">
                <input class="search-input p1" type="search" placeholder="Search" name="search">
                <button type="button">
                    {{{IconSearch}}}
                </button>
            </label>
        `;
    }
}
