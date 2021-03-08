import { commands, window } from "vscode";

import { generateTsTemplate } from "../utils/get-template";
import { parseToTsMap, parseEolinkerApi } from "../utils/parse-eolinker-api";
import { getTypeName } from "../utils/type-name-input";

export const selection2ts = commands.registerCommand(
  "eolinker2ts.selection2ts",
  async () => {
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    // 获取选中的内容
    const text = editor.document.getText(editor.selection);
    const typeName = await getTypeName();
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
);
