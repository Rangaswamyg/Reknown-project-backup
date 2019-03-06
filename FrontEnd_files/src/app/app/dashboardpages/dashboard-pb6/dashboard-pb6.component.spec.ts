import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb6Component } from './dashboard-pb6.component';

describe('DashboardPb6Component', () => {
  let component: DashboardPb6Component;
  let fixture: ComponentFixture<DashboardPb6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
