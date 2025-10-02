/**
 * 本地存储工具库
 * 提供对 localStorage 和 sessionStorage 的统一封装
 * @packageDocumentation
 */

interface Options {
    /**
     * 存储类型
     * - 'session': sessionStorage
     * - 其他或不传: localStorage
     */
    type?: string
}

interface localDataOptions {
    /**
     * 键名前缀
     */
    prefix?: string
}

/**
 * 判断值是否为空
 * @param val - 要判断的值
 * @returns 值是否为空
 */
function validatenull(val: any): boolean {
    if (typeof val == 'boolean') {
        return false
    }
    if (typeof val == 'number') {
        return false
    }
    if (val instanceof Array) {
        if (val.length == 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (
            val == 'null' ||
            val == null ||
            val == 'undefined' ||
            val == undefined ||
            val == ''
        ) {
            return true
        }
        return false
    }
    return false
}

/**
 * 创建一个本地存储实例
 * @param options - 配置选项
 * @returns 包含操作方法的对象
 */
export function createStorage(options: localDataOptions = {} as any) {
    const {prefix} = options

    const keyName = prefix || ''

    /**
     * 存储数据到 localStorage 或 sessionStorage
     * @param key - 键名
     * @param value - 要存储的值
     * @param options - 存储选项
     */
    function set(key: string, value: any, options: Options = {}): void {
        let {type} = options
        let name = keyName + (key || '')
        let obj = {
            dataType: typeof value,
            content: value,
            type: type,
            datetime: new Date().getTime(),
        }
        if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
        else window.localStorage.setItem(name, JSON.stringify(obj))
    }

    /**
     * 从 localStorage 或 sessionStorage 获取数据
     * @param key - 键名
     * @param options - 存储选项
     * @returns 存储的值，如果不存在则返回 undefined
     */
    function get(key: string, options: Options = {}): any {
        const {type} = options

        let name = keyName + (key || '')
        let obj: any = {};
        let content: any;

        if (type === 'session') {
            obj = window.sessionStorage.getItem(name)
        } else {
            obj = window.localStorage.getItem(name)
        }
        if (validatenull(obj)) return
        try {
            obj = JSON.parse(obj || '{}')
        } catch {
            return obj
        }
        if (obj.dataType == 'string') {
            content = obj.content
        } else if (obj.dataType == 'number') {
            content = Number(obj.content)
        } else if (obj.dataType == 'boolean') {
            content = eval(obj.content)
        } else if (obj.dataType == 'object') {
            content = obj.content
        }
        return content
    }

    /**
     * 从 localStorage 或 sessionStorage 删除数据
     * @param key - 键名
     * @param options - 存储选项
     */
    function remove(key: string, options: Options = {}): void {
        let {type} = options
        let name = keyName + (key || '')
        if (type === 'session') {
            window.sessionStorage.removeItem(name)
        } else {
            window.localStorage.removeItem(name)
        }
    }

    /**
     * 获取所有 localStorage 或 sessionStorage 数据
     * @param options - 存储选项
     * @returns 包含所有键值对的数组
     */
    function getAll(options: Pick<Options, 'type'> = {}): Array<{ key: string; value: any }> {
        let list: Array<{ key: string; value: any }> = []
        let {type} = options
        if (type === 'session') {
            for (let i = 0; i < window.sessionStorage.length; i++) {
                if (window.sessionStorage.key(i)) {
                    list.push({
                        key: window.sessionStorage.key(i) || '',
                        value: get(window.sessionStorage.key(i) || '', {
                            type: 'session',
                        }),
                    })
                }
            }
        } else {
            for (let i = 0; i < window.localStorage.length; i++) {
                if (window.localStorage.key(i)) {
                    list.push({
                        key: window.localStorage.key(i) || '',
                        value: get(window.localStorage.key(i) || ''),
                    })
                }
            }
        }
        return list
    }

    /**
     * 清空所有 localStorage 或 sessionStorage 数据
     * @param options - 存储选项
     */
    function clear(options: Pick<Options, 'type'> = {}): void {
        let {type} = options
        if (type) {
            window.sessionStorage.clear()
        } else {
            window.localStorage.clear()
        }
    }

    return {
        set,
        get,
        remove,
        getAll,
        clear,
    }
}