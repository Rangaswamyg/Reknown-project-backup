import { LastpageModule } from './lastpage.module';

describe('LastpageModule', () => {
  let lastpageModule: LastpageModule;

  beforeEach(() => {
    lastpageModule = new LastpageModule();
  });

  it('should create an instance', () => {
    expect(lastpageModule).toBeTruthy();
  });
});
