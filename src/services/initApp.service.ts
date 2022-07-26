import {Dispatch} from '@core';
import {HTTPTransportService} from "./HTTPTransport.service";

export async function initAppService(dispatch: Dispatch<AppState>) {
    dispatch({ appInitialization: false });
    try {
        const http = new HTTPTransportService();
        const response: any = await http.get('/auth/user');
        const JSONRes = JSON.parse(response.response);
        if (JSONRes.reason) {
            if (window.location.pathname === '/messenger' || window.location.pathname === '/settings') {
                window.router.go('/');
            }
            return;
        }
        if (window.location.pathname === '/' || window.location.pathname === '/sign-up') {
            window.router.go('/messenger');
        }
        dispatch({ user: JSONRes });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appInitialization: true });
    }
}
