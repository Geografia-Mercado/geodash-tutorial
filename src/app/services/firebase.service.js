import FIREBASE_CONFIG from '../../../envconfig.js'
import * as firebase from 'firebase'
export default function () {
  return {
    foo: _ => console.log('firebase', firebase)
  }
  firebase.initializeApp(FIREBASE_CONFIG)
}
