import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonpageComponent } from './comparisonpage.component';

describe('ComparisonpageComponent', () => {
  let component: ComparisonpageComponent;
  let fixture: ComponentFixture<ComparisonpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
