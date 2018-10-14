export default function VisitBrowseResolve(type) {
  return ['visitBrowseService', '$transition$', function (visitBrowseService, $transition$) {
    const filter = $transition$.params().filterParams;
    const status = filter && filter.status;
    const userName = filter && filter.userName;
    
    return visitBrowseService.getVisits({ 
        type, 
        status,
        userName
      })
      .toPromise()
      .catch(() => { });
  }];
} 