import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatorsecurityComponent } from './educatorsecurity.component';

describe('EducatorsecurityComponent', () => {
  let component: EducatorsecurityComponent;
  let fixture: ComponentFixture<EducatorsecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducatorsecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducatorsecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
