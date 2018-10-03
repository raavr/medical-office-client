import resetPass from './reset-pass/reset-pass';
import newPass from './new-pass/new-pass';

export default
  angular.module("forgot-pass", [
    resetPass,
    newPass
  ]).name;