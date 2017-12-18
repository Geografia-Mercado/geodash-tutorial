import angular from 'angular';
import uiRouter from '../../node_modules/@uirouter/angularjs/release/angular-ui-router.js'

import '../../node_modules/angular-material/angular-material.css'
import '../../node_modules/angular-material/angular-material.js'
import '../../node_modules/angular-animate/angular-animate.js'
import '../../node_modules/angular-aria/angular-aria.js'

import FirebaseService from './services/firebase.service.js'
import Config from './config.js'
import AppDirective from './app.directive.js'
import LoginController from './layout/login/login.controller.js'

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [uiRouter, 'ngAria', 'ngAnimate', 'ngMaterial'])
.factory('firebaseService', FirebaseService)
.config(['$stateProvider', Config])
.directive('app', AppDirective)
.controller('loginController', ['firebaseService', LoginController])

export default MODULE_NAME;
