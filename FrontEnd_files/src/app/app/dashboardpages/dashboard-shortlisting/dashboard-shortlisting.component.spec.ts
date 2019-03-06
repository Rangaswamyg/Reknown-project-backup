import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardShortlistingComponent } from './dashboard-shortlisting.component';

describe('DashboardShortlistingComponent', () => {
  let component: DashboardShortlistingComponent;
  let fixture: ComponentFixture<DashboardShortlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardShortlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardShortlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
