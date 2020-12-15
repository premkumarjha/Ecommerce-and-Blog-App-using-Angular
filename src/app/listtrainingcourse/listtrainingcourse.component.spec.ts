import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtrainingcourseComponent } from './listtrainingcourse.component';

describe('ListtrainingcourseComponent', () => {
  let component: ListtrainingcourseComponent;
  let fixture: ComponentFixture<ListtrainingcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtrainingcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtrainingcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
