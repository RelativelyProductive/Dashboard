import ApiClient from '../ApiClient'

/**
 * The GoalStats model module.
 * @module RelativelyProductive/models/GoalStats
 * @version v1-prerelease
 */
export default class GoalStats {
  /**
   * Constructs a new <code>GoalStats</code>.
   * @alias module:RelativelyProductive/models/GoalStats
   * @class
   */

  // eslint-disable-next-line
  constructor() {}

  /**
   * Constructs a <code>GoalStats</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:RelativelyProductive/models/GoalStats} obj Optional instance to populate.
   * @return {module:RelativelyProductive/models/GoalStats} The populated <code>GoalStats</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new GoalStats()

      if (data.hasOwnProperty('goalsAchieved')) {
        obj['goalsAchieved'] = ApiClient.convertToType(data['goalsAchieved'], 'Number')
      }
      if (data.hasOwnProperty('goalsAttempted')) {
        obj['goalsAttempted'] = ApiClient.convertToType(data['goalsAttempted'], 'Number')
      }
      if (data.hasOwnProperty('startDate')) {
        obj['startDate'] = ApiClient.convertToType(data['startDate'], 'Date')
      }
      if (data.hasOwnProperty('endDate')) {
        obj['endDate'] = ApiClient.convertToType(data['endDate'], 'Date')
      }
    }
    return obj
  }

  /**
   * @member {Number} goalsAchieved
   */
  goalsAchieved = undefined
  /**
   * @member {Number} goalsAttempted
   */
  goalsAttempted = undefined
  /**
   * @member {Date} startDate
   */
  startDate = undefined
  /**
   * @member {Date} endDate
   */
  endDate = undefined
}
