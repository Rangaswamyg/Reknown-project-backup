import { FifthpageModule } from './fifthpage.module';

describe('FifthpageModule', () => {
  let fifthpageModule: FifthpageModule;

  beforeEach(() => {
    fifthpageModule = new FifthpageModule();
  });

  it('should create an instance', () => {
    expect(fifthpageModule).toBeTruthy();
  });
});
