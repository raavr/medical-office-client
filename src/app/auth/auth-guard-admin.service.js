export default function AuthGuardAdminService($q, $authService, $location) {
  const deferred = $q.defer();

  if (!$authService.loggedIn()) {
    $location.path('/login');
  } else if (!$authService.isAdmin()) {
    $location.path('/');
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}

AuthGuardAdminService.$inject = ['$q', 'authService', '$location'];