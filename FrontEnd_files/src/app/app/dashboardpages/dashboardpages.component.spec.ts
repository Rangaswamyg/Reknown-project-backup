import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpagesComponent } from './dashboardpages.component';

describe('DashboardpagesComponent', () => {
  let component: DashboardpagesComponent;
  let fixture: ComponentFixture<DashboardpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
