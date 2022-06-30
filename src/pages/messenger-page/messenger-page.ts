import {Block} from "../../../core";
import './messenger.css';

interface MessengerPageProps {}

export class MessengerPage extends Block<MessengerPageProps> {
    protected render(): string {
        // language=hbs
        return `
            <main class="messenger-page">
                {{{ChatsList}}}
                {{{MessageWindow}}}
            </main>
        `
    }
}
