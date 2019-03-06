import { DashboardShortlistingModule } from './dashboard-shortlisting.module';

describe('DashboardShortlistingModule', () => {
  let dashboardShortlistingModule: DashboardShortlistingModule;

  beforeEach(() => {
    dashboardShortlistingModule = new DashboardShortlistingModule();
  });

  it('should create an instance', () => {
    expect(dashboardShortlistingModule).toBeTruthy();
  });
});
