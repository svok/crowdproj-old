import { CrowdProjPage } from './app.po';

describe('crowdproj App', () => {
  let page: CrowdProjPage;

  beforeEach(() => {
    page = new CrowdProjPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
