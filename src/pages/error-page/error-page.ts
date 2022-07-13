import { Block, Router, Store } from '../../../core';
import './error-page.css';
import { withRouter, withStore } from '../../utils';
import { RegistrationPage } from '../registration-page/registration-page';

interface ErrorPageProps {
    router: Router;
    store: Store<AppState>;
}

export class ErrorPage extends Block<ErrorPageProps> {
    constructor(props: ErrorPageProps) {
        super(props);
    }
    protected getStateFromProps() {
        this.state = {
            goBack: () => {
                this.props.router.go('/');
            }
        };
    }
    protected render(): string {
        // language=hbs
        return `
            {{#Layout name="Settings"}}
                {{{Button classes="sign" textBtn="Go back" onClick=onSubmit}}}
            {{/Layout}}
        `
    }
}

export default withRouter(withStore(RegistrationPage))
