import { SaasAngularPage } from './app.po';

describe('saas-angular App', () => {
  let page: SaasAngularPage;

  beforeEach(() => {
    page = new SaasAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
