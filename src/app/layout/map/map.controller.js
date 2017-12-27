export default class {
  constructor ($stateParams, firebaseService, cartodbService) {
    cartodbService.createMap()
    this.uploadId = $stateParams.uploadId
    firebaseService.getAddressesByUploadId(this.uploadId).then(_ => console.log(_))
  }
}
