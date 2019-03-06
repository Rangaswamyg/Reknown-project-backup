import { DashboardstartModule } from './dashboardstart.module';

describe('DashboardstartModule', () => {
  let dashboardstartModule: DashboardstartModule;

  beforeEach(() => {
    dashboardstartModule = new DashboardstartModule();
  });

  it('should create an instance', () => {
    expect(dashboardstartModule).toBeTruthy();
  });
});
