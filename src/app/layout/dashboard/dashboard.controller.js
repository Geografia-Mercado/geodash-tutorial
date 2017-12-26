export default class {
  constructor (firebaseService) {
    firebaseService.getCurrentUserUploads().then(uploads => (this.uploads = uploads))
  }
}
