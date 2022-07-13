import {Block} from "../../../core";
import './settings-page.css';
import {HTTPTransportService} from "../../services/HTTPTransport.service";

interface SettingsPageProps {
}

export class SettingsPage extends Block<SettingsPageProps> {
    constructor(props: SettingsPageProps) {
        super(props);
    }

    protected getStateFromProps() {
        this.state = {
            values: {
                avatar: '',
                first_name: '',
                second_name: '',
                display_name: '',
                login: '',
                email: '',
                phone: '',
                password: ''
            },
            onBlur: (evt: FocusEvent) => {
                const {values} = this.state;
                const input = evt.target as HTMLInputElement;
                if (input.type !== 'file') {
                    this.setState(values[input.name] = input.value.replace("(?i)(\\b)(on\\S+)(\\s*)=|javascript:|(<\\s*)(\\/*)script|style(\\s*)=|(<\\s*)meta", ""));
                } else {
                    this.setState(values[input.name] = input.files![0]);
                }
            },
            backToMessage: () => {
                window.router.back();
            },
            onSubmitChange: (event: Event) => {
                event.preventDefault();
                const http = new HTTPTransportService();
                const {values} = this.state;

                if (values.avatar) {
                    http.put('/user/profile/avatar', {data: values.avatar}).then(() => {
                        // @ts-ignore
                        document.getElementById('settings-form').reset();
                    });
                }

                if (values.first_name || values.second_name || values.login || values.phone) {
                    const sendProfileInfo = {};
                    const profileStore = window.store.getState().user;
                    for (const key in values) {
                        if (values.hasOwnProperty(key)) {
                            if (key !== 'avatar' && key !== 'password' && key !== 'display_name') {
                                if (values[key]) {
                                    (sendProfileInfo as any)[key] = values[key];
                                } else {
                                    (sendProfileInfo as any)[key] = (profileStore as any)[key] || null;
                                }
                            } else if (key === 'display_name') {
                                (sendProfileInfo as any)[key] = `${(sendProfileInfo as any)['second_name']} ${(sendProfileInfo as any)['first_name']}`;
                            }
                        }
                    }

                    http.put('/user/profile', {data: sendProfileInfo}).then((user: any) => {
                        // @ts-ignore
                        document.getElementById('settings-form').reset();
                        window.store.dispatch(JSON.parse(user.response))
                    });
                }

                if (values.password) {
                    http.put('/user/password', {data: values.password}).then(() => {
                        // @ts-ignore
                        document.getElementById('settings-form').reset();
                    });
                }
            }
        };
    }

    protected render(): string {
        const {values} = this.state;
        // language=hbs
        return `
            {{#Layout name="Settings"}}
                {{{ChatHeader}}}
                {{{Button textBtn="Назад" onClick=backToMessage}}}
                <form class="settings-form p2" id="settings-form">
                    {{{InputControl type="file" inputName="avatar" label="Change avatar"
                                    onBlur=onBlur id="avatar"}}}
                    {{{InputControl inputName="login" label="Change login" inputValue="${values.login}"
                                    onBlur=onBlur id="login"}}}
                    {{{InputControl inputName="email" label="Change email" inputValue="${values.email}"
                                    onBlur=onBlur id="email"}}}
                    {{{InputControl type="number" inputName="phone" label="Change phone" inputValue="${values.phone}"
                                    onBlur=onBlur id="phone"}}}
                    {{{InputControl inputName="password" label="Change password" inputValue="${values.password}"
                                    onBlur=onBlur id="password"}}}
                    {{{Button type="submit" textBtn="Изменить" classes="sign" onClick=onSubmitChange}}}
                </form>
            {{/Layout}}
        `;
    }
}
