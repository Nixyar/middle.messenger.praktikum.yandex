import { Block } from '@core';
import "./chats-list.css";
import { createChat, getChats, logout } from '@services';

interface ChatListProps {
    chatList: ChatItem[];
}

export class ChatsList extends Block {
    constructor(props: ChatListProps) {
        super(props);
    }

    componentDidMount() {
        this.state.getNewListChat();
    }

    protected getStateFromProps() {
        this.state = {
            chats: null,
            getNewListChat: () => {
                getChats().then((chats: XMLHttpRequest | any) => {
                    this.state.chats = JSON.parse(chats.response);
                });
            },
            createChat: () => {
                createChat().then(() => {
                    this.state.getNewListChat();
                });
            },
            onLogout: (evt: Event) => {
                evt.preventDefault();
                logout().then(() => {
                    window.store.dispatch({user: null});
                    window.router.go('/');
                });
            },
            toSettings: (evt: Event) => {
                evt.preventDefault();
                window.router.go('/settings');
            }
        };
    }

    protected render(): string {
        // @ts-ignore
        const {chats} = this.state;
        // language=hbs
        return `
            <aside class="chats">
                <div class="chat-main">
                    <form class="search-block">
                        {{{SearchInput}}}
                    </form>
                    <div class="chat-list">
                        {{#each chats}}
                            {{#with this}}
                                {{{ChatItem chatName=title id=id}}}
                            {{/with}}
                        {{/each}}
                    </div>
                    {{{Button textBtn="Create chat" onClick=createChat}}}
                </div>
                <footer class="chat-footer">
                    <button type="button">
                        {{{IconProfile onClick=toSettings}}}
                    </button>
                    <button type="button">
                        {{{IconSettings onClick=toSettings}}}
                    </button>
                    <button type="button">
                        {{{IconExit onClick=onLogout}}}
                    </button>
                </footer>
            </aside>
        `;
    }
}
