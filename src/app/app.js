import angular from 'angular';
import uiRouter from '../../node_modules/@uirouter/angularjs/release/angular-ui-router.js'

import '../../node_modules/angular-material/angular-material.css'
import '../../node_modules/angular-material/angular-material.js'
import '../../node_modules/angular-animate/angular-animate.js'
import '../../node_modules/angular-aria/angular-aria.js'
import '../../node_modules/angular-messages/angular-messages.js'

import FirebaseService from './services/firebase.service.js'
import AppBoot from './app.boot.js'
import Config from './config.js'
import AppDirective from './app.directive.js'

import LoginController from './layout/login/login.controller.js'
import ImportController from './layout/import/import.controller.js'
import DashboardController from './layout/dashboard/dashboard.controller.js' // XXX

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter, 'ngMessages', 'ngAria', 'ngAnimate', 'ngMaterial'])
.run(AppBoot)
.factory('firebaseService', FirebaseService)
.config(['$stateProvider', Config])
.directive('app', AppDirective)
.controller('loginController', ['$state', 'firebaseService', LoginController])
.controller('importController', ['$scope', '$state', '$element', ImportController])
.controller('dashboardController', ['$mdSidenav', DashboardController])

export default MODULE_NAME;
