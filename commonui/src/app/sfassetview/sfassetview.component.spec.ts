import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfassetviewComponent } from './sfassetview.component';

describe('SfassetviewComponent', () => {
  let component: SfassetviewComponent;
  let fixture: ComponentFixture<SfassetviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfassetviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfassetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
