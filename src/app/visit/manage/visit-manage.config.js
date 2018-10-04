import { VisitManageVisitDatetimesResolve } from './visit-manage.resolve';
import AuthGuardDoctor from '../../auth/auth-guard-doctor.service';

export default function VisitManageConfig($stateProvider) {

  $stateProvider.state(
    {
      name: "visit-manage",
      url: "/visit/manage",
      component: "visitManage",
      resolve: {
        canActivate: AuthGuardDoctor,
        visitDatetimes: VisitManageVisitDatetimesResolve
      }
    }
  );

}


VisitManageConfig.$inject = ['$stateProvider'];