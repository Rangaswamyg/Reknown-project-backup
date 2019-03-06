import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb4Component } from './dashboard-pb4.component';

describe('DashboardPb4Component', () => {
  let component: DashboardPb4Component;
  let fixture: ComponentFixture<DashboardPb4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
