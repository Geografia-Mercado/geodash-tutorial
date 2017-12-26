import { FIREBASE_CONFIG } from '../../../envconfig.js'
import * as firebase from 'firebase'
export default function ($q, $http, $state) {
  const DB_URL = FIREBASE_CONFIG.databaseURL
  return {
    signIn: signIn,
    getUserId: getUserId,
    createChild: createChild,
    getCurrentUserUploads: getCurrentUserUploads,
    handleError: handleError
  }
  function handleError (err) { console.log('err:', err) }

  function signIn (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }

  function createChild (path, childObj) {
    return $q((resolve, _) => {
      getToken().then(
        (token) => {
          $http.post(DB_URL + path + '.json?auth=' + token, childObj).then(httpResp => {
            resolve(httpResp.data.name)
          }).catch(handleError)
        }
      ).catch(handleError)
    })
  }

  function getChild (path) {
    return $q((resolve, _) => {
      getToken().then(
        (token) => {
          $http.get(DB_URL + path + '.json?auth=' + token).then(httpResp => {
            resolve(httpResp.data)
          }).catch(handleError)
        }
      ).catch(handleError)
    })
  }

  function getUserId () {
    let user = firebase.auth().currentUser
    return (user === null) ? null : user.uid
  }

  function getToken () {
    return $q((resolve, _) => {
      let currentUser = firebase.auth().currentUser
      if (currentUser === null) {
        $state.go('login')
      } else {
        currentUser.getIdToken().then(token => resolve(token), handleError)
      }
    })
  }

  function getCurrentUserUploads () {
    let uid = getUserId()
    let out = {}
    return $q((resolve, _) => {
      getChild('/uploads').then(uploads => {
        Object.keys(uploads)
        .filter(uploadId => uploads[uploadId].user === uid)
        .map(uploadId => {
          out[uploadId] = uploads[uploadId]
        })
        resolve(out)
      })
    })
  }
}
