import { CountylistpageModule } from './countylistpage.module';

describe('CountylistpageModule', () => {
  let countylistpageModule: CountylistpageModule;

  beforeEach(() => {
    countylistpageModule = new CountylistpageModule();
  });

  it('should create an instance', () => {
    expect(countylistpageModule).toBeTruthy();
  });
});
