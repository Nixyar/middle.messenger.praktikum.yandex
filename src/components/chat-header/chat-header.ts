import {Block} from "../../../core";
import './chat-header.css';

export class ChatHeader extends Block {
    protected render(): string {
        // language=hbs
        return `
            <header class="header-chat">
                <div class="header-chat__profile-info">
                    <img class="header-chat__profile-info--avatar" src="" alt="avatar">
                    <p class="header-chat__profile-info--username h4">{{username}}</p>
                </div>
<!--                <div class="chat-control">-->
<!--                    <button type="button">{{{IconSearch}}}</button>-->
<!--                    <button type="button">{{{IconPhone}}}</button>-->
<!--                </div>-->
            </header>
        `;
    }
}
