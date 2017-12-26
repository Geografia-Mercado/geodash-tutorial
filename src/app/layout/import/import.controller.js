export default class {
  constructor ($q, $scope, $state, $element, cartodbService) {
    this.$q = $q
    this.$scope = $scope
    this.cartodbService = cartodbService
    this.addresses = []
    this.loading = false
    $element.find('input').bind('change', ev => this.handleFile(ev.target.files[0]))

    console.log('carto', cartodbService)
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
      points.map(point => console.log('p', point))
    })
  }
}
