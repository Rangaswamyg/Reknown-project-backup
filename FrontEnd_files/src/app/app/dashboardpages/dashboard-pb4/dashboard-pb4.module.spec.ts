import { DashboardPb4Module } from './dashboard-pb4.module';

describe('DashboardPb4Module', () => {
  let dashboardPb4Module: DashboardPb4Module;

  beforeEach(() => {
    dashboardPb4Module = new DashboardPb4Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb4Module).toBeTruthy();
  });
});
