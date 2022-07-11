import {Block} from "../../../core";
// Styles
import './messenger.css';

interface MessengerPageProps {}

export class MessengerPage extends Block<MessengerPageProps> {
    constructor(props: MessengerPageProps) {
        super(props);
    }

    protected getStateFromProps() {
        this.state = {
            chats: []
        }
    }

    protected render(): string {
        const {chats} = this.state;
        // language=hbs
        return `
            {{#Layout name="Messenger"}}
                <div class="messenger-page">
                    {{{ChatsList chatList="${chats}"}}}
                    {{{MessageWindow}}}
                </div>
            {{/Layout}}
        `
    }
}
