import { FIREBASE_CONFIG } from '../../../envconfig.js'
import * as firebase from 'firebase'
export default function ($q, $http) {
  const DB_URL = FIREBASE_CONFIG.databaseURL
  return {
    signIn: signIn,
    getUserId: getUserId,
    createChild: createChild,
    handleError: handleError
  }
  function handleError (err) { console.log('err:', err) }

  function signIn (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function createChild (path, childObj) {
    return $q((resolve, _) => {
      firebase.auth().currentUser.getIdToken().then(
        (token) => {
          console.log(token)
          $http.post(DB_URL + path + '.json?auth=' + token, childObj).then(httpResp => {
            resolve(httpResp.data.name)
          }).catch(handleError)
        }
      ).catch(handleError)
    })
  }

  function getUserId () {
    return firebase.auth().currentUser.uid
  }
}
