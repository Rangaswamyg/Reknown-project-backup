import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb3Component } from './dashboard-pb3.component';

describe('DashboardPb3Component', () => {
  let component: DashboardPb3Component;
  let fixture: ComponentFixture<DashboardPb3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
