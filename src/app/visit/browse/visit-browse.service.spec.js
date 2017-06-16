import { Observable } from 'rxjs/Observable';
import VisitBrowseServiceModule from './visit-browse.service';
import { CONFIG } from '../../app.constant';

describe("visitBrowseService", () => {

    let $httpMock, mVisitBrowseService, fakeVisits, response;

    beforeEach(angular.mock.module(VisitBrowseServiceModule));
    beforeEach(() => {
        
        fakeVisits = [
            {
                "createdate": "2017-06-02T18:37:43", 
                "id": 1, 
                "iduser": 7, 
                "status": "canceled", 
                "visitdate": "2017-06-16T11:30:00"
            }, 
            {
                "createdate": "2017-06-02T18:41:06", 
                "id": 12, 
                "iduser": 7, 
                "status": "accepted", 
                "visitdate": "2017-06-16T13:00:00"
            }
        ];

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
            response = $httpMock.when("GET", CONFIG.ENDPOINT + "/visits");
            response.respond({ vs: fakeVisits });

            mVisitBrowseService._getVisits("/visits")
                .subscribe(s => {
                    expect(s).toEqual(fakeVisits);
                });     
        });

        it("should not return any visits", () => {
            response = $httpMock.when("GET", CONFIG.ENDPOINT + "/visits");
            response.respond({ vs: [] });

            mVisitBrowseService._getVisits("/visits")
                .subscribe(s => {
                    expect(s.length).toBe(0);
                });  
        });

        it("should catch error when _getVisits is called", () => {
            let err = new Error();
            response = $httpMock.when("GET", CONFIG.ENDPOINT + "/visits");
            response.respond(400, err);

            mVisitBrowseService._getVisits("/visits")
                .subscribe(
                    () => {},
                    (resErr) => expect(resErr.data).toEqual(err)
                );  
        });

         it("should cancel visits", () => {
            const id = 1;
            response = $httpMock.when("DELETE", CONFIG.ENDPOINT + "/api/visits/delete/" + id);
            response.respond(200, {});

            mVisitBrowseService.cancelVisit(id)
                .subscribe(s => {
                    expect(s.status).toEqual(200);
                });  
        });

        it("should catch error when cancelVisit is called", () => {
            const id = 2;
            response = $httpMock.when("DELETE", CONFIG.ENDPOINT + "/api/visits/delete/" + id);
            response.respond(400, {});

            mVisitBrowseService.cancelVisit(id)
                .subscribe(
                    () => {},
                    (resErr) => { 
                        expect(resErr.status).toEqual(400);
                        expect(resErr.data).toEqual({}); 
                    }
                );  
        });

    });

    describe('spy on _getVisits method', () => {
        let spyService;

        beforeEach(() => {
            spyService = spyOn(mVisitBrowseService, "_getVisits");
        })
            
        it("should call _getVisits() when getUsersVisits is called", () => {
            expect(mVisitBrowseService._getVisits).not.toHaveBeenCalled();
            mVisitBrowseService.getUsersVisits();
            expect(mVisitBrowseService._getVisits).toHaveBeenCalled();
            expect(mVisitBrowseService._getVisits.calls.argsFor(0)).toEqual(['/api/visits/browse']);
        });

        it("should call _getVisits() and return user visits", () => {
            spyService.and.returnValue(Observable.of(fakeVisits));
            mVisitBrowseService.getUsersVisits()
                .subscribe(v => expect(v).toEqual(fakeVisits));
        });

        it("should call _getVisits() when getPastUsersVisits is called", () => {
            expect(mVisitBrowseService._getVisits).not.toHaveBeenCalled();
            mVisitBrowseService.getPastUsersVisits();
            expect(mVisitBrowseService._getVisits).toHaveBeenCalled();
            expect(mVisitBrowseService._getVisits.calls.argsFor(0)).toEqual(['/api/visits/browse/past']);
        });

        it("should call _getVisits() when getAdminVisits is called", () => {
            expect(mVisitBrowseService._getVisits).not.toHaveBeenCalled();
            mVisitBrowseService.getAdminVisits();
            expect(mVisitBrowseService._getVisits).toHaveBeenCalled();
            expect(mVisitBrowseService._getVisits.calls.argsFor(0)).toEqual(['/api/admin/visits']);
        });

        it("should call _getVisits() when getPastAdminVisits is called", () => {
            expect(mVisitBrowseService._getVisits).not.toHaveBeenCalled();
            mVisitBrowseService.getPastAdminVisits();
            expect(mVisitBrowseService._getVisits).toHaveBeenCalled();
            expect(mVisitBrowseService._getVisits.calls.argsFor(0)).toEqual(['/api/admin/visits/past']);
        });

    });

});