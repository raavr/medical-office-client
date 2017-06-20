import { Observable } from "rxjs/Observable";
import PatientBrowseModule from "./patient-browse";

describe("PatientBrowseComponent", () => {
    let $componentController, ctrl, bindings;
    beforeEach(angular.mock.module(PatientBrowseModule));

    beforeEach(() => {
        bindings = { 
            patients: [
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
            ]
        };
    })

    beforeEach(angular.mock.inject(($injector) => {
        $componentController = $injector.get("$componentController");
        ctrl = $componentController("patientBrowse", null, bindings);
    }));

    it('should call _getFilteredPatients', () => {
        spyOn(ctrl, "_getFilteredPatients");

        expect(ctrl._getFilteredPatients).not.toHaveBeenCalled();
        ctrl.$onInit();
        expect(ctrl._getFilteredPatients).toHaveBeenCalled();
    });

    it("should set isUpdating to false", () => {
        expect(ctrl.isUpdating).not.toBeDefined();
        ctrl.$onInit();
        expect(ctrl.isUpdating).toBe(false);
    });

    it("should set isUpdating to true", () => {
        expect(ctrl.isUpdating).not.toBeDefined();
        ctrl.showUpdatingPanel(true);
        expect(ctrl.isUpdating).toBe(true);
    });

    it("should filter patients when filter is equal to ''", () => {
        ctrl.filter = '';
        expect(ctrl.patients).toEqual(bindings.patients);
        expect(ctrl.filteredPatients).not.toBeDefined();
        
        ctrl._getFilteredPatients();

        expect(ctrl.filteredPatients).toBeDefined();
        expect(ctrl.filteredPatients).toEqual(bindings.patients);
    });

    it("should filter patients when filter is equal to undefined", () => {
        ctrl.filter = '';
        expect(ctrl.patients).toEqual(bindings.patients);
        expect(ctrl.filteredPatients).not.toBeDefined();
        
        ctrl._getFilteredPatients();

        expect(ctrl.filteredPatients).toBeDefined();
        expect(ctrl.filteredPatients).toEqual(bindings.patients);
    });

    it("should filter patients when filter is equal to 'John'", () => {
        ctrl.filter = 'John';
        expect(ctrl.patients).toEqual(bindings.patients);
        expect(ctrl.filteredPatients).not.toBeDefined();
        
        ctrl._getFilteredPatients();

        expect(ctrl.filteredPatients).toBeDefined();
        expect(ctrl.filteredPatients).toEqual(bindings.patients.slice(0, 1));
    });

    it("should filter patients when filter is equal to '123asasd123asdasd'", () => {
        ctrl.filter = '123asasd123asdasd';
        expect(ctrl.patients).toEqual(bindings.patients);
        expect(ctrl.filteredPatients).not.toBeDefined();
        
        ctrl._getFilteredPatients();

        expect(ctrl.filteredPatients).toBeDefined();
        expect(ctrl.filteredPatients).toEqual([]);
    });

    it('should call _getFilteredPatients when onFilterChange is called', () => {
        spyOn(ctrl, "_getFilteredPatients");

        expect(ctrl._getFilteredPatients).not.toHaveBeenCalled();
        ctrl.onFilterChange();
        expect(ctrl._getFilteredPatients).toHaveBeenCalled();
    });

    it('should delete patient', () => {
        expect(ctrl.patients).toEqual(bindings.patients);
        ctrl.onPatientDeleted(2);
        expect(ctrl.patients).toEqual(bindings.patients.slice(0, 1));
    });

    it('should call _getFilteredPatients and showUpdatingPanel when onPatientDeleted is called with patientId = 2', () => {
        spyOn(ctrl, "_getFilteredPatients");
        spyOn(ctrl, "showUpdatingPanel");
        
        expect(ctrl._getFilteredPatients).not.toHaveBeenCalled();
        expect(ctrl.showUpdatingPanel).not.toHaveBeenCalled();
        
        ctrl.onPatientDeleted(2);
        
        expect(ctrl._getFilteredPatients).toHaveBeenCalled();
        expect(ctrl.showUpdatingPanel).toHaveBeenCalledWith(false);
    });

    it('should not delete any patient when onPatientDeleted is called with patientId = 10', () => {
        spyOn(ctrl, "_getFilteredPatients");
        spyOn(ctrl, "showUpdatingPanel");
        
        expect(ctrl._getFilteredPatients).not.toHaveBeenCalled();
        expect(ctrl.showUpdatingPanel).not.toHaveBeenCalled();
        expect(ctrl.patients).toEqual(bindings.patients);
        
        ctrl.onPatientDeleted(10);
        
        expect(ctrl.patients).toEqual(bindings.patients);
        expect(ctrl._getFilteredPatients).not.toHaveBeenCalled();
        expect(ctrl.showUpdatingPanel).toHaveBeenCalledWith(false);
    });

});