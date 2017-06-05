export default
    function() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=passwordMatch'
            },
            link: function(scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = (modelValue) => {
                    return modelValue === scope.otherModelValue;
                };
                scope.$watch('otherModelValue', () => {
                    ngModel.$validate();
                });
            }
        };
    }