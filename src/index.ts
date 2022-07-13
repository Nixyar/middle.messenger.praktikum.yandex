import { registerComponent, BrowseRouter, Store } from '../core/index';
// Components import
import Button from "./components/button";
import Input from "./components/input-control/input";
import ChatItem from "./pages/messenger-page/chats-list/chat-item";
import ChatsList from "./pages/messenger-page/chats-list";
import MessageWindow from "./pages/messenger-page/message-window";
import SearchInput from "./components/search-input";
import InputControl from "./components/input-control";
import Link from "./components/link";
import ChatHeader from "./components/chat-header"
// Icons import
import IconExit from "./components/icons/icon-exit";
import IconSearch from "./components/icons/icon-search";
import IconSettings from "./components/icons/icon-settings";
import IconProfile from "./components/icons/icon-profile";
import IconPhone from "./components/icons/icon-phone";
import {initAppService} from "./services/initApp.service";
import IconDelete from "./components/icons/icon-delete";
// Utils
import {getScreenComponent, Screens} from "./utils/screenList";
registerComponent('Button', Button);
registerComponent('ChatItem', ChatItem);
registerComponent('ChatsList', ChatsList);
registerComponent('Input', Input);
registerComponent('InputControl', InputControl);
registerComponent('Link', Link);
registerComponent('MessageWindow', MessageWindow);
registerComponent('SearchInput', SearchInput);
registerComponent('ChatHeader', ChatHeader);

registerComponent('IconExit', IconExit);
registerComponent('IconSearch', IconSearch);
registerComponent('IconSettings', IconSettings);
registerComponent('IconProfile', IconProfile);
registerComponent('IconPhone', IconPhone);
registerComponent('IconDelete', IconDelete);


declare global {
    interface Window {
        store: Store<AppState>
        router: BrowseRouter
    }
}

export const defaultState: AppState = {
    appInitialization: false,
    isLoading: false,
    user: null
};

document.addEventListener("DOMContentLoaded", () => {
    const store = new Store<AppState>(defaultState);
    const router = new BrowseRouter();

    window.store = store;
    window.router = router;

    router
        .use('/', getScreenComponent(Screens.Login))
        .use('/sign-up', getScreenComponent(Screens.Registration))
        .use('/messenger', getScreenComponent(Screens.Messenger))
        .use('/settings', getScreenComponent(Screens.Settings))
        .use('*', getScreenComponent(Screens.Error))
        .start()

    setTimeout(() => {
        store.dispatch(initAppService);
    }, 100);
});
