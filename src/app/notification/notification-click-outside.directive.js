export default
  function NotficationClickOutsideDirective(notificationEventService) {
  return {
    restrict: 'A',
    scope: {},
    link: (scope, elm) => {
      angular.element(document).bind('click', (e) => {
        const dropdownElem = angular.element(e.target).hasClass("notification-dropdown");
        const isChildOfDropdown = angular.element(".notification-dropdown").find(e.target).length;
        const isModalElemOpen = angular.element(".modal").length;

        if (dropdownElem || isChildOfDropdown || isModalElemOpen) {
          return;
        }
        notificationEventService.hideNotificationMenu();
        scope.$apply();
      });
    }
  };
}

NotficationClickOutsideDirective.$inject = ['notificationEventService'];