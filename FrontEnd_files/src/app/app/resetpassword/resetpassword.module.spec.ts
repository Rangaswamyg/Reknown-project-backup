import { ResetpasswordModule } from './resetpassword.module';

describe('ResetpasswordModule', () => {
  let resetpasswordModule: ResetpasswordModule;

  beforeEach(() => {
    resetpasswordModule = new ResetpasswordModule();
  });

  it('should create an instance', () => {
    expect(resetpasswordModule).toBeTruthy();
  });
});
