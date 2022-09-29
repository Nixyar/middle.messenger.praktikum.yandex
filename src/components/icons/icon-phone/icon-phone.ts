import {Block} from "@core";
import {IconsProps} from "../icons.interface";

export class IconPhone extends Block {
    constructor({color = '#BFBFBF', width = 24, height = 24}: IconsProps) {
        super({color, width, height});
    }

    protected render(): string {
        // language=hbs
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="{{width}}" height="{{height}}">
                <path fill="{{color}}"
                      d="M23,11a1,1,0,0,1-1-1,8.008,8.008,0,0,0-8-8,1,1,0,0,1,0-2A10.011,10.011,0,0,1,24,10,1,1,0,0,1,23,11Zm-3-1a6,6,0,0,0-6-6,1,1,0,1,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0Zm2.183,12.164.91-1.049a3.1,3.1,0,0,0,0-4.377c-.031-.031-2.437-1.882-2.437-1.882a3.1,3.1,0,0,0-4.281.006l-1.906,1.606A12.784,12.784,0,0,1,7.537,9.524l1.6-1.9a3.1,3.1,0,0,0,.007-4.282S7.291.939,7.26.908A3.082,3.082,0,0,0,2.934.862l-1.15,1C-5.01,9.744,9.62,24.261,17.762,24A6.155,6.155,0,0,0,22.183,22.164Z"/>
            </svg>
        `;
    }
}
