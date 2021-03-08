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

export interface TableColOrder {
  name: number;
  type: number;
  isRequired: number;
  desc: number;
}
