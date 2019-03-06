import { CountrypageModule } from './countrypage.module';

describe('CountrypageModule', () => {
  let countrypageModule: CountrypageModule;

  beforeEach(() => {
    countrypageModule = new CountrypageModule();
  });

  it('should create an instance', () => {
    expect(countrypageModule).toBeTruthy();
  });
});
