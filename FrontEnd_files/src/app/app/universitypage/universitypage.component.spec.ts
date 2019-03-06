import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitypageComponent } from './universitypage.component';

describe('UniversitypageComponent', () => {
  let component: UniversitypageComponent;
  let fixture: ComponentFixture<UniversitypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
