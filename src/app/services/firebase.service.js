import * as firebase from 'firebase'
export default function () {
  return {
    signIn: signIn
  }

  function signIn (email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(_ => console.log('resp', _))
  }
}
