import ApiClient from '../ApiClient'

/**
 * The User model module.
 * @module RelativelyProductive/models/User
 * @version v1-prerelease
 */
export default class User {
  /**
   * Constructs a new <code>User</code>.
   * @alias module:RelativelyProductive/models/User
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/User} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/User} The populated <code>User</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new User()

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String')
      }
      if (data.hasOwnProperty('nameIdentifier')) {
        obj['nameIdentifier'] = ApiClient.convertToType(data['nameIdentifier'], 'String')
      }
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String')
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String')
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String')
      }
      if (data.hasOwnProperty('togglApiKey')) {
        obj['togglApiKey'] = ApiClient.convertToType(data['togglApiKey'], 'String')
      }
      if (data.hasOwnProperty('togglWorkspaceID')) {
        obj['togglWorkspaceID'] = ApiClient.convertToType(data['togglWorkspaceID'], 'String')
      }
      if (data.hasOwnProperty('userSecret')) {
        obj['userSecret'] = ApiClient.convertToType(data['userSecret'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} id
   */
  id = undefined
  /**
   * @member {String} nameIdentifier
   */
  nameIdentifier = undefined
  /**
   * @member {String} userName
   */
  userName = undefined
  /**
   * @member {String} email
   */
  email = undefined
  /**
   * @member {String} togglApiKey
   */
  togglApiKey = undefined
  /**
   * @member {String} togglWorkspaceID
   */
  togglWorkspaceID = undefined
  /**
   * @member {String} userSecret
   */
  userSecret = undefined
}
