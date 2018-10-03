import { Observable } from 'rxjs/Observable';
import PatientBrowseModule from './patient-browse';
import { CONFIG } from '../../app.constant';

describe("PatientBrowseService", () => {

  let $httpMock, mPatientBrowseService, fakeUsers, response;

  beforeEach(angular.mock.module(PatientBrowseModule));
  beforeEach(() => {
    fakeUsers = [
      {
        "email": "john@example.com",
        "id": 2,
        "name": "John",
        "surname": "Doe"
      },
      {
        "email": "jake@example.com",
        "id": 3,
        "name": "Jake",
        "surname": "Smith"
      }
    ];
  });

  beforeEach(angular.mock.inject(($injector, patientBrowseService) => {
    $httpMock = $injector.get("$httpBackend");
    mPatientBrowseService = patientBrowseService;

    response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/patients");
  }));

  afterEach(() => {
    $httpMock.flush();
  });

  it("should return patients", () => {

    response.respond(fakeUsers);

    mPatientBrowseService.getPatients()
      .subscribe(s => {
        expect(s).toEqual(fakeUsers);
      });
  });

  it("should not return any patients", () => {
    response.respond([]);

    mPatientBrowseService.getPatients()
      .subscribe(s => {
        expect(s.length).toBe(0);
      });
  });


  it("should catch response error", () => {
    const err = new Error();
    response.respond(400, err);

    mPatientBrowseService.getPatients()
      .subscribe(
        () => { },
        (resErr) => {
          expect(resErr.status).toEqual(400);
          expect(resErr.data).toEqual(err);
        });
  });
});