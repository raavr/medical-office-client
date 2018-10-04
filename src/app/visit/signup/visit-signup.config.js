import VisitSignupMeResolve from './user/visit-signup-me.resolver';
import VisitSignupUserResolve from './doctor/visit-signup-user.resolver';
import AuthGuardUser from '../../auth/auth-guard-user.service';
import AuthGuardDoctor from '../../auth/auth-guard-doctor.service';

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
        doctorsList: VisitSignupMeResolve
      }
    },
    {
      name: "visit-signup.user",
      url: "/user",
      component: "visitSignupUser",
      resolve: {
        canActivate: AuthGuardDoctor,
        disabledDates: VisitSignupUserResolve
      }
    }
  ]

  states.forEach((state) => {
    $stateProvider.state(state)
  });
}


VisitSignupConfig.$inject = ['$stateProvider'];