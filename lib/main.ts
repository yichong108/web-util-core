export interface Options {
    type?: string
}

/**
 * 判断是否为空
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


interface localDataOptions {
    prefix?: string
}

export function createLocalData(options: localDataOptions = {} as any) {
    const {prefix} = options

    const keyName = prefix || ''

    /**
     * 存储localStorage
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
     * 获取localStorage
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
     * 删除localStorage
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
     * 获取全部localStorage
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
     * 清空全部localStorage
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