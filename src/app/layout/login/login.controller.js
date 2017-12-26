export default class {
  constructor ($state, firebaseService) {
    this.firebaseService = firebaseService
    this.$state = $state
  }

  login (email, password) {
    this.firebaseService.signIn(email, password).then(_ => { // promise resolve com usuário do firebase
      this.$state.go('dashboard')
    })
    .catch(this.firebaseService.handleError)
  }
}
