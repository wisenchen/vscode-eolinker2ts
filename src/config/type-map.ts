/**
 * 类型名称转换Map
 * 由于各语言的类型表示不同，所以在这定义一个与ts类型之间的映射map
 */

export const typeMap = new Map<string, string>([
    ["int", "number"],
    ["double", "number"],
    ["float", "number"],
  ]);