import { BrowseRouter } from './index';

describe('BrowserRouter', () => {
  const router = new BrowseRouter();
  it('Start router', () => {
    router.start();
    window.history?.length.not.toBeNull();
  });
});
