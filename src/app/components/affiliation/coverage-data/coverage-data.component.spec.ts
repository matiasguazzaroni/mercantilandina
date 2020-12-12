import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageDataComponent } from './coverage-data.component';

describe('CoverageDataComponent', () => {
  let component: CoverageDataComponent;
  let fixture: ComponentFixture<CoverageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
