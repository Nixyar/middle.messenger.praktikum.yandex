import {Block} from "@core";
import {IconsProps} from "../icons.interface";

export class IconProfile extends Block {
    constructor({color = '#BFBFBF', width = 24, height = 24, onClick}: IconsProps) {
        super({color, width, height, events: {click: onClick}});
    }

    protected render(): string {
        // language=hbs
        return `
            <svg height="{{height}}" viewBox="0 0 24 24" width="{{width}}" xmlns="http://www.w3.org/2000/svg">
                <path fill="{{color}}"
                      d="m21 24h-2v-5.043a2.96 2.96 0 0 0 -2.957-2.957h-8.086a2.96 2.96 0 0 0 -2.957 2.957v5.043h-2v-5.043a4.963 4.963 0 0 1 4.957-4.957h8.086a4.963 4.963 0 0 1 4.957 4.957z"/>
                <path fill="{{color}}"
                      d="m12 12a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6zm0-10a4 4 0 1 0 4 4 4 4 0 0 0 -4-4z"/>
            </svg>
        `;
    }
}
