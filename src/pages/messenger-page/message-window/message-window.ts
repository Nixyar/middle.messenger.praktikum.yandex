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
                this.setState({chatOpen: true})
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
            chatOpen: false,
            message: '',
            messages: [],
            onBlur: (evt: KeyboardEvent) => {
                evt.preventDefault();
                const input = evt.target as HTMLInputElement;
                const message = input.value.replace("(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta", "");
                this.setState({message});
            },
            onSendMessage: (evt: Event) => {
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
                {{#if chatOpen}}<div class="message-window__chat">
                    <div class="message-window__chat-view">${messages}</div>
                    <form class="message-window__chat-control">
                        {{{InputControl inputName="message" placeholder="Введите сообщение..."
                                        inputValue="${message}"
                                        id="message"
                                        mouseout=onBlur }}}
                        {{{Button textBtn="Send" onClick=onSendMessage}}}
                    </form>
                </div>{{/if}}
            </div>
        `;
    }
}
