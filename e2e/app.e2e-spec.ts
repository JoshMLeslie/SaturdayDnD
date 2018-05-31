import { SaturdayDnDPage } from './app.po';

describe('saturday-dn-d App', function() {
  let page: SaturdayDnDPage;

  beforeEach(() => {
    page = new SaturdayDnDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
