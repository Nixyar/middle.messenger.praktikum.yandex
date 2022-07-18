import { HTTPTransportService } from './HTTPTransport.service';

const http = new HTTPTransportService();

// Chats messenger

export function getChats(): Promise<Indexed | unknown> {
  return http.get('/chats');
}

export function createChat(chatName: string = 'New chat'): Promise<Indexed | unknown> {
  return http.post('/chats', {data: {title: chatName}});
}

export function logout(): Promise<Indexed | unknown> {
  return http.post('/auth/logout');
}

// Profile settings

export function changeAvatar(avatar: File): Promise<Indexed | unknown> {
  return http.put('/user/profile/avatar', { data: avatar });
}

export function changeProfileInfo(profileInfo: Indexed): Promise<Indexed | unknown> {
  return http.put('/user/profile', { data: profileInfo });
}

export function changePassword(password: string): Promise<Indexed | unknown> {
  return http.put('/user/password', { data: password })
}
