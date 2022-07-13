import { Block, BrowseRouter, Store } from '../../../core';
import '../auth-page/auth.css';
import { blurValidationForm, submitFormCheck } from '../../services/form.service';
import { HTTPTransportService } from '../../services/HTTPTransport.service';
import { withRouter, withStore } from '../../utils';

export enum RegistrationValidator {
  FirstName = 'first_name',
  SecondName = 'second_name',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
  Password = 'password',
}

interface RegistrationPageProps {
  router: BrowseRouter;
  store: Store<AppState>;
}

export class RegistrationPage extends Block<RegistrationPageProps> {
  constructor(props: RegistrationPageProps) {
    super(props);
  }

  protected getStateFromProps() {
    this.state = {
      values: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        phone: '',
        password: ''
      },
      errors: {
        first_name: '',
        second_name: '',
        login: '',
        email: '',
        phone: '',
        password: ''
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
          const http = new HTTPTransportService();
          http.post('/auth/signup', { data: values })
            .then(() => {
              http.get('/auth/user')
                .then((user: UserInfo | any) => {
                  window.store.dispatch(JSON.parse(user.response));
                  window.router.go('/messenger');
                });
            });
          console.log('Registration Form', values);
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
                <h1 class="sign__title h1">Sign up</h1>
                {{{InputControl inputName="first_name" label="First name"
                                inputValue="${values.first_name}" error="${errors.first_name}"
                                id="first_name" onBlur=onBlur onFocus=onFocus}}}
                {{{InputControl inputName="second_name" label="Second name"
                                inputValue="${values.second_name}" error="${errors.second_name}"
                                id="second_name" onBlur=onBlur onFocus=onFocus}}}
                {{{InputControl inputName="login" label="Login" inputValue="${values.login}"
                                error="${errors.login}"
                                id="login" onBlur=onBlur onFocus=onFocus}}}
                {{{InputControl inputName="email" label="E-mail" inputValue="${values.email}"
                                error="${errors.email}"
                                id="email" type="email" onBlur=onBlur onFocus=onFocus}}}
                {{{InputControl inputName="phone" label="Phone" inputValue="${values.phone}"
                                error="${errors.phone}"
                                id="phone" type="number" onBlur=onBlur onFocus=onFocus}}}
                {{{InputControl inputName="password" label="Password"
                                inputValue="${values.password}"
                                error="${errors.password}"
                                id="password" onBlur=onBlur onFocus=onFocus}}}
                {{{Button type="submit" classes="sign" textBtn="Sign up" onClick=onSubmit}}}

                <div class="sign__form--link p1">Already have an account? {{{Link text="Sign in"
                                                                                  to="/"}}}</div>
            </form>
        </div>
    `;
  }
}

export default withRouter(withStore(RegistrationPage));
