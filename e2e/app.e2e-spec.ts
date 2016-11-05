import { DynamiteArchhacks16Page } from './app.po';

describe('dynamite-archhacks16 App', function() {
  let page: DynamiteArchhacks16Page;

  beforeEach(() => {
    page = new DynamiteArchhacks16Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
