import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['./lib'],
            entryRoot: './lib',
        })
    ],
    build: {
        lib: {
            entry: './lib/index.ts',
            name: 'LocalData',
            fileName: (format) => `local-data.${format}.js`,
            formats: ['es', 'iife']
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {
                    // 这里可以定义全局变量的映射关系
                    // 例如：'vue': 'Vue' 
                    // 当前项目中暂时没有需要定义的全局变量
                }
            }
        }
    },
})
