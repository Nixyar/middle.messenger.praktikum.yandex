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

  protected render(): string {
    // language=hbs
    return `
      <main>
          <div class="messenger-page">
              {{{ChatsList}}}
              {{{MessageWindow}}}
          </div>
      </main>
    `;
  }
}

export default withRouter(withStore(MessengerPage));
