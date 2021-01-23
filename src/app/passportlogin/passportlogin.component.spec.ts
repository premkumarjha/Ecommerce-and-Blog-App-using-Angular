import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportloginComponent } from './passportlogin.component';

describe('PassportloginComponent', () => {
  let component: PassportloginComponent;
  let fixture: ComponentFixture<PassportloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
