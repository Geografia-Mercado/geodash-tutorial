export default class {
  constructor ($scope, $state, $element) {
    $element.find('input').bind('change', ev => this.handleFile(ev.target.files[0]))
    this.$scope = $scope
    this.addresses = []
    this.loading = false
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
        this.addresses = reader.result.split('\n')
        this.loading = false
      })
    }
  }

  popAddress (index) {
    this.addresses.splice(index, 1)
  }
}
