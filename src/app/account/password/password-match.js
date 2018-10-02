function PasswordMatchDirective() {
  return {
    require: 'ngModel',
    scope: {
      otherModelValue: '=passwordMatch'
    },
    link: function (scope, element, attributes, ngModel) {
      ngModel.$validators.compareTo = (modelValue) => {
        return modelValue === scope.otherModelValue;
      };
      scope.$watch('otherModelValue', () => {
        ngModel.$validate();
      });
    }
  };
}

export default
  angular.module("password.match", [])
    .directive("passwordMatch", PasswordMatchDirective)
    .name;