import { DashboardPb6Module } from './dashboard-pb6.module';

describe('DashboardPb6Module', () => {
  let dashboardPb6Module: DashboardPb6Module;

  beforeEach(() => {
    dashboardPb6Module = new DashboardPb6Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb6Module).toBeTruthy();
  });
});
