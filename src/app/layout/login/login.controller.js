export default class {
  constructor (firebaseService) {
    this.firebaseService = firebaseService
  }

  login (email, password) {
    this.firebaseService.signIn(email, password)
  }
}
