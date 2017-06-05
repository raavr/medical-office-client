import AuthGuardUser from '../auth/auth-guard-user.service';
import ProfileResolve from './profile/profile.resolver';

export default function AccountConfig($stateProvider) {
    $stateProvider.state(
         { name: "account", 
           url: "/account", 
           component: "account",
           resolve: {
               canActivate: AuthGuardUser,
               user: ProfileResolve
           }
        }
    );
}

AccountConfig.$inject = ['$stateProvider'];