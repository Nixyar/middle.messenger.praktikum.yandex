import Block from '../../../core/Block';
import './button.css';

interface ButtonProps {
    textBtn: string;
    type: string;
    classes: string;
    onClick?: () => void;
}

export class Button extends Block {
    constructor({textBtn, type = 'button', classes, onClick}: ButtonProps) {
        super({textBtn, type, classes, events: {click: onClick}});
    }

    protected render(): string {
        // language=hbs
        return `
            <button class="btn {{classes}}" type="{{type}}" onclick="{{onClick}}">{{textBtn}}</button>
        `;
    }
}
