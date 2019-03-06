import { UniversitypageModule } from './universitypage.module';

describe('UniversitypageModule', () => {
  let universitypageModule: UniversitypageModule;

  beforeEach(() => {
    universitypageModule = new UniversitypageModule();
  });

  it('should create an instance', () => {
    expect(universitypageModule).toBeTruthy();
  });
});
