export default class {
  constructor ($q, $scope, $state, $element, cartodbService, firebaseService) {
    this.$q = $q
    this.$scope = $scope
    this.cartodbService = cartodbService
    this.firebaseService = firebaseService
    this.addresses = []
    this.loading = false
    $element.find('input').bind('change', ev => this.handleFile(ev.target.files[0]))
  }

  handleFile (fileObj) {
    this.$scope.$apply(_ => {
      this.loading = true
      this.addresses = []
    })
    let reader = new FileReader()
    reader.readAsText(fileObj)
    reader.onload = () => {
      this.$scope.$apply(_ => {
        this.addresses = reader.result.split('\n').filter(address => address !== '')
        this.loading = false
      })
    }
  }

  popAddress (index) {
    this.addresses.splice(index, 1)
  }

  geocode () {
    let promises = []
    let points = []
    this.addresses.map(address => {
      promises.push(this.cartodbService.geocodeAddress(address))
    })
    this.$q.all(promises).then(points => {
      promises = []
      points.map(point => promises.push(this.firebaseService.createChild('/addresses', point)))
      this.$q.all(promises).then(pushIds => {
        let uploadObj = {
          user: this.firebaseService.getUserId(),
          addresses: pushIds,
          createdAt: {'.sv': 'timestamp'}
        }
        this.firebaseService.createChild('/uploads', uploadObj).then(_ => {
          console.log('upload concluido')
          this.state.go('dashboard')
        })
      })
    })
  }
}
