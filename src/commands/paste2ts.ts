import typeofJsonc from "typeof-jsonc";
import { env, commands, window, TextEditor } from "vscode";
import { interfaceMatchReg } from "../config";
import { ActionType } from "../interfaces";
import {
  generateModelTemplate,
  generateTsTemplate,
  getCnstructorInnerContent,
} from "../utils/get-template";
import { parseEolinkerApi, parseToTsMap } from "../utils/parse-eolinker-api";
import { getTypeName } from "../utils/type-name-input";
import { getConvertType } from "../utils/util";

const { clipboard } = env;

class Paste2ts {
  /**
   * 复制的内容
   */
  private parseText = "";
  /**
   * 类型命名
   */
  private typeName?: string;

  private convertType?: ActionType;

  private editor?: TextEditor;
  constructor() {
    const editor = window.activeTextEditor;
    if (editor) {
      this.editor = editor;
      this.initData();
    }
  }
  async initData() {
    // 获取复制的内容
    this.parseText = (await clipboard.readText()).trim();
    this.typeName = await getTypeName();
    this.convertType = getConvertType(this.parseText);
    this.main();
  }

  main() {
    switch (this.convertType) {
      case ActionType.Json:
        this.convertJson();
        break;
      case ActionType.Interface2Model:
        this.convertInterface();
        break;
      case ActionType.EolinkerTable:
        this.convertEolinkerTable(this.parseText);
        break;
      default:
        window.showErrorMessage("无法解析复制内容");
    }
  }

  convertJson() {
    const replaceStr = typeofJsonc(
      JSON.stringify(JSON.parse(this.parseText)),
      this.typeName,
      {
        addExport: true,
        singleLineJsDocComments: true,
      }
    );
    this.replaceSelection(replaceStr);
  }

  convertInterface() {
    interfaceMatchReg.test(this.parseText);
    const content = RegExp.$2.trim();
    const fileds = this.parseText
      .match(/\w+\??:\s\w+;/g)
      ?.map(item => item.split(/\??:/)[0]);
    if (fileds && fileds.length > 0) {
      const replaceStr = generateModelTemplate({
        typeName: this.typeName || "",
        content,
        constructorInnerContent: getCnstructorInnerContent(fileds),
      });
      this.replaceSelection(replaceStr);
    }
  }

  convertEolinkerTable = (text: string) => {
    try {
      const tsMapArr = parseToTsMap(parseEolinkerApi(text));
      const replaceStr = generateTsTemplate(tsMapArr, this.typeName);
      this.replaceSelection(replaceStr);
    } catch (error) {
      window.showErrorMessage("无法解析复制内容");
    }
  };
  
  replaceSelection(replaceStr: string) {
    if (!this.editor) {
      return;
    }
    const selection = this.editor.selection;
    this.editor.edit(editBuilder => {
      editBuilder.replace(selection, replaceStr);
    });
  }
}

export const paste2TsCommand = commands.registerCommand(
  "eolinker2ts.paste2ts",
  () => {
    new Paste2ts();
  }
);
