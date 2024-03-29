import { Block, BrowseRouter, Store } from '@core';
import './error-page.css';
import { withRouter, withStore } from '@utils';

interface ErrorPageProps {
  router: BrowseRouter;
  store: Store<AppState>;
}

export class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected getStateFromProps() {
    this.state = {
      goBack: () => {
        window.router.go('/');
      }
    };
  }

  protected render(): string {
    // language=hbs
    return `
        <main>
            {{{Button classes="sign" textBtn="Go back" onClick=goBack}}}
        </main>
        `;
  }
}

export default withRouter(withStore(ErrorPage));
