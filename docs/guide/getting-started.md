# Getting Started

## Installation

```bash
npm install @web-util/core
```

## Basic Usage

Import and create a storage instance:

```typescript
import { createStorage } from '@web-util/core'

const storage = createStorage()
```

### Storing Data

```typescript
// Store various data types
storage.set('key', 'value')
storage.set('number', 42)
storage.set('boolean', true)
storage.set('object', { name: 'test', value: 123 })
```

### Retrieving Data

```typescript
const value = storage.get('key') // 'value'
const num = storage.get('number') // 42
const bool = storage.get('boolean') // true
const obj = storage.get('object') // { name: 'test', value: 123 }
```

### Removing Data

```typescript
storage.remove('key')
```

### Working with sessionStorage

By default, all operations work with localStorage. To use sessionStorage instead:

```typescript
// Store to sessionStorage
storage.set('key', 'value', { type: 'session' })

// Retrieve from sessionStorage
const value = storage.get('key', { type: 'session' })

// Remove from sessionStorage
storage.remove('key', { type: 'session' })
```

### Using Prefixes

You can set a prefix for all keys to avoid naming conflicts:

```typescript
const storage = createStorage({ prefix: 'myapp_' })

storage.set('key', 'value') // Actually stored as 'myapp_key'
const value = storage.get('key') // Automatically adds prefix when looking up
```