import ApiClient from '../ApiClient'

/**
 * The Goal model module.
 * @module RelativelyProductive/models/Goal
 * @version v1-prerelease
 */
export default class Goal {
  /**
   * Constructs a new <code>Goal</code>.
   * @alias module:RelativelyProductive/models/Goal
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>Goal</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/Goal} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/Goal} The populated <code>Goal</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new Goal()

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'String')
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'String')
      }
      if (data.hasOwnProperty('goalFriendlyName')) {
        obj['goalFriendlyName'] = ApiClient.convertToType(data['goalFriendlyName'], 'String')
      }
      if (data.hasOwnProperty('dailyGoalTimeInMs')) {
        obj['dailyGoalTimeInMs'] = ApiClient.convertToType(data['dailyGoalTimeInMs'], 'Number')
      }
      if (data.hasOwnProperty('dailyGoalTrackStyle')) {
        obj['dailyGoalTrackStyle'] = ApiClient.convertToType(data['dailyGoalTrackStyle'], 'Number')
      }
      if (data.hasOwnProperty('dailyGoalTogglID')) {
        obj['dailyGoalTogglID'] = ApiClient.convertToType(data['dailyGoalTogglID'], 'String')
      }
    }
    return obj
  }

  /**
   * @member {String} id
   */
  id = undefined
  /**
   * @member {String} userId
   */
  userId = undefined
  /**
   * @member {String} goalFriendlyName
   */
  goalFriendlyName = undefined
  /**
   * @member {Number} dailyGoalTimeInMs
   */
  dailyGoalTimeInMs = undefined
  /**
   * @member {module:RelativelyProductive/models/Goal.DailyGoalTrackStyleEnum} dailyGoalTrackStyle
   */
  dailyGoalTrackStyle = undefined
  /**
   * @member {String} dailyGoalTogglID
   */
  dailyGoalTogglID = undefined

  /**
   * Allowed values for the <code>dailyGoalTrackStyle</code> property.
   * @enum {Number}
   * @readonly
   */
  static DailyGoalTrackStyleEnum = {
    /**
     * value: 0
     * @const
     */
    '0': 0,

    /**
     * value: 1
     * @const
     */
    '1': 1,

    /**
     * value: 2
     * @const
     */
    '2': 2,

    /**
     * value: 3
     * @const
     */
    '3': 3,

    /**
     * value: 4
     * @const
     */
    '4': 4,
  }
}
