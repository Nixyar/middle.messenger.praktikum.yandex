import Block from "../../../core/Block";
import './input-cotrol.css';

interface InputControlProps {
    label?: string;
    inputName: string;
    type: string;
    id: string | number;
    inputValue?: string | number;
    placeholder?: string;
    error?: string;
    onBlur?: () => {};
    onFocus?: () => {};
}

export class InputControl extends Block{
    constructor({label, inputName, type, id, inputValue, placeholder, error, onBlur, onFocus}: InputControlProps) {
        super({label, inputName, type, id, inputValue, placeholder, error, onBlur, onFocus});
    }

    protected render(): string {
        // language=hbs
        return `
            <label for="id">
                {{#if label}}<p class="p1">{{label}}</p>{{/if}}
                {{{Input id=id inputName=inputName placeholder=placeholder type=type value=inputValue onFocus=onFocus onBlur=onBlur}}}
                <div class="input__error">{{error}}</div>
            </label>
        `;
    }
}
