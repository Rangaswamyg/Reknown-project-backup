import { FilterpageModule } from './filterpage.module';

describe('FilterpageModule', () => {
  let filterpageModule: FilterpageModule;

  beforeEach(() => {
    filterpageModule = new FilterpageModule();
  });

  it('should create an instance', () => {
    expect(filterpageModule).toBeTruthy();
  });
});
