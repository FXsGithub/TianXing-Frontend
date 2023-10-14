import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue({
        include: [/\.vue$/, /\.md$/]
    }), markdown()],
})
