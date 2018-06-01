import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionHistoryService } from './TransactionHistoryService';

describe('TransactionHistoryService', () => {

  let transactionHistoryService: TransactionHistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionHistoryService]
    });

    transactionHistoryService = TestBed.get(TransactionHistoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should return error if schema request failed', (done) => {
    transactionHistoryService.getSchema().subscribe((res: any) => {
      expect(res.failure.error.type).toBe('ERROR_LOADING_SCHEMA');
      done();
    });

    let schemaRequest = httpMock.expectOne('./assets/producthistory.json');
    schemaRequest.error(new ErrorEvent('ERROR_LOADING_SCHEMA'));
    httpMock.verify();
  });


});
