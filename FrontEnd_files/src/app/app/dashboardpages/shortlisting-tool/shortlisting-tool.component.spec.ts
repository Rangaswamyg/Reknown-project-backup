import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistingToolComponent } from './shortlisting-tool.component';

describe('ShortlistingToolComponent', () => {
  let component: ShortlistingToolComponent;
  let fixture: ComponentFixture<ShortlistingToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortlistingToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortlistingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
