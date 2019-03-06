import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityresultpageComponent } from './probabilityresultpage.component';

describe('ProbabilityresultpageComponent', () => {
  let component: ProbabilityresultpageComponent;
  let fixture: ComponentFixture<ProbabilityresultpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbabilityresultpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbabilityresultpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
