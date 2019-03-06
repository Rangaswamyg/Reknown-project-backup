import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilitypageComponent } from './probabilitypage.component';

describe('ProbabilitypageComponent', () => {
  let component: ProbabilitypageComponent;
  let fixture: ComponentFixture<ProbabilitypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbabilitypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbabilitypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
