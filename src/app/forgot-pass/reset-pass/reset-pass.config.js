export default function ResetPassConfig($stateProvider) {
  $stateProvider.state({
    name: "reset-pass",
    url: "/reset",
    component: "resetPass"
  });
}

ResetPassConfig.$inject = ['$stateProvider'];