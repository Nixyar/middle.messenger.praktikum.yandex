import { Block } from '@core';
import './chat-item.css';

interface ChatItemProps {
    avatar: string;
    chatName: string;
    lastMessage: string;
    id: number;
    onClick?: () => void;
}

export class ChatItem extends Block {
    constructor({avatar, chatName, lastMessage, id, onClick}: ChatItemProps) {
        super({avatar, chatName, lastMessage, id, events: {click: onClick}});
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="chat-item" data-chat-id="{{id}}">
                <div class="chat-item__img">
                </div>
                <div class="chat-item__information">
                    <p class="chat-item__information-title p2">{{chatName}}</p>
                    <p class="chat-item__information-last-message p1">{{lastMessage}}</p>
                </div>
            </div>
        `;
    }
}
