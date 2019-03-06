import { DashboardToolModule } from './dashboard-tool.module';

describe('DashboardToolModule', () => {
  let dashboardToolModule: DashboardToolModule;

  beforeEach(() => {
    dashboardToolModule = new DashboardToolModule();
  });

  it('should create an instance', () => {
    expect(dashboardToolModule).toBeTruthy();
  });
});
