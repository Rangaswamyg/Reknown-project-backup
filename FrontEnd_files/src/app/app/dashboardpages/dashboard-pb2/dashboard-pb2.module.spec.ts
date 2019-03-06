import { DashboardPb2Module } from './dashboard-pb2.module';

describe('DashboardPb2Module', () => {
  let dashboardPb2Module: DashboardPb2Module;

  beforeEach(() => {
    dashboardPb2Module = new DashboardPb2Module();
  });

  it('should create an instance', () => {
    expect(dashboardPb2Module).toBeTruthy();
  });
});
