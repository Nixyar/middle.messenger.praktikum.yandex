import {Block} from "@core";
import './chat-header.css';

type ChatHeaderProps = {
    userLogin: string;
    userAvatar: string;
}

export class ChatHeader extends Block<ChatHeaderProps> {
    constructor(props: ChatHeaderProps) {
        super(props);
    }

    componentDidMount() {
        const nextState = {
            ...this.state, user: window.store.getState().user
        };
        this.setState(nextState)
        window.store.on('changed', (prev, next) => {
            if (prev.user !== next.user) {
                const nextState = {
                    ...this.state, user: next.user
                };
                this.setState(nextState)
            }
        });
    }

    protected getStateFromProps() {
        this.state = {
            user: null
        };
    }

    protected render(): string {
        // @ts-ignore
        const {user} = this.state;
        // language=hbs
        return `
            <header class="header-chat">
                <div class="header-chat__profile-info">
                    {{#if user.avatar}}<img class="header-chat__profile-info--avatar" src="https://ya-praktikum.tech/api/v2/resources/${user?.avatar}" alt="avatar">{{/if}}
                    <p class="header-chat__profile-info--username h4">${user?.login}</p>
                </div>
<!--                <div class="chat-control">-->
<!--                    <button type="button">{{{IconSearch}}}</button>-->
<!--                    <button type="button">{{{IconPhone}}}</button>-->
<!--                </div>-->
            </header>
        `;
    }
}
