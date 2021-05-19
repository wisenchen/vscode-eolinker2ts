# eolinker2ts

用于将Eolinker的api转换成typescript使用的类型模板

## 功能特性
1. 在后缀为model.ts的文件会生成一个Model,其他文件下生成interface
5. 默认添加 readonly 可修改 eolinker2ts.isReadonly 配置项
6. 支持忽略特定字段（只支持Eolinker方式的转换）
7. 支持按是否可选或首字母排序
## 用法示例
1. 将复制的内容转换为typescript模板后粘贴

    从eolinker复制字段行或者复制一段json对象后使用快捷键 `alt + shift + v`

    > 可以输入一个名称用以创建一个interface或者model（根据文件名后缀来生成）

![parse2ts](https://user-images.githubusercontent.com/41280500/110262392-7eba1380-7fee-11eb-8435-39a14aa067af.gif)


## 配置项

| 名称     | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| eolinker2ts.isReadonly | 是否添加 readonly 选项 | boolean | true |
| eolinker2ts.isAddTypeName | 是否可输入类型名称（设置为false后粘贴将不会出现类型名称输入框） | boolean | true |
| eolinker2ts.ignoreFileds | 默认忽略的字段 | string[] | [] |
| eolinker2ts.tableColOrder | 从eolinker上复制的表格列顺序 | object | {name:0,type:1,isRequired:2,desc:3} |
| eolinker2ts.orderingRule | 字段的排序规则 0: 不排序, 1：按是否可选向下, 2：按首字母向下 | enum | 0 |


## change log

### Release 1.0.1
1. 支持json格式转换
2. 移除选择内容转换功能
3. 支持把当前interface转model
4. 默认添加readonly选项