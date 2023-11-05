/*import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
*/
// auth-service.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; // import HttpClientTestingModule and HttpTestingController

import { AuthServiceService } from './auth-service.service';

describe('AuthServiceService', () => {
  let service: AuthServiceService;
  let httpTestingController: HttpTestingController; // declare a variable for HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // add HttpClientTestingModule to imports
      providers: [AuthServiceService]
    });
    service = TestBed.inject(AuthServiceService);
    httpTestingController = TestBed.inject(HttpTestingController); // inject HttpTestingController
  });

  afterEach(() => {
    httpTestingController.verify(); // verify that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // add more tests for your service methods
});
