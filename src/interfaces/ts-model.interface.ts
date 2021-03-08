export interface TsModel {
  /**
   * 字段名称
   */
  name: string;
  /**
   * 类型
   */
  type: string;
  /**
   * 必填？
   */
  required: boolean;
  /**
   * 说明
   */
  desc?: string;
}
