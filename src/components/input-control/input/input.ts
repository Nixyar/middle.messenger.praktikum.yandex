import Block from '../../../../core/Block';
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
}

export class Input extends Block {
    constructor({type = 'text', placeholder, inputName, value, error, onFocus, onBlur}: InputProps) {
        super({
            type, placeholder, inputName, value, error,
            events: {
                focus: onFocus,
                blur: onBlur,
            }
        });
    }

    protected render(): string {
        // language=hbs
        return `
            <input class="input p1" type="{{type}}" placeholder="{{placeholder}}" name="{{inputName}}"
                   value="{{value}}">
        `;
    }
}
