import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPb5Component } from './dashboard-pb5.component';

describe('DashboardPb5Component', () => {
  let component: DashboardPb5Component;
  let fixture: ComponentFixture<DashboardPb5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPb5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPb5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
