/**
 * 模板字符串
 */

export const interfaceTemplate = `
export interface #{typeName} {
#{content}
}
`;
export const modelTemplate = `
export class #{typeName} {
#{content}
\tconstructor(data: #{typeName}) {
\t#{constructorInnerContent}
\t}
}
`;
