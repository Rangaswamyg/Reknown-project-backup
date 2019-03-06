import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardstartComponent } from './dashboardstart.component';

describe('DashboardstartComponent', () => {
  let component: DashboardstartComponent;
  let fixture: ComponentFixture<DashboardstartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardstartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardstartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
