# API v1 参考文档

本地存储工具库
提供对 localStorage 和 sessionStorage 的统一封装

## 函数

- [createStorage](functions/createStorage.md)

## 类型定义

### localDataOptions

配置选项接口

| 属性名 | 类型 | 描述 |
|--------|------|------|
| prefix | string | 键名前缀 |

### Options

存储选项接口

| 属性名 | 类型 | 描述 |
|--------|------|------|
| type | string | 存储类型 ('session' 表示 sessionStorage，其他值表示 localStorage) |