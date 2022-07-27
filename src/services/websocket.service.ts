import { HTTPTransportService } from './HTTPTransport.service';
import { EventBus } from '@core';

export class WebsocketService extends EventBus {
  http = new HTTPTransportService();
  socket: WebSocket | undefined;

  connectToWebsocket(userId: number, chatID: number) {
    this.http.post(`/chats/token/${chatID}`)
      .then((tokenRes: string | any) => {
        const token = JSON.parse(tokenRes.response).token;
        this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatID}/${token}`);

        this.socket.addEventListener('open', () => {
          console.log('Соединение установлено');
          this.getOldMessages()
        });

        this.socket.addEventListener('close', event => {
          if (event.wasClean) {
            console.log('Соединение закрыто чисто');
          } else {
            console.log('Обрыв соединения');
          }

          console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });

        this.socket.addEventListener('message', event => {
          window.store.dispatch({ messages: event.data});
        });
      });
  }

  sendMessage(message: string) {
    this.socket?.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  getOldMessages() {
    return this.socket?.send(JSON.stringify({
      content: '0',
      type: 'get old',
    }));
  }
}
