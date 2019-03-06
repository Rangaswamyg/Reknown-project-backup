import { FirstpageModule } from './firstpage.module';

describe('FirstpageModule', () => {
  let firstpageModule: FirstpageModule;

  beforeEach(() => {
    firstpageModule = new FirstpageModule();
  });

  it('should create an instance', () => {
    expect(firstpageModule).toBeTruthy();
  });
});
