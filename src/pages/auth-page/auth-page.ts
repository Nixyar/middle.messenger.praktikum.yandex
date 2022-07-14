import { Block, BrowseRouter, Store } from '../../../core/index';
// Services
import { blurValidationForm, submitFormCheck } from '../../services/form.service';
import { submitSign } from '../../services/submitForm.service';
// Styles
import './auth.css';
// Utils
import { withRouter, withStore } from '../../utils';

type LoginPageProps = {
  router: BrowseRouter;
  store: Store<AppState>;
};

export class AuthPage extends Block<LoginPageProps> {
  constructor(props: LoginPageProps) {
    super(props);
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
        const {
          values,
          errors
        } = this.state;
        const input = evt.target as HTMLInputElement;
        this.setState(blurValidationForm(input, values, errors));
      },
      onSubmit: (evt: SubmitEvent) => {
        evt.preventDefault();
        const {
          values,
          errors
        } = this.state;
        const submitCheck = submitFormCheck(values, errors);
        if (submitCheck) {
          this.setState(submitCheck);
        } else {
          submitSign(values, '/auth/signin');
        }
      }
    };
  }

  protected render(): string {
    const {
      values,
      errors
    } = this.state;
    // language=hbs
    return `
        <div class="sign-container">
            <form class="sign__form">
                <h1 class="sign__title h1">Sign in</h1>
                {{{InputControl inputName="login" label="Login" inputValue="${values.login}"
                                error="${errors.login}"
                                id="login"
                                onBlur=onBlur
                                onFocus=onFocus}}}
                {{{InputControl inputName="password" type="password" label="Password"
                                inputValue="${values.password}"
                                onBlur=onBlur
                                error="${errors.password}"
                                id="password" onFocus=onFocus}}}
                {{{Button type="submit" classes="sign" textBtn="Sign in" onClick=onSubmit}}}
                <div class="sign__form--link p1">{{{Link text="Sign up" to="/sign-up"}}} for new
                    user
                </div>
            </form>
        </div>
    `;
  };
}

export default withRouter(withStore(AuthPage));
