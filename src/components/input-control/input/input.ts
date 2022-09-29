import { Block } from '@core';
import './input.css';

interface InputProps {
    type?: 'text' | 'password' | 'email';
    id: string | number;
    placeholder?: string;
    inputName: string;
    value?: string | number;
    error?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    mouseout?: () => void;
    events?: {};
}

export class Input extends Block {
    constructor({type = 'text', id, placeholder, inputName, value, error, onFocus, onBlur, mouseout}: InputProps) {
        super({
            type, id, placeholder, inputName, value, error,
            events: {
                focus: onFocus,
                blur: onBlur,
                mouseout: mouseout
            }
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <input class="input p1" type="{{type}}" placeholder="{{placeholder}}" name="{{inputName}}"
                   value="{{value}}" id="{{id}}">
        `;
    }
}
