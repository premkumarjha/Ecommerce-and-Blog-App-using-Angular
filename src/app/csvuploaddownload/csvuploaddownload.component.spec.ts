import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvuploaddownloadComponent } from './csvuploaddownload.component';

describe('CsvuploaddownloadComponent', () => {
  let component: CsvuploaddownloadComponent;
  let fixture: ComponentFixture<CsvuploaddownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvuploaddownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvuploaddownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
