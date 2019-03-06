import { OtpverificationModule } from './otpverification.module';

describe('OtpverificationModule', () => {
  let otpverificationModule: OtpverificationModule;

  beforeEach(() => {
    otpverificationModule = new OtpverificationModule();
  });

  it('should create an instance', () => {
    expect(otpverificationModule).toBeTruthy();
  });
});
