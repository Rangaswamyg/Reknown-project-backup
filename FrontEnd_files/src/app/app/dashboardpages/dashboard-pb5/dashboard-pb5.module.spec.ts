import { DashboardPb5Module } from './dashboard-pb5.module';

describe('DashboardPb5Module', () => {
  let dashboardPb5Module: DashboardPb5Module;

  beforeEach(() => {
    dashboardPb5Module = new DashboardPb5Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb5Module).toBeTruthy();
  });
});
