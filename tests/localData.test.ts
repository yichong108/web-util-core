import {describe, it, expect, beforeEach, afterEach} from 'vitest'
import {createLocalData} from '../lib'

describe('createLocalData', () => {
    let testData: ReturnType<typeof createLocalData>

    beforeEach(() => {
        // 清空 localStorage 和 sessionStorage
        localStorage.clear()
        sessionStorage.clear()
        testData = createLocalData()
    })

    afterEach(() => {
        // 测试后清理
        localStorage.clear()
        sessionStorage.clear()
    })

    describe('localStorage', () => {
        it('should set and get data from localStorage', () => {
            // 测试设置和获取字符串
            testData.set('testKey', 'testValue')
            expect(testData.get('testKey')).toBe('testValue')

            // 测试设置和获取数字
            testData.set('numberKey', 42)
            expect(testData.get('numberKey')).toBe(42)

            // 测试设置和获取布尔值
            testData.set('booleanKey', true)
            expect(testData.get('booleanKey')).toBe(true)

            // 测试设置和获取对象
            const testObject = {a: 1, b: 'test'}
            testData.set('objectKey', testObject)
            expect(testData.get('objectKey')).toEqual(testObject)
        })

        it('should remove data from localStorage', () => {
            testData.set('toRemove', 'value')
            expect(testData.get('toRemove')).toBe('value')

            testData.remove('toRemove')
            expect(testData.get('toRemove')).toBeUndefined()
        })

        it('should get all data from localStorage', () => {
            testData.set('key1', 'value1')
            testData.set('key2', 'value2')

            const allData = testData.getAll()
            expect(allData).toHaveLength(2)
            expect(allData).toEqual(
                [
                    {
                        key: 'key1',
                        value: testData.get('key1')
                    },
                    {
                        key: 'key2',
                        value: testData.get('key2')
                    }
                ]
            )
        })

        it('should clear all data from localStorage', () => {
            testData.set('key1', 'value1')
            testData.set('key2', 'value2')

            expect(localStorage.length).toBeGreaterThan(0)
            testData.clear()
            expect(localStorage.length).toBe(0)
        })
    })

    describe('sessionStorage', () => {
        it('should set and get data from sessionStorage', () => {
            // 测试设置和获取 sessionStorage 中的字符串
            testData.set('sessionKey', 'sessionValue', {type: 'session'})
            expect(testData.get('sessionKey', {type: 'session'})).toBe('sessionValue')
        })

        it('should remove data from sessionStorage', () => {
            testData.set('sessionToRemove', 'value', {type: 'session'})
            expect(testData.get('sessionToRemove', {type: 'session'})).toBe('value')

            testData.remove('sessionToRemove', {type: 'session'})
            expect(testData.get('sessionToRemove', {type: 'session'})).toBeUndefined()
        })

        it('should get all data from sessionStorage', () => {
            testData.set('sessionKey1', 'value1', {type: 'session'})
            testData.set('sessionKey2', 'value2', {type: 'session'})

            const allData = testData.getAll({type: 'session'})
            expect(allData).toHaveLength(2)
            expect(allData).toEqual([
                    {
                        key: 'sessionKey1',
                        value: testData.get('sessionKey1', {type: 'session'})
                    },
                    {
                        key: 'sessionKey2',
                        value: testData.get('sessionKey2', {type: 'session'})
                    }
                ]
            )
        })

        it('should clear all data from sessionStorage', () => {
            testData.set('key1', 'value1', {type: 'session'})
            testData.set('key2', 'value2', {type: 'session'})

            expect(sessionStorage.length).toBeGreaterThan(0)
            testData.clear({type: 'session'})
            expect(sessionStorage.length).toBe(0)
        })
    })

    it('should work with prefix option', () => {
        const prefixedData = createLocalData({prefix: 'test_'})
        prefixedData.set('key', 'value')

        // 应该使用前缀存储
        expect(prefixedData.get('key')).toBe('value')
    })
})