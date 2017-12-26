export default function ($stateProvider) {
  let loginState = {
    name: 'login',
    url: '/login',
    template: require('./layout/login/login.template.html'),
    controller: 'loginController',
    controllerAs: 'vm'
  }
  let dashboardState = {
    name: 'dashboard',
    url: '/dashboard',
    template: require('./layout/dashboard/dashboard.template.html'),
    controller: 'dashboardController',
    controllerAs: 'vm'
  }
  let importState = {
    name: 'import',
    url: '/import',
    template: require('./layout/import/import.template.html'),
    controller: 'importController',
    controllerAs: 'vm'
  }
  $stateProvider
  .state(loginState)
  .state(dashboardState)
  .state(importState)
}
