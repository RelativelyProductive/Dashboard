import ApiClient from '../ApiClient'

/**
 * The UserClient model module.
 * @module RelativelyProductive/models/UserClient
 * @version v1-prerelease
 */
export default class UserClient {
  /**
   * Constructs a new <code>UserClient</code>.
   * @alias module:RelativelyProductive/models/UserClient
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>UserClient</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/UserClient} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/UserClient} The populated <code>UserClient</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserClient()

      if (data.hasOwnProperty('clientName')) {
        obj['clientName'] = ApiClient.convertToType(data['clientName'], 'String')
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} clientName
   */
  clientName = undefined
  /**
   * @member {String} clientId
   */
  clientId = undefined
}
