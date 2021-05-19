import { workspace, window, TextEditor } from "vscode";
import { templateTagReg } from "../config";
import { interfaceTemplate, modelTemplate } from "../config/template";
import { InterfaceType, ModelType } from "../interfaces";
import { TsModel } from "../interfaces/ts-model.interface";
import * as path from "path";

/**
 * 生成注释模板
 * @param desc 注释内容
 */
const generateDocTemplate = (desc: string) => {
  return `\t/**\n\t * ${desc}\n\t */`;
};

/**
 * 生成ts的一行内容
 *
 */
const generateTsRowTemplate = (rowData: TsModel) => {
  const isReadonly = workspace.getConfiguration().get("Eolinker2Ts.isReadonly");
  let rowStr = "";
  rowStr += rowData.desc ? generateDocTemplate(rowData.desc) : "";
  rowStr += "\n\t";

  if (isReadonly) {
    rowStr += "readonly ";
  }
  rowStr += `${rowData.name}${rowData.required ? "" : "?"}: ${rowData.type};`;
  return rowStr;
};

/**
 * 生成类型content
 */
const generateTsContentTemplate = (data: TsModel[]) => {
  return data.map(generateTsRowTemplate).join("\n");
};

/**
 * 生成interface的模板
 */
const generateInterfaceTemplate = (interfaceType: InterfaceType) => {
  // 首字母转大写
  const typeName = interfaceType.typeName;
  interfaceType.typeName = typeName[0].toUpperCase() + typeName.slice(1);
  const template: string =
    workspace.getConfiguration().get("Eolinker2Ts.interfaceTemplate") ||
    interfaceTemplate;
  return template.replace(templateTagReg, (_, p1: "typeName" | "content") => {
    return interfaceType[p1];
  });
};

/**
 * 生成model的模板
 */
export const generateModelTemplate = (modelTpe: ModelType) => {
  // 首字母转大写
  const typeName = modelTpe.typeName;
  modelTpe.typeName = typeName[0].toUpperCase() + typeName.slice(1);
  const template: string =
    workspace.getConfiguration().get("Eolinker2Ts.modelTemplate") ||
    modelTemplate;
  return template.replace(
    templateTagReg,
    (_, p1: "typeName" | "content" | "constructorInnerContent") => {
      return modelTpe[p1];
    }
  );
};

/**
 * 生成model的构造器中内容
 */
export const getCnstructorInnerContent = (tsMapArr: (TsModel | string)[]) => {
  const resArr = tsMapArr.map((item: TsModel | string) => {
    if (typeof item === "string") {
      return `\tthis.${item} = data.${item};`;
    } else {
      return `\tthis.${item.name} = data.${item.name};`;
    }
  });
  return resArr.join("\n\t");
};

/**
 * 过滤忽略的字段
 */
const filterIgnoreFileds = (tsMapArr: TsModel[]) => {
  const ignoreFileds = workspace
    .getConfiguration()
    .get("Eolinker2Ts.ignoreFileds") as string[];
  const ignoreSet = new Set(ignoreFileds);
  return tsMapArr.filter(item => !ignoreSet.has(item.name));
};

/**
 * 生成ts模板
 * @param tsMapArr TsModel[]
 * @param typeName 类型名称
 */
export const generateTsTemplate = (tsMapArr: TsModel[], typeName?: string) => {
  tsMapArr = filterIgnoreFileds(tsMapArr);

  const content = generateTsContentTemplate(tsMapArr);
  if (!typeName) {
    return content;
  }
  const editor = window.activeTextEditor as TextEditor;
  const activeFileName = path.parse(editor.document.fileName).name;
  if (activeFileName.lastIndexOf("model") !== -1) {
    return generateModelTemplate({
      typeName,
      content,
      constructorInnerContent: getCnstructorInnerContent(tsMapArr),
    });
  }
  return generateInterfaceTemplate({ typeName, content });
};
