import { DashboardpagesModule } from './dashboardpages.module';

describe('DashboardpagesModule', () => {
  let dashboardpagesModule: DashboardpagesModule;

  beforeEach(() => {
    dashboardpagesModule = new DashboardpagesModule();
  });

  it('should create an instance', () => {
    expect(dashboardpagesModule).toBeTruthy();
  });
});
