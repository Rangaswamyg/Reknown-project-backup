import { DashtimelinepageModule } from './dashtimelinepage.module';

describe('DashtimelinepageModule', () => {
  let dashtimelinepageModule: DashtimelinepageModule;

  beforeEach(() => {
    dashtimelinepageModule = new DashtimelinepageModule();
  });

  it('should create an instance', () => {
    expect(dashtimelinepageModule).toBeTruthy();
  });
});
