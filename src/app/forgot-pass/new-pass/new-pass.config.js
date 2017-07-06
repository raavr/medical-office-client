import { NewPassResolve, GetTokenResolve } from './new-pass.resolve';

export default function NewPassConfig($stateProvider) {
    $stateProvider.state({ 
        name: "new-pass", 
        url: "/reset/{token}", 
        component: "newPass",
        resolve: {
            canActivate: NewPassResolve,
            token: GetTokenResolve
        }
    });   
}


NewPassConfig.$inject = ['$stateProvider'];