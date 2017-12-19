import * as firebase from 'firebase'
import { FIREBASE_CONFIG } from '../../envconfig.js'
export default function () {
  firebase.initializeApp(FIREBASE_CONFIG)
}
