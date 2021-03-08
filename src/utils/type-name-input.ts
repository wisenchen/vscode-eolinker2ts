import { workspace, window } from "vscode";

export const getTypeName = async function () {
  const isCloseInput = workspace
    .getConfiguration()
    .get("Eolinker2Ts.closeTypeNameInput") as boolean;
  let typeName: string | undefined = "";
  if (!isCloseInput) {
    typeName = await window.showInputBox({
      prompt: "类型名称，不填写则不命名",
    });
  }
  return typeName;
};
