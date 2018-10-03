import visitSignup from './signup/visit-signup';
import visitBrowse from './browse/visit-browse';
import visitManage from './manage/visit-manage';

export default 
  angular.module("visit", [
    visitSignup,
    visitBrowse,
    visitManage
  ]).name;