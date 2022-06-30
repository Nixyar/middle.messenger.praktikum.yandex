import Block from '../../../core/Block';
import './message-window.css';

interface MessageWindowProps {
    profileAvatarUrl: string;
    username: string;
}

export class MessageWindow extends Block<MessageWindowProps> {
    constructor({profileAvatarUrl = '../../../assets/images/profile-test.png', username = 'Username'}: MessageWindowProps) {
        super({profileAvatarUrl, username});
    }

    protected getStateFromProps() {
        this.state = {
            message: '',
            onBlur: (evt: FocusEvent) => {
                const input = evt.target as HTMLInputElement;
                const value = input.value;

                const nextState = {
                    message: value
                };

                this.setState(nextState);
            },
            onSendMessage: (evt: SubmitEvent) => {
                const {message} = this.state;
                evt.preventDefault();
                if (message.length) {
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
                <header class="header-chat">
                    <div class="header-chat__profile-info">
                        <img class="header-chat__profile-info--avatar" src="{{profileAvatarUrl}}"
                             alt="avatar">
                        <p class="header-chat__profile-info--username h4">{{username}}</p>
                    </div>
                    <div class="chat-control">
                        <button type="button">
                            {{{IconSearch}}}
                        </button>
                        <button type="button">
                            {{{IconPhone}}}
                        </button>
                    </div>
                </header>
                <div class="message-window__chat">
                    <div class="message-window__chat-view"></div>
                    <form class="message-window__chat-control">
                        {{{InputControl inputName="message" placeholder="Введите сообщение..." inputValue="${this.state.message}"
                                        id="message"
                                        onBlur=onBlur}}}
                        {{{Button type="submit" classes="sign" textBtn="Send" onClick=onSendMessage}}}
                    </form>
                </div>
            </div>
        `;
    }
}
