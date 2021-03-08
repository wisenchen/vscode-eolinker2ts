import { TextEditor, window } from "vscode";
import { generateTsTemplate } from "./get-template";
import { parseEolinkerApi, parseToTsMap } from "./parse-eolinker-api";
import { getTypeName } from "./type-name-input";
import { typeofJsonc } from "typeof-jsonc";
export const main = async (text: string, editor: TextEditor) => {
  const typeName = await getTypeName();
  if (isJson(text)) {
    const replaceStr = typeofJsonc(JSON.stringify(JSON.parse(text)), "aa", {
      addExport: true,
      singleLineJsDocComments: true,
    });
    editor.edit((editBuilder) => {
      editBuilder.replace(editor.selection, replaceStr);
    });
  } else {
    // 替换
    try {
      const tsMapArr = parseToTsMap(parseEolinkerApi(text));
      const replaceStr = generateTsTemplate(tsMapArr, typeName);
      editor.edit((editBuilder) => {
        editBuilder.replace(editor.selection, replaceStr);
      });
    } catch (error) {
      window.showErrorMessage("解析出错");
    }
  }
};

const isJson = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
};
