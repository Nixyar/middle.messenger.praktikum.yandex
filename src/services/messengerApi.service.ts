import { HTTPTransportService } from './HTTPTransport.service';

export interface Error {
  'reason': string
}

export interface ResponseChat {
  'id': number,
  'title': string,
  'avatar': string,
  'unread_count': number,
  'last_message': {
    'user': {
      'first_name': string,
      'second_name': string,
      'avatar': string,
      'email': string,
      'login': string,
      'phone': string
    },
    'time': string,
    'content': string
  }
}

export interface ResponseCreateChat {
  'reason': string
}

export interface ResponseChangeProfile {
  'first_name': string,
  'second_name': string,
  'display_name': string,
  'login': string,
  'email': string,
  'phone': string,
}

export interface ResponseChangeAvatar extends ResponseChangeProfile {
  'id': number,
  'avatar': string
}

export interface ResponseChangePassword {
  'oldPassword': string,
  'newPassword': string
}

const http = new HTTPTransportService();

// Chats messenger

export function getChats(): Promise<ResponseChat[] | Error> {
  return http.get('/chats')
    .then();
}

export function createChat(chatName = 'New chat'): Promise<ResponseCreateChat | Error> {
  return http.post('/chats', { data: { title: chatName } })
    .then();
}

export function logout(): Promise<unknown | Error> {
  return http.post('/auth/logout')
    .then();
}

// Profile settings

export function changeAvatar(avatar: File): Promise<ResponseChangeAvatar | Error> {
  return http.put('/user/profile/avatar', { data: avatar })
    .then((res: XMLHttpRequest | any) => {
      return JSON.parse(res.response);
    });
}

export function changeProfileInfo(profileInfo: Indexed): Promise<ResponseChangeProfile | Error> {
  return http.put('/user/profile', { data: profileInfo })
    .then((res: XMLHttpRequest | any) => {
      return JSON.parse(res.response);
    });
}

export function changePassword(password: string): Promise<ResponseChangePassword | Error> {
  return http.put('/user/password', { data: password })
    .then((res: XMLHttpRequest | any) => {
      return JSON.parse(res.response);
    });
}
