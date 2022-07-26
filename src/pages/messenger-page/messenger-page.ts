import { Block, BrowseRouter, Store } from '@core';
// Utils
import { withRouter, withStore } from '@utils';
// Styles
import './messenger.css';

interface MessengerPageProps {
  router: BrowseRouter;
  store: Store<AppState>;
}

export class MessengerPage extends Block<MessengerPageProps> {
  constructor(props: MessengerPageProps) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      if (!window.store.getState().user) {
        window.router.go('/');
      }
    }, 200);
  }

  protected getStateFromProps() {
    this.state = {
      chats: []
    };
  }

  protected render(): string {
    const { chats } = this.state;
    // language=hbs
    return `
      <main>
          <div class="messenger-page">
              {{{ChatsList chatList="${chats}"}}}
              {{{MessageWindow}}}
          </div>
      </main>
    `;
  }
}

export default withRouter(withStore(MessengerPage));
