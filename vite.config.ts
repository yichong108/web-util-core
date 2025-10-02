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
            formats: ['es', 'cjs', 'umd']
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    },
})
