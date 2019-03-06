import { DashboardPb3Module } from './dashboard-pb3.module';

describe('DashboardPb3Module', () => {
  let dashboardPb3Module: DashboardPb3Module;

  beforeEach(() => {
    dashboardPb3Module = new DashboardPb3Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb3Module).toBeTruthy();
  });
});
