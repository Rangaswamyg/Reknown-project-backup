import { SecondpageModule } from './secondpage.module';

describe('SecondpageModule', () => {
  let secondpageModule: SecondpageModule;

  beforeEach(() => {
    secondpageModule = new SecondpageModule();
  });

  it('should create an instance', () => {
    expect(secondpageModule).toBeTruthy();
  });
});
