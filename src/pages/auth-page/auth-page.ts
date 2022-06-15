import {Block, renderDOM} from "../../../core/index";
import './auth.css';
import {RegistrationPage} from "../registration-page/registration-page";
import {blurValidationForm, submitFormCheck} from "../../services/form.service";
import MessengerPage from "../messenger-page";

interface AuthProps {
}

export enum AuthValidator {
    Login = 'login',
    Password = 'password',
}

export class AuthPage extends Block {
    constructor(props: AuthProps) {
        super({
            ...props
        });
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                login: '',
                password: '',
            },
            errors: {
                login: '',
                password: '',
            },
            onBlur: (evt: FocusEvent) => {
                const {values, errors} = this.state;
                const input = evt.target as HTMLInputElement;
                this.setState(blurValidationForm(input, values, errors));
            },
            onSubmit: (evt: SubmitEvent) => {
                evt.preventDefault();
                const {values, errors} = this.state;
                const submitCheck = submitFormCheck(values, errors);
                if (submitCheck) {
                    this.setState(submitCheck);
                } else {
                    console.log('Login Form', values);
                    renderDOM(new MessengerPage({}));
                }
            },
            toRegistration: () => {
                renderDOM(new RegistrationPage({}));
            },
        }
    }

    protected render(): string {
        const {values, errors} = this.state;
        // language=hbs
        return `
            <main class="sign-container">
                <form class="sign__form">
                    <h1 class="sign__title h1">Sign in</h1>
                    {{{InputControl inputName="login" label="Login" inputValue="${values.login}" error="${errors.login}"
                                    id="login"
                                    onBlur=onBlur
                                    onFocus=onFocus}}}
                    {{{InputControl inputName="password" type="password" label="Password"
                                    inputValue="${values.password}"
                                    onBlur=onBlur
                                    error="${errors.password}"
                                    id="password" onFocus=onFocus}}}
                    {{{Button type="submit" classes="sign" textBtn="Sign in" onClick=onSubmit}}}
                    <div class="sign__form--link p1">{{{Link text="Sign up" linkToFunc=toRegistration}}} for new user</div>
                </form>
            </main>
        `
    };
}
