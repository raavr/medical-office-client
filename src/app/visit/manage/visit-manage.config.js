import { VisitManageUnavailableDatesResolve, VisitManageVisitTimesResolve } from './visit-manage.resolve';
import AuthGuardAdmin from '../../auth/auth-guard-admin.service';

export default function VisitManageConfig($stateProvider) {    

        $stateProvider.state(
            {
                name: "visit-manage",
                url: "/visit/manage",
                component: "visitManage",
                resolve: {
                    canActivate: AuthGuardAdmin,
                    disabledDates: VisitManageUnavailableDatesResolve,
                    visitTimes: VisitManageVisitTimesResolve
                }
            }
        );   

}


VisitManageConfig.$inject = ['$stateProvider'];