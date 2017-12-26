import * as firebase from 'firebase'
export default function () {
  return {
    signIn: signIn,
    handleError: (err) => console.log('err:', err)
  }

  function signIn (email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
}
