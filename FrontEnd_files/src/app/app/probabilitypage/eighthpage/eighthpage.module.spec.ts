import { EighthpageModule } from './eighthpage.module';

describe('EighthpageModule', () => {
  let eighthpageModule: EighthpageModule;

  beforeEach(() => {
    eighthpageModule = new EighthpageModule();
  });

  it('should create an instance', () => {
    expect(eighthpageModule).toBeTruthy();
  });
});
