import { Block } from '@core';
import './message-window.css';
import {WebsocketService} from '@services';

export class MessageWindow extends Block {
    websocket = new WebsocketService();

    constructor() {
        super();
    }

    protected getStateFromProps() {
        this.state = {
            message: '',
            onBlur: (evt: FocusEvent) => {
                const input = evt.target as HTMLInputElement;
                const value = input.value.replace("(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta", "");

                const nextState = {
                    message: value
                };

                this.setState(nextState);
            },
            onSendMessage: (evt: SubmitEvent) => {
                const {message} = this.state;
                evt.preventDefault();
                if (message.length) {
                    this.websocket.sendMessage(message);
                    this.websocket.getOldMessages();
                    console.log('Message: ', message);

                    const nextState = {
                        message: ''
                    };

                    return this.setState(nextState);
                }
            }
        };
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="message-window">
                {{{ChatHeader}}}
                <div class="message-window__chat">
                    <div class="message-window__chat-view"></div>
                    <form class="message-window__chat-control">
                        {{{InputControl inputName="message" placeholder="Введите сообщение..."
                                        inputValue="${this.state.message}"
                                        id="message"
                                        onBlur=onBlur}}}
                        {{{Button type="submit" classes="sign" textBtn="Send" onClick=onSendMessage}}}
                    </form>
                </div>
            </div>
        `;
    }
}
