import ApiClient from '../ApiClient'

/**
 * The IClientsObjectCustomResponse model module.
 * @module RelativelyProductive/models/DataResponse
 * @version v1-prerelease
 */
export default class DataResponse {
  /**
   * Constructs a new <code>IClientsObjectCustomResponse</code>.
   * @alias module:RelativelyProductive/models/DataResponse
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>IClientsObjectCustomResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/DataResponse} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/DataResponse} The populated <code>IClientsObjectCustomResponse</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new DataResponse()

      if (data.hasOwnProperty('data')) {
        obj['data'] = data['data']
      }
      if (data.hasOwnProperty('isOk')) {
        obj['isOk'] = ApiClient.convertToType(data['isOk'], 'Boolean')
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {Object} data
   */
  data = undefined
  /**
   * @member {Boolean} isOk
   */
  isOk = undefined
  /**
   * @member {String} message
   */
  message = undefined
}
