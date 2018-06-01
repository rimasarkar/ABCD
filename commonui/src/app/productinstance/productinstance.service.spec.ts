import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductinstanceService } from './productinstance.service';

describe('ProductinstanceService', () => {

  let productinstanceService: ProductinstanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductinstanceService]
    });

    productinstanceService = TestBed.get(ProductinstanceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should return error if schema request failed', (done) => {
    productinstanceService.getSchema().subscribe((res: any) => {
      expect(res.failure.error.type).toBe('ERROR_LOADING_SCHEMA');
      done();
    });

    let schemaRequest = httpMock.expectOne('./assets/schemas/productinstance.json');
    schemaRequest.error(new ErrorEvent('ERROR_LOADING_SCHEMA'));
    httpMock.verify();
  });

  it('should return error if product request failed', (done) => {
    productinstanceService.getProduct('SPPOW03061').subscribe((res: any) => {
    }, err => {
      expect(err.error.type).toBe('ERROR_LOADING_PRODUCT');
      done();
    });

    let schemaRequest = httpMock.expectOne('/api/titan/product/SPPOW03061');
    schemaRequest.error(new ErrorEvent('ERROR_LOADING_PRODUCT'));
    httpMock.verify();
  });

});
