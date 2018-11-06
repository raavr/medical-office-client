import { Observable } from 'rxjs/Observable';
import VisitBrowseServiceModule from './visit-browse.service';
import { CONFIG } from '../../app.constant';

describe("visitBrowseService", () => {

  let $httpMock, mVisitBrowseService, fakeVisits, response;

  beforeEach(angular.mock.module(VisitBrowseServiceModule));
  beforeEach(() => {

    fakeVisits = {
      visits: [
        {
          "createDate": "2017-06-02T18:37:43",
          "id": 1,
          "status": "canceled",
          "visitDate": "2017-06-16T11:30:00"
        },
        {
          "createdate": "2017-06-02T18:41:06",
          "id": 12,
          "status": "accepted",
          "visitdate": "2017-06-16T13:00:00"
        }
      ],
      totalCount: 2
    };


  });

  beforeEach(angular.mock.inject((visitBrowseService) => {
    mVisitBrowseService = visitBrowseService;
  }));

  describe('using httpBackend mock', () => {
    beforeEach(angular.mock.inject(($injector) => {
      $httpMock = $injector.get("$httpBackend");
    }));

    afterEach(() => {
      $httpMock.flush();
    });

    it("should return visits", () => {
      response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/visits");
      response.respond(fakeVisits);

      mVisitBrowseService.getVisits()
        .subscribe(s => {
          expect(s).toEqual(fakeVisits);
        });
    });

    it("should not return any visits", () => {
      response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/visits");
      response.respond({ visits: [] });

      mVisitBrowseService.getVisits()
        .subscribe(s => {
          expect(s.visits.length).toBe(0);
        });
    });

    it("should catch error when getVisits is called", () => {
      const err = new Error();
      response = $httpMock.when("GET", CONFIG.ENDPOINT + "/api/visits");
      response.respond(400, err);

      mVisitBrowseService.getVisits()
        .subscribe(
          () => { },
          (resErr) => expect(resErr.data).toEqual(err)
        );
    });

    it("should cancel visits", () => {
      const id = 1;
      response = $httpMock.when("DELETE", CONFIG.ENDPOINT + "/api/visits/" + id);
      response.respond(200, { status: 200 });

      mVisitBrowseService.cancelVisit(id)
        .subscribe(s => {
          expect(s.status).toEqual(200);
        });
    });

    it("should catch error when cancelVisit is called", () => {
      const id = 2;
      response = $httpMock.when("DELETE", CONFIG.ENDPOINT + "/api/visits/" + id);
      response.respond(400, {});

      mVisitBrowseService.cancelVisit(id)
        .subscribe(
          () => { },
          (resErr) => {
            expect(resErr.status).toEqual(400);
            expect(resErr.data).toEqual({});
          }
        );
    });

  });

  describe('spy on getVisits method', () => {
    let spyService;

    beforeEach(() => {
      spyService = spyOn(mVisitBrowseService, "getVisits");
    })

    it("should call getVisits() when getVisits is called", () => {
      expect(mVisitBrowseService.getVisits).not.toHaveBeenCalled();
      mVisitBrowseService.getVisits({});
      expect(mVisitBrowseService.getVisits).toHaveBeenCalled();
      expect(mVisitBrowseService.getVisits.calls.argsFor(0)).toEqual([{}]);
    });

    it("should call getVisits() and return user visits", () => {
      spyService.and.returnValue(Observable.of(fakeVisits));
      mVisitBrowseService.getVisits()
        .subscribe(v => expect(v).toEqual(fakeVisits));
    });

  });

});