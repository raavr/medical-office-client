import visitSignup from './signup/visit-signup';
import visitBrowse from './browse/visit-browse';

export default 
    angular.module("visit", [
        visitSignup,
        visitBrowse
    ]).name;