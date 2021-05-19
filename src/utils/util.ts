import { interfaceMatchReg } from "../config";
import { ActionType } from "../interfaces";

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    // 有可能是jsonc的格式
    return /^\{(.*)\}$/s.test(str);
  }
};

export const getConvertType = (text: string): ActionType => {
  if (isJson(text)) {
    return ActionType.Json;
  }
  if (interfaceMatchReg.test(text)) {
    return ActionType.Interface2Model;
  }
  return ActionType.EolinkerTable;
};
