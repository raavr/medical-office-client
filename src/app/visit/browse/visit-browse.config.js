import VisitBrowseResolve from './visit-browse.resolve';
import AuthGuardUser from '../../auth/auth-guard-user.service';

export default function VisitBrowseConfig($stateProvider) {

  const states = [
    {
      name: "dashboard.visits",
      url: "/visits",
      component: "visitBrowse",
      redirectTo: "dashboard.visits.current"
    },
    {
      name: "dashboard.visits.current",
      url: "/current",
      component: "visitList",
      params: {
        filterParams: null
      },
      resolve: {
        canActivate: AuthGuardUser,
        visits: VisitBrowseResolve('current'),
        filterParams: [
          '$transition$', 
          $transition$ => $transition$.params().filterParams
        ]
      }
    },
    {
      name: "dashboard.visits.past",
      url: "/past",
      component: "visitList",
      resolve: {
        canActivate: AuthGuardUser,
        visits: VisitBrowseResolve('past')
      }
    }
  ]

  states.forEach((state) => {
    $stateProvider.state(state)
  });
}


VisitBrowseConfig.$inject = ['$stateProvider'];