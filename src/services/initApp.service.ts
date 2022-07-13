import {Dispatch} from "../../core";
import {HTTPTransportService} from "./HTTPTransport.service";

export async function initAppService(dispatch: Dispatch<AppState>) {
    dispatch({ appInitialization: false });
    try {
        const http = new HTTPTransportService();
        const response: any = await http.get('/auth/user');
        const JSONRes = JSON.parse(response.response);
        if (JSONRes.reason) {
            return;
        }
        dispatch({ user: JSONRes });
    } catch (err) {
        console.error(err);
    } finally {
        dispatch({ appInitialization: true });
    }
}
