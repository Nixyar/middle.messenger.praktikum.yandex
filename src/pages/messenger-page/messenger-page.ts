import {Block} from "../../../core";
import './messenger.css';

export class MessengerPage extends Block {
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
