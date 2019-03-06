import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountylistpageComponent } from './countylistpage.component';

describe('CountylistpageComponent', () => {
  let component: CountylistpageComponent;
  let fixture: ComponentFixture<CountylistpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountylistpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountylistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
