export default 
    function(){
		return {
			restrict: 'A',
            scope: {
                changeDate: "&",
                disabledDates: "<"
			},
			link: (scope, elm, attr, ctrl) => {
				elm.datepicker({
				   format: "dd/mm/yyyy",
   				   language: "pl",
				   orientation: 'bottom left',
				   autoclose: attr.autoclose === 'true',
				   multidate: attr.multidate === 'true',
				   daysOfWeekDisabled: "0,6",
				   startDate: new Date()
				}).on('changeDate', (e) => {
                    scope.changeDate({event: e});
				});
                elm.datepicker('setDatesDisabled', scope.disabledDates);
				
				scope.$watch(attr.currentDate, (new_value) =>{
					if(new_value === '') {
						elm.datepicker('update', new_value);
					} 
					if(angular.isArray(new_value)) {
						elm.datepicker('setDate', new_value);
					}
					
				}, true);
			}
		};
    }