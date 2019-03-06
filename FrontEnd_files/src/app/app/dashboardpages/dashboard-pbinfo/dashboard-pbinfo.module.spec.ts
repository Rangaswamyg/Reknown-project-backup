import { DashboardPbinfoModule } from './dashboard-pbinfo.module';

describe('DashboardPbinfoModule', () => {
  let dashboardPbinfoModule: DashboardPbinfoModule;

  beforeEach(() => {
    dashboardPbinfoModule = new DashboardPbinfoModule();
  });

  it('should create an instance', () => {
    expect(dashboardPbinfoModule).toBeTruthy();
  });
});
