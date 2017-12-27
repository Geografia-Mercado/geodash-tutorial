export default class {
  constructor ($state, firebaseService) {
    this.$state = $state
    firebaseService.getCurrentUserUploads().then(uploads => (this.uploads = uploads))
  }

  viewUpload (uploadId) {
    console.log('upload Id', uploadId)
    this.$state.go('map', {uploadId})
  }
}
