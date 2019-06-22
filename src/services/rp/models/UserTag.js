import ApiClient from '../ApiClient'

/**
 * The UserTag model module.
 * @module RelativelyProductive/models/UserTag
 * @version v1-prerelease
 */
export default class UserTag {
  /**
   * Constructs a new <code>UserTag</code>.
   * @alias module:RelativelyProductive/models/UserTag
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>UserTag</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/UserTag} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/UserTag} The populated <code>UserTag</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new UserTag()

      if (data.hasOwnProperty('tagName')) {
        obj['tagName'] = ApiClient.convertToType(data['tagName'], 'String')
      }
      if (data.hasOwnProperty('tagId')) {
        obj['tagId'] = ApiClient.convertToType(data['tagId'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} tagName
   */
  tagName = undefined
  /**
   * @member {String} tagId
   */
  tagId = undefined
}
