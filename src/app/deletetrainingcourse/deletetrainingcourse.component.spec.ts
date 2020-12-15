import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetrainingcourseComponent } from './deletetrainingcourse.component';

describe('DeletetrainingcourseComponent', () => {
  let component: DeletetrainingcourseComponent;
  let fixture: ComponentFixture<DeletetrainingcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletetrainingcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletetrainingcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
