import { TestBed } from '@angular/core/testing';

import { DemandeChequeService } from './demande-cheque.service';

describe('DemandeChequeService', () => {
  let service: DemandeChequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeChequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
