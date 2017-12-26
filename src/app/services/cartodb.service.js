import { CARTODB_API_KEY, CARTODB_USER } from '../../../envconfig.js'
import cartodb from 'cartodb'
import angular from 'angular'
export default function ($q, $http) {
  const SQL_API_ROOT_ENDPOINT = 'https://' + CARTODB_USER + '.carto.com/api/v2/sql?api_key=' + CARTODB_API_KEY
  return {
    foo: () => console.log('carto', cartodb),
    geocodeAddress: geocodeAddress
  }

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
}
