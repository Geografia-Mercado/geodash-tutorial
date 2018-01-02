export default class {
  constructor ($state, firebaseService) {
    this.$state = $state
    firebaseService.getCurrentUserUploads().then(uploads => (this.uploads = uploads))
  }

  viewUpload (uploadId) {
    this.$state.go('map', {uploadId})
  }
}
