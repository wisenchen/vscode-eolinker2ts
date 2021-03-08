import { typeMap } from "../config/type-map";
import { TsModel } from "../interfaces/ts-model.interface";
import { workspace } from "vscode";
import { typeMatchReg } from "../config";
import { TableColOrder } from "../interfaces";

export const parseEolinkerApi = (mockData: string) => {
  mockData = mockData.trim();
  // 按行分割
  const rowData = mockData.split(/\r?\n/);
  if (rowData.length % 2 !== 0) {
    throw "选中的内容无法解析";
  }
  // 每两行为一条数据
  const lineData = [];
  for (let i = 0; i < rowData.length; i += 2) {
    // 参数名的那行有可能会出现 “复制” 字样 需要用tab替换掉
    const row = rowData[i].replace("复制", "\t") + rowData[i + 1];
    lineData.push(row);
  }
  // 按tab分割
  const tabArr = lineData.map((item) => item.trim().split(/\t/));
  return tabArr;
};

export const parseToTsMap = (rows: string[][]) => {
  const tableColOrder = workspace
    .getConfiguration()
    .get("Eolinker2Ts.tableColOrder") as TableColOrder;
  // 生成map对象
  const mapArr = rows.map((item) => {
    const name = item[tableColOrder.name];
    const type = item[tableColOrder.type];
    const isRequired = item[tableColOrder.isRequired];
    const desc = item[tableColOrder.desc];
    const hasType = typeMatchReg.test(type);
    const tsType = hasType ? typeMap.get(RegExp.$1) || RegExp.$1 : "any";
    return {
      name,
      type: tsType,
      required: isRequired === "是",
      desc,
    } as TsModel;
  });

  // 排序规则  0: 不排序, 1：按是否必填向下, 2：按首字母向下,
  const orderRule = workspace
    .getConfiguration()
    .get("Eolinker2Ts.orderingRule") as Number;

  switch (orderRule) {
    case 1:
      mapArr.sort((a, b) => {
        if (a.required === b.required) {
          return 0;
        }
        return a.required ? -1 : 1;
      });
      break;
    case 2:
      mapArr.sort((a, b) => (a.name > b.name ? -1 : 1));
  }
  return mapArr;
};
