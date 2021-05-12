/**
 * 转为interface时的类型定义
 */
export interface InterfaceType {
  /**
   * 类型名称
   */
  typeName: string;
  /**
   * 字段内容
   */
  content: string;
}
/**
 * 转为model时的类型定义
 */
export interface ModelType {
  /**
   * 类型名称
   */
  typeName: string;
  /**
   * 字段内容
   */
  content: string;
  /**
   * 构造器内赋值的内容
   */
  constructorInnerContent: string;
}

/**
 * eolinker表格每列的顺序
 */
export interface TableColOrder {
  name: number;
  type: number;
  isRequired: number;
  desc: number;
}

export enum ActionType {
  /**
   * eolinker上复制的表格转换
   */
  EolinkerTable = 1,
  /**
   * 复制json转换
   */
  Json = 2,
  /**
   * 复制interface转换成model
   */
  Interface2Model
}
