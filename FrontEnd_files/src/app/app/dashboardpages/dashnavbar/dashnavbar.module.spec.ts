import { DashnavbarModule } from './dashnavbar.module';

describe('DashnavbarModule', () => {
  let dashnavbarModule: DashnavbarModule;

  beforeEach(() => {
    dashnavbarModule = new DashnavbarModule();
  });

  it('should create an instance', () => {
    expect(dashnavbarModule).toBeTruthy();
  });
});
