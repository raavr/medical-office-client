export default function CollapseNavbarDirective() {
  return {
    restrict: "A",
    link: function (scope, elem) {
      elem.bind("click", () => {
        angular.element(elem).closest("#nav-data").collapse('hide');
      });
    }
  }
}