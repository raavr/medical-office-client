export default function AuthGuardAdminService($q, $authService, $location) {
    let deferred = $q.defer();

    if (!$authService.loggedIn()) {
      $location.path('/login');
    } else {
      deferred.resolve();
    }

    return deferred.promise;
}

AuthGuardAdminService.$inject = ['$q', 'authService', '$location'];