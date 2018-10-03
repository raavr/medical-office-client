import VisitBrowseResolve from './visit-browse.resolve';
import AuthGuardUser from '../../auth/auth-guard-user.service';

export default function VisitBrowseConfig($stateProvider) {

  const states = [
    {
      name: "visit-browse",
      url: "/visit/browse",
      component: "visitBrowse"
    },
    {
      name: "visit-browse.current",
      url: "/current",
      component: "visitList",
      resolve: {
        canActivate: AuthGuardUser,
        visits: VisitBrowseResolve('current')
      }
    },
    {
      name: "visit-browse.past",
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