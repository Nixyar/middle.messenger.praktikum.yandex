import {BlockClass} from '@core';
import {RegistrationPage} from "../pages/registration-page/registration-page";
import MessengerPage from "../pages/messenger-page";
import ErrorPage from "../pages/error-page";
import {SettingsPage} from "../pages/settings-page/settings-page";
import { AuthPage } from '../pages/auth-page/auth-page';

export enum Screens {
    Login = 'login',
    Registration = 'registration',
    Messenger = 'messenger',
    Settings = 'settings',
    Error = 'error',
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.Login]: AuthPage,
    [Screens.Registration]: RegistrationPage,
    [Screens.Messenger]: MessengerPage,
    [Screens.Settings]: SettingsPage,
    [Screens.Error]: ErrorPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
