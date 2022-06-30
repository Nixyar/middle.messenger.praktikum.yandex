import {Block} from "../../../../core";
import {IconsProps} from "../icons.interface";

export class IconExit extends Block {
    constructor({color = '#BFBFBF', width = 24, height = 24}: IconsProps) {
        super({color, width, height});
    }

    protected render(): string {
        // language=hbs
        return `
            <svg width="{{width}}" height="{{height}}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                        d="M10.0003 11.25V1.25M3.8975 3.74832C2.27125 5.33603 1.25 7.5422 1.25 9.99435C1.25 14.8237 5.16875 18.75 10 18.75C14.8338 18.75 18.75 14.8237 18.75 9.99435C18.75 7.54595 17.7413 5.33603 16.1188 3.74832"
                        stroke="{{color}}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }
}
