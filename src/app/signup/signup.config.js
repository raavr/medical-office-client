export default function SignupConfig($stateProvider) {
    $stateProvider.state(
         { name: "signup", url: "/signup", component: "signup" }
    );
}

SignupConfig.$inject = ['$stateProvider'];