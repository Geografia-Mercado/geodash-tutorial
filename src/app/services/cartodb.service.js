import { CARTODB_API_KEY, CARTODB_USER, HERE_MAP_CONFIG } from '../../../envconfig.js'
import cartodb from 'cartodb'
import angular from 'angular'
export default function ($q, $http) {
  const self = this
  const SQL_API_ROOT_ENDPOINT = 'https://' + CARTODB_USER + '.carto.com/api/v2/sql?api_key=' + CARTODB_API_KEY
  const MAP_URL = "https://{s}.maps.nlp.nokia.com/maptile/2.1/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?lg=eng"
  return {
    foo: () => console.log('carto', cartodb),
    geocodeAddress: geocodeAddress,
    createMap: createMap,
    drawMarker: drawMarker
  }
  let map = null
  let mapTileLayer = null

  function createMap () {
    map = cartodb.L.map('map', {
      zoomControl: true,
      center: [-23.5652927, -46.652198],
      zoom: 13,
      maxZoom: 18,
      minZoom: 3,
      search: true,
      fullscreen: true,
      legends: true,
      mobile_layout: true,
      drawControl: false
    })
    mapTileLayer = cartodb.L.tileLayer(MAP_URL + '&token=' + CARTODB_API_KEY + '&app_id=' + HERE_MAP_CONFIG.app_id, HERE_MAP_CONFIG).addTo(map, 0)
    map.zoomControl.setPosition('bottomright')
    console.log('map', map)
    resizeMap()
  }

  function resizeMap () { setTimeout(function () { map.invalidateSize() }, 300) }

  function runQuery (sqlQuery) {
    return $http.get(SQL_API_ROOT_ENDPOINT + '&q=' + sqlQuery)
  }

  function geocodeAddress (addressText) {
    let sqlQuery = `SELECT ST_AsGeoJSON(cdb_geocode_street_point('${addressText}')) as geojson`
    return $q((resolve, reject) => {
      runQuery(sqlQuery).then(httpResp => {
        let lon = angular.fromJson(httpResp.data.rows[0].geojson).coordinates[0]
        let lat = angular.fromJson(httpResp.data.rows[0].geojson).coordinates[1]
        resolve({lon, lat, address: addressText})
      }).catch(reject)
    })
  }

  function drawMarker (lat, lon, msg) {
    cartodb.L.marker([lat, lon], {title: msg}).addTo(map)
  }
}
