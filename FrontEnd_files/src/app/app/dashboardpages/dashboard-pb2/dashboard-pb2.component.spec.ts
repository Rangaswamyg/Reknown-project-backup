import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb2Component } from './dashboard-pb2.component';

describe('DashboardPb2Component', () => {
  let component: DashboardPb2Component;
  let fixture: ComponentFixture<DashboardPb2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
