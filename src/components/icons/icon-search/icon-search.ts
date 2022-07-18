import {Block} from "../../../../core";
import {IconsProps} from "../icons.interface";

export class IconSearch extends Block {
    constructor({color = '#BFBFBF', width = 24, height = 24}: IconsProps) {
        super({color, width, height});
    }

    protected render(): string {
        // language=hbs
        return `
            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="{{width}}" height="{{height}}">
                <path fill="{{color}}" d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"/>
            </svg>
        `;
    }
}
