import VisitSignupMeResolve from './user/visit-signup-me.resolver';
import AuthGuardUser from '../../auth/auth-guard-user.service';

export default function VisitSignupConfig($stateProvider) {
    const states = [
         { 
             name: "visit-signup", 
             url: "/visit/signup", 
             component: "visitSignup" 
        },
        { 
            name: "visit-signup.me", 
            url: "/me", 
            component: "visitSignupMe", 
            resolve: {
                canActivate: AuthGuardUser,
                disabledDates: VisitSignupMeResolve
            } 
        }
    ]
    
    states.forEach((state) => {
        $stateProvider.state(state)   
    });
}


VisitSignupConfig.$inject = ['$stateProvider'];