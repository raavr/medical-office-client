export default function VisitBrowseResolve(type) {
  return ['visitBrowseService', '$transition$', function (visitBrowseService, $transition$) {
    return visitBrowseService.getVisits({ 
        type, 
        status: $transition$.params().status 
      })
      .toPromise()
      .catch(() => { });
  }];
} 