var relativelyProductiveApi = require('@src/services/rp/index.js')

export default class RelativelyProductiveClient {
  constructor(options = {}) {
    this.basePath = options.basePath
    this.accessToken = options.accessToken
  }
  api() {
    // var basePath = this.basePath
    var accessToken = this.accessToken

    let _identity = getSavedState('auth.identity')

    // if(!_identity) {
    //   _identity =
    // }

    var _accessToken = _identity ? _identity.accessToken || '' : ''

    if (!_accessToken) {
      // throw new Error('Please provide an access token.')
      return null
    }

    // if (basePath) _apiBasePath = basePath.replace(/\/+$/, '')

    var _relativelyProductiveApiClient = new relativelyProductiveApi.ApiClient({
      // basePath: _apiBasePath,
      accessToken: _accessToken || accessToken,
    })

    return _relativelyProductiveApiClient
  }
}

// retrieve content from local storage for a given key
function getSavedState(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

RelativelyProductiveClient.instance = new RelativelyProductiveClient()
