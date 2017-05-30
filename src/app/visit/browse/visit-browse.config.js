import CurrentUserVisitResolve from './list/visit-item/user/user-visit-current.resolve';
import PastUserVisitResolve from './list/visit-item/user/user-visit-past.resolve';
import CurrentAdminVisitResolve from './list/visit-item/admin/admin-visit-current.resolve';
import PastAdminVisitResolve from './list/visit-item/admin/admin-visit-past.resolve';
import AuthGuardUser from '../../auth/auth-guard-user.service';
import AuthGuardAdmin from '../../auth/auth-guard-admin.service';

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
                visits: CurrentUserVisitResolve,
                type: () => "user_current"
            }
        },
        {
            name: "visit-browse.past",
            url: "/past",
            component: "visitList",
            resolve: {
                canActivate: AuthGuardUser,
                visits: PastUserVisitResolve,
                type: () => "user_past"
            }
        },
        {
            name: "visit-browse.admin-current",
            url: "/admin/current",
            component: "visitList",
            resolve: {
                canActivate: AuthGuardAdmin,
                visits: CurrentAdminVisitResolve,
                type: () => "admin_current"
            }
        },
        {
            name: "visit-browse.admin-past",
            url: "/admin/past",
            component: "visitList",
            resolve: {
                canActivate: AuthGuardAdmin,
                visits: PastAdminVisitResolve,
                type: () => "admin_past"
            }
        }
    ]
    
    states.forEach((state) => {
        $stateProvider.state(state)   
    });
}


VisitBrowseConfig.$inject = ['$stateProvider'];