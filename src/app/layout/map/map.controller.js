export default class {
  constructor ($stateParams, firebaseService, cartodbService) {
    cartodbService.createMap()
    this.uploadId = $stateParams.uploadId
    firebaseService.getAddressesByUploadId(this.uploadId).then(addresses => {
      this.addresses = addresses
      addresses.map(address => {
        cartodbService.drawMarker(address.lat, address.lon, address.address)
      })
    })
  }
}
