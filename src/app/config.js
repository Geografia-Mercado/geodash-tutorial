export default function ($stateProvider) {
  let loginState = {
    name: 'login',
    url: '/login',
    template: require('./layout/login/login.template.html'),
    controller: 'loginController',
    controllerAs: 'vm'
  }
  $stateProvider.state(loginState)
}
