import { ProbabilitypageModule } from './probabilitypage.module';

describe('ProbabilitypageModule', () => {
  let probabilitypageModule: ProbabilitypageModule;

  beforeEach(() => {
    probabilitypageModule = new ProbabilitypageModule();
  });

  it('should create an instance', () => {
    expect(probabilitypageModule).toBeTruthy();
  });
});
