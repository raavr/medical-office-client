export default function DashboardConfig($stateProvider) {
  const state = {
    name: "dashboard",
    url: "/dashboard",
    component: "dashboard",
    redirectTo: "dashboard.visits.current"
  };

  $stateProvider.state(state)
}

DashboardConfig.$inject = ['$stateProvider'];