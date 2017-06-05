import BtDatepicker from './bt-datepicker.directive';

export default 
    angular.module("visit.common", [])
           .directive("btDatepicker", BtDatepicker)
           .name;