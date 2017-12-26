import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from '../../envconfig.js'
export default function ($rootScope, $mdToast) {
  firebase.initializeApp(FIREBASE_CONFIG)
  $rootScope.showMessage = function (msg) {
    $mdToast.show(
      $mdToast.simple()
      .textContent(msg)
      .hideDelay(3000)
    )
  }
}
