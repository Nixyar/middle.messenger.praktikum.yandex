import Block from '../../../core/Block';
import "./chats-list.css";

export class ChatsList extends Block {
    protected render(): string {
        // language=hbs
        return `
            <aside class="chats">
                <div class="chat-main">
                    <form class="search-block">
                        {{{SearchInput}}}
                    </form>
                    <div class="chat-list">
                        <!--            Блоки с чатами-->
                        {{{ChatItem chatName="Chat Name" lastMessage="last message"
                                    avatar="../../../assets/images/profile-test.png"}}}
                        {{{ChatItem chatName="Chat Name" lastMessage="last message"
                                    avatar="../../../assets/images/profile-test.png"}}}
                    </div>
                </div>
                <footer class="chat-footer">
                    <button type="button">
                        {{{IconProfile}}}
                    </button>
                    <button type="button">
                        {{{IconSettings}}}
                    </button>
                    <button type="button">
                        {{{IconExit}}}
                    </button>
                </footer>
            </aside>
        `;
    }
}
