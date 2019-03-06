import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb1Component } from './dashboard-pb1.component';

describe('DashboardPb1Component', () => {
  let component: DashboardPb1Component;
  let fixture: ComponentFixture<DashboardPb1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
