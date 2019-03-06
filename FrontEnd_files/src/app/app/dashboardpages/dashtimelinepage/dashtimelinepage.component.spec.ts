import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashtimelinepageComponent } from './dashtimelinepage.component';

describe('DashtimelinepageComponent', () => {
  let component: DashtimelinepageComponent;
  let fixture: ComponentFixture<DashtimelinepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashtimelinepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashtimelinepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
