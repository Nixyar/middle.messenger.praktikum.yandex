import {registerComponent, renderDOM} from '../core/index';
// import {AuthPage} from "./pages/auth-page/auth-page";

// Components import
import Button from "./components/button";
import Input from "./components/input-control/input";
import ChatItem from "./components/chat-item";
import ChatsList from "./components/chats-list";
import MessageWindow from "./components/message-window";
import SearchInput from "./components/search-input";
import InputControl from "./components/input-control";
import Link from "./components/link";
import MessengerPage from "./pages/messenger-page";

// Icons import
import IconExit from "./components/icons/icon-exit";
import IconSearch from "./components/icons/icon-search";
import IconSettings from "./components/icons/icon-settings";
import IconProfile from "./components/icons/icon-profile";
import IconPhone from "./components/icons/icon-phone";

// Services import
// import { HTTPTransportService } from "./services/HTTPTransportService";

registerComponent('Button', Button);
registerComponent('ChatItem', ChatItem);
registerComponent('ChatsList', ChatsList);
registerComponent('Input', Input);
registerComponent('InputControl', InputControl);
registerComponent('Link', Link);
registerComponent('MessageWindow', MessageWindow);
registerComponent('SearchInput', SearchInput);

registerComponent('IconExit', IconExit);
registerComponent('IconSearch', IconSearch);
registerComponent('IconSettings', IconSettings);
registerComponent('IconProfile', IconProfile);
registerComponent('IconPhone', IconPhone);

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new MessengerPage({}));
});
