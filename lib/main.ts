export interface Options {
    name: string;
    content?: any;
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
    function set(params: Options): void {
        let {name, content, type} = params
        name = keyName + (name || '')
        let obj = {
            dataType: typeof content,
            content: content,
            type: type,
            datetime: new Date().getTime(),
        }
        if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
        else window.localStorage.setItem(name, JSON.stringify(obj))
    }

    /**
     * 获取localStorage
     */
    function get(params: Options): any {
        let {name} = params
        name = keyName + (name || '')
        let obj: any = {},
            content: any
        obj = window.sessionStorage.getItem(name)
        if (validatenull(obj)) obj = window.localStorage.getItem(name)
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
    function remove(params: Pick<Options, 'name' | 'type'>): void {
        let {name, type} = params
        name = keyName + (name || '')
        if (type) {
            window.sessionStorage.removeItem(name)
        } else {
            window.localStorage.removeItem(name)
        }
    }

    /**
     * 获取全部localStorage
     */
    function getAll(params: Pick<Options, 'type'>): Array<{ name: string | null; content: any }> {
        let list: Array<{ name: string | null; content: any }> = []
        let {type} = params
        if (type) {
            for (let i = 0; i < window.sessionStorage.length; i++) {
                list.push({
                    name: window.sessionStorage.key(i),
                    content: get({
                        name: window.sessionStorage.key(i) as any,
                        type: 'session',
                    }),
                })
            }
        } else {
            for (let i = 0; i < window.localStorage.length; i++) {
                list.push({
                    name: window.localStorage.key(i),
                    content: get({
                        name: window.localStorage.key(i) as any,
                    }),
                })
            }
        }
        return list
    }

    /**
     * 清空全部localStorage
     */
    function clear(params: Pick<Options, 'type'>): void {
        let {type} = params
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