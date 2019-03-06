import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EighthpageComponent } from './eighthpage.component';

describe('EighthpageComponent', () => {
  let component: EighthpageComponent;
  let fixture: ComponentFixture<EighthpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EighthpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EighthpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
