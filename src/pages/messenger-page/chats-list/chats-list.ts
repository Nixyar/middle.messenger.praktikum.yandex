import Block from '../../../../core/Block';
import "./chats-list.css";
import {HTTPTransportService} from "../../../services/HTTPTransport.service";

interface ChatListProps {
    chatList: ChatItem[];
}

export class ChatsList extends Block {
    http = new HTTPTransportService();
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
                this.http.get('/chats').then((chats: XMLHttpRequest | any) => {
                    this.state.chats = JSON.parse(chats.response);
                });
            },
            createChat: (chatName: string) => {
                this.http.post('/chats', {data: {title: chatName || 'New chat'}}).then(() => {
                    this.state.getNewListChat();
                });
            },
            onLogout: (evt: Event) => {
                evt.preventDefault();
                this.http.post('/auth/logout').then(() => {
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
