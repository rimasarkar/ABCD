import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlmDetailsComponent } from './olm-details.component';

describe('OlmDetailsComponent', () => {
  let component: OlmDetailsComponent;
  let fixture: ComponentFixture<OlmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlmDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
