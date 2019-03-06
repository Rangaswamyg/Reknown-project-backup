import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPbinfoComponent } from './dashboard-pbinfo.component';

describe('DashboardPbinfoComponent', () => {
  let component: DashboardPbinfoComponent;
  let fixture: ComponentFixture<DashboardPbinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPbinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPbinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
