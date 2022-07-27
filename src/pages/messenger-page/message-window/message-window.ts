import { Block } from '@core';
import './message-window.css';
import {WebsocketService} from '@services';

type MessageWindowProps = {
}

export class MessageWindow extends Block<MessageWindowProps> {
    websocket = new WebsocketService();

    constructor(props: MessageWindowProps) {
        super(props);
    }

    componentDidMount() {
        window.store.on('changed', (prev, next) => {
            if (prev.user !== next.user) {
                this.setState({userInfo: window.store.getState().user})
            }
            if (prev.chatId !== next.chatId) {
                if (this.state.userInfo) {
                    this.websocket.connectToWebsocket(this.state.userInfo.id, +next.chatId);
                    this.websocket.getOldMessages();
                }
            }
            if (prev.messages !== next.messages) {
                const nextState = {
                    ...this.state, messages: next.messages
                };
                this.setState(nextState)
            }
        });
    }

    protected getStateFromProps() {
        this.state = {
            userInfo: null,
            message: '',
            messages: [],
            onBlur: (evt: FocusEvent) => {
                const input = evt.target as HTMLInputElement;
                const value = input.value.replace("(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta", "");

                const nextState = {
                    message: value
                };

                this.setState(nextState);
            },
            onSendMessage: (evt: SubmitEvent) => {
                evt.preventDefault();
                const {message} = this.state;
                if (message.length) {
                    this.websocket.sendMessage(message);
                    this.setState({message: ''});
                }
            }
        };
    }

    protected render(): string {
        const {message, messages} = this.state;
        // language=hbs
        return `
            <div class="message-window">
                {{{ChatHeader}}}
                <div class="message-window__chat">
                    <div class="message-window__chat-view">${messages}</div>
                    <form class="message-window__chat-control">
                        {{{InputControl inputName="message" placeholder="Введите сообщение..."
                                        inputValue="${message}"
                                        id="message"
                                        onBlur=onBlur}}}
                        {{{Button type="submit" classes="sign" textBtn="Send" onClick=onSendMessage}}}
                    </form>
                </div>
            </div>
        `;
    }
}
