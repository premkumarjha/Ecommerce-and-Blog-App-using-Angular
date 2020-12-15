import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtrainingeventComponent } from './addtrainingevent.component';

describe('AddtrainingeventComponent', () => {
  let component: AddtrainingeventComponent;
  let fixture: ComponentFixture<AddtrainingeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtrainingeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtrainingeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
