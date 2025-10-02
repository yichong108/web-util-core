# Local Data Utility

一个轻量级的浏览器本地存储工具库，提供了对 localStorage 和 sessionStorage 的统一封装，支持数据类型保持、前缀设置等功能。

## 功能特点

- 统一管理 localStorage 和 sessionStorage
- 自动处理数据类型的序列化和反序列化
- 支持设置前缀，避免命名冲突
- 提供完整的 CRUD 操作和批量操作
- 支持 TypeScript 类型定义

## 安装

```bash
npm install @web-util/local-data
```

## 使用方法

### 基础使用

```typescript
import { createLocalData } from '@web-util/local-data';

const storage = createLocalData();

// 存储数据
storage.set('key', 'value');
storage.set('number', 42);
storage.set('boolean', true);
storage.set('object', { name: 'test', value: 123 });

// 获取数据
const value = storage.get('key'); // 'value'
const num = storage.get('number'); // 42
const bool = storage.get('boolean'); // true
const obj = storage.get('object'); // { name: 'test', value: 123 }

// 删除数据
storage.remove('key');

// 获取所有数据
const allData = storage.getAll();

// 清空所有数据
storage.clear();
```

### 使用 sessionStorage

```typescript
// 存储到 sessionStorage
storage.set('key', 'value', { type: 'session' });

// 从 sessionStorage 获取
const value = storage.get('key', { type: 'session' });

// 删除 sessionStorage 中的数据
storage.remove('key', { type: 'session' });

// 获取所有 sessionStorage 数据
const allSessionData = storage.getAll({ type: 'session' });

// 清空 sessionStorage
storage.clear({ type: 'session' });
```

### 使用前缀

```typescript
const storage = createLocalData({ prefix: 'myapp_' });

storage.set('key', 'value'); // 实际存储为 'myapp_key'
const value = storage.get('key'); // 自动添加前缀查找
```

## 浏览器兼容性

支持所有现代浏览器，需要支持 localStorage 和 sessionStorage。

## 许可证

MIT
