import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrainingcourseComponent } from './edittrainingcourse.component';

describe('EdittrainingcourseComponent', () => {
  let component: EdittrainingcourseComponent;
  let fixture: ComponentFixture<EdittrainingcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittrainingcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittrainingcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
