import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrainingcourseComponent } from './addtrainingcourse.component';

describe('AddtrainingcourseComponent', () => {
  let component: AddtrainingcourseComponent;
  let fixture: ComponentFixture<AddtrainingcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrainingcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrainingcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
