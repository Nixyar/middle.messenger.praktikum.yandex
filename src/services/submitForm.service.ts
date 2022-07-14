import { HTTPTransportService } from './HTTPTransport.service';

export function submitSign(values: {}, url: string) {
  const http = new HTTPTransportService();
  http.post(url, { data: values })
    .then(() => {
      http.get('/auth/user')
        .then((user: UserInfo | any) => {
          window.store.dispatch(JSON.parse(user.response));
          window.router.go('/messenger');
        });
    });
  console.log('Sign Form', values);
}
