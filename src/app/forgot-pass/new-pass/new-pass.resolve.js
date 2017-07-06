export function NewPassResolve(newPassService, $transition$, $location) {
    return newPassService.checkValidToken($transition$.params().token).toPromise().catch(() => $location.path("/no-content"));
}

NewPassResolve.$inject = ['newPassService', '$transition$', '$location'];

export function GetTokenResolve($transition$) {
    return $transition$.params().token;
}

GetTokenResolve.$inject = ['$transition$'];