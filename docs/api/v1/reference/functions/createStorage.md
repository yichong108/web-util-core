[**@web-util/core**](../README.md)

***

> **createStorage**(`options`): `object`

Defined in: index.ts:59

创建一个本地存储实例

## Parameters

### options

`localDataOptions` = `...`

配置选项

## Returns

包含操作方法的对象

### clear()

> **clear**: (`options`) => `void`

清空所有 localStorage 或 sessionStorage 数据

#### Parameters

##### options

`Pick`\<`Options`, `"type"`\> = `{}`

存储选项

#### Returns

`void`

### get()

> **get**: (`key`, `options`) => `any`

从 localStorage 或 sessionStorage 获取数据

#### Parameters

##### key

`string`

键名

##### options

`Options` = `{}`

存储选项

#### Returns

`any`

存储的值，如果不存在则返回 undefined

### getAll()

> **getAll**: (`options`) => `object`[]

获取所有 localStorage 或 sessionStorage 数据

#### Parameters

##### options

`Pick`\<`Options`, `"type"`\> = `{}`

存储选项

#### Returns

`object`[]

包含所有键值对的数组

### remove()

> **remove**: (`key`, `options`) => `void`

从 localStorage 或 sessionStorage 删除数据

#### Parameters

##### key

`string`

键名

##### options

`Options` = `{}`

存储选项

#### Returns

`void`

### set()

> **set**: (`key`, `value`, `options`) => `void`

存储数据到 localStorage 或 sessionStorage

#### Parameters

##### key

`string`

键名

##### value

`any`

要存储的值

##### options

`Options` = `{}`

存储选项

#### Returns

`void`
