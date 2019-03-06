import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardToolComponent } from './dashboard-tool.component';

describe('DashboardToolComponent', () => {
  let component: DashboardToolComponent;
  let fixture: ComponentFixture<DashboardToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
