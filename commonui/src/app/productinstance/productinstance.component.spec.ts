import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { ProductinstanceComponent } from './productinstance.component';
import { RouterTestingModule } from '@angular/router/testing';
import { JsonSchemaFormModule } from 'angular2-json-schema-form';

describe('ProductinstanceComponent', () => {
  let component: ProductinstanceComponent;
  let fixture: ComponentFixture<ProductinstanceComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, JsonSchemaFormModule],
      declarations: [ ProductinstanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductinstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
