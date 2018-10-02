import { VisitManageVisitDatetimesResolve } from './visit-manage.resolve';
import AuthGuardAdmin from '../../auth/auth-guard-admin.service';

export default function VisitManageConfig($stateProvider) {    

        $stateProvider.state(
            {
                name: "visit-manage",
                url: "/visit/manage",
                component: "visitManage",
                resolve: {
                    canActivate: AuthGuardAdmin,
                    visitDatetimes: VisitManageVisitDatetimesResolve
                }
            }
        );   

}


VisitManageConfig.$inject = ['$stateProvider'];