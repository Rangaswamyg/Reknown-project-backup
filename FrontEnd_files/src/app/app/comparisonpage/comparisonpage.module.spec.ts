import { ComparisonpageModule } from './comparisonpage.module';

describe('ComparisonpageModule', () => {
  let comparisonpageModule: ComparisonpageModule;

  beforeEach(() => {
    comparisonpageModule = new ComparisonpageModule();
  });

  it('should create an instance', () => {
    expect(comparisonpageModule).toBeTruthy();
  });
});
