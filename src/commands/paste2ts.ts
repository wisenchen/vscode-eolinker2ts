import { env, commands, window } from "vscode";
import { main } from "../utils/main";

const { clipboard } = env;
export const paste2TsCommand = commands.registerCommand(
  "eolinker2ts.paste2ts",
  async () => {
    const editor = window.activeTextEditor;
    if (!editor) {
      return;
    }
    // 获取复制的内容
    const parseText = await clipboard.readText();
    main(parseText, editor);
  }
);
