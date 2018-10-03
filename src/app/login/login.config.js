export default function LoginConfig($stateProvider) {
  $stateProvider.state({
    name: "login",
    url: "/login",
    component: "login"
  });
}

LoginConfig.$inject = ['$stateProvider'];