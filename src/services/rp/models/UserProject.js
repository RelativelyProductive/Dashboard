import ApiClient from '../ApiClient'

/**
 * The UserProject model module.
 * @module RelativelyProductive/models/UserProject
 * @version v1-prerelease
 */
export default class UserProject {
  /**
   * Constructs a new <code>UserProject</code>.
   * @alias module:RelativelyProductive/models/UserProject
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>UserProject</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/UserProject} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/UserProject} The populated <code>UserProject</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserProject()

      if (data.hasOwnProperty('projectName')) {
        obj['projectName'] = ApiClient.convertToType(data['projectName'], 'String')
      }
      if (data.hasOwnProperty('projectId')) {
        obj['projectId'] = ApiClient.convertToType(data['projectId'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} projectName
   */
  projectName = undefined
  /**
   * @member {String} projectId
   */
  projectId = undefined
}
