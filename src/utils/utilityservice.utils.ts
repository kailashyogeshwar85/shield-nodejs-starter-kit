export default class UtilityService {
  /**
   * @description takes __filename from nodejs server
   * @param filePath
   */
  public static getFileName(filePath: string): string {
    return filePath.split('/')[filePath.split('/').length - 1];
  }

  /**
   * @description
   * @param {string} metrics
   * @memberof UtilityService
   */
  public static tryParse(jsonStr: string): JSON | string {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return jsonStr || '';
    }
  }
}
