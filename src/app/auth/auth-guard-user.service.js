export default function AuthGuardDoctorService($q, $authService, $location) {
  const deferred = $q.defer();

  if (!$authService.loggedIn()) {
    $location.path('/login');
  } else {
    deferred.resolve();
  }

  return deferred.promise;
}

AuthGuardDoctorService.$inject = ['$q', 'authService', '$location'];