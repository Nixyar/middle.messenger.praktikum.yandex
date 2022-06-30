import Block from '../../../core/Block';
import './chat-item.css';

interface ChatItemProps {
    avatar: string;
    chatName: string;
    lastMessage: string;
}

export class ChatItem extends Block {
    constructor({avatar, chatName, lastMessage}: ChatItemProps) {
        super({avatar, chatName, lastMessage});
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="chat-item">
                <div class="chat-item__img">
                    <img src="{{avatar}}" alt="avatar">
                </div>
                <div class="chat-item__information">
                    <p class="chat-item__information-title p2">{{chatName}}</p>
                    <p class="chat-item__information-last-message p1">{{lastMessage}}</p>
                </div>
            </div>
        `;
    }
}
