export default
  function () {
  return {
    restrict: 'A',
    scope: {
      changeDate: "&",
      disabledDates: "<",
      currentDate: "<"
    },
    link: (scope, elm, attr, ctrl) => {
      elm.datepicker({
        format: "dd/mm/yyyy",
        language: "pl",
        orientation: 'bottom left',
        autoclose: attr.autoclose === 'true',
        multidate: attr.multidate === 'true',
        startDate: new Date()
      }).on('changeDate', (e) => {
        scope.changeDate({ event: e });
      });
      elm.datepicker('setDatesDisabled', scope.disabledDates);

      scope.$watch("currentDate", (new_value) => {
        if (!new_value || new_value === '') {
          elm.datepicker('update', '');
        }
        if (angular.isArray(new_value)) {
          elm.datepicker('setDate', new_value);
        }
      }, true);

      scope.$watch("disabledDates", (newDates) => {
        elm.datepicker('setDatesDisabled', newDates);
      }, true);
    }
  };
}