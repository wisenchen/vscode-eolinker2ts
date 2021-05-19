/**
 * 匹配模板中的变量的正则
 */
export const templateTagReg = /#\{(\w+)\}/g;

/**
 * 匹配类型的正则
 */
export const typeMatchReg = /^\[([a-z]+)\]$/;

/**
 * interface类型正则
 */
export const interfaceMatchReg = /^(export)?\s?interface\s\w+\s\{(.*)\}$/s;