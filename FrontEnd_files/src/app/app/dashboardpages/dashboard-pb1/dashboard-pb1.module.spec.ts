import { DashboardPb1Module } from './dashboard-pb1.module';

describe('DashboardPb1Module', () => {
  let dashboardPb1Module: DashboardPb1Module;

  beforeEach(() => {
    dashboardPb1Module = new DashboardPb1Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb1Module).toBeTruthy();
  });
});
