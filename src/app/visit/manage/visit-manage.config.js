import { VisitManageVisitDatetimesResolve } from './visit-manage.resolve';
import AuthGuardDoctor from '../../auth/auth-guard-doctor.service';

export default function VisitManageConfig($stateProvider) {

  $stateProvider.state(
    {
      name: "dashboard.schedule",
      url: "/schedule",
      component: "visitManage",
      resolve: {
        canActivate: AuthGuardDoctor,
        visitDatetimes: VisitManageVisitDatetimesResolve
      }
    }
  );

}


VisitManageConfig.$inject = ['$stateProvider'];