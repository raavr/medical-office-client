import VisitSignupMeResolve from './user/visit-signup-me.resolver';

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
                disabledDates: VisitSignupMeResolve
            } 
        }
    ]
    
    states.forEach((state) => {
        $stateProvider.state(state)   
    });
}


VisitSignupConfig.$inject = ['$stateProvider'];