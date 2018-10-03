export default function HomeConfig($stateProvider, uiGmapGoogleMapApiProvider) {
  $stateProvider.state({ 
    name: "home", 
    url: "/", 
    component: "home" 
  });

  uiGmapGoogleMapApiProvider.configure({
    key: 'MAP_API_KEY'
  });
}

HomeConfig.$inject = ['$stateProvider', 'uiGmapGoogleMapApiProvider'];