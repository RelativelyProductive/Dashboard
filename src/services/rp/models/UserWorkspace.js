import ApiClient from '../ApiClient'

/**
 * The UserWorkspace model module.
 * @module RelativelyProductive/models/UserWorkspace
 * @version v1-prerelease
 */
export default class UserWorkspace {
  /**
   * Constructs a new <code>UserWorkspace</code>.
   * @alias module:RelativelyProductive/models/UserWorkspace
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>UserWorkspace</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/UserWorkspace} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/UserWorkspace} The populated <code>UserWorkspace</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserWorkspace()

      if (data.hasOwnProperty('workspaceName')) {
        obj['workspaceName'] = ApiClient.convertToType(data['workspaceName'], 'String')
      }
      if (data.hasOwnProperty('workspaceId')) {
        obj['workspaceId'] = ApiClient.convertToType(data['workspaceId'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} workspaceName
   */
  workspaceName = undefined
  /**
   * @member {String} workspaceId
   */
  workspaceId = undefined
}
