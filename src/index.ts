import {renderDOM, registerComponent, BlockConstructable} from '../core/index';
import {AuthPage} from "./pages/auth-page/auth-page";
// Components import
import Button from "./components/button";
import Input from "./components/input-control/input";
import ChatItem from "./components/chat-item";
import ChatsList from "./components/chats-list";
import MessageWindow from "./components/message-window";
import SearchInput from "./components/search-input";
import InputControl from "./components/input-control";
import Link from "./components/link";
// Services import
// import { HTTPTransportService } from "./services/HTTPTransportService";

const components: BlockConstructable[] = [
    Button,
    ChatItem,
    ChatsList,
    Input,
    InputControl,
    Link,
    MessageWindow,
    SearchInput
];

Object.values(components).forEach((component) => {
    registerComponent(component);
});

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new AuthPage({}));
});
