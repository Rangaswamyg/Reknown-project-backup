import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrypageComponent } from './countrypage.component';

describe('CountrypageComponent', () => {
  let component: CountrypageComponent;
  let fixture: ComponentFixture<CountrypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
