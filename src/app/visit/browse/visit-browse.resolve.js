export default function VisitBrowseResolve(type) {
  return ['visitBrowseService', function (visitBrowseService) {
    return visitBrowseService.getVisits({ type }).toPromise().catch(() => { });
  }];
} 