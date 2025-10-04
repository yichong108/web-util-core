import {defineConfig} from 'vitepress'

export default defineConfig({
    base: '/web-util-core/',
    lang: 'en-US',
    title: '@web-util',
    description: 'A utility library for handling local data storage and management',

    themeConfig: {
        nav: [
            {text: 'Guide', link: '/guide/getting-started'},
        ],

        sidebar: [
            {
                text: 'Guide',
                items: [
                    {text: 'Getting Started', link: '/guide/getting-started'},
                ]
            },
            {
                text: 'API Reference',
                items: [
                    {text: 'v1', link: '/api/v1/reference/README'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/'}
        ],

        // Adding versioning configuration
        outline: [2, 3],

        // Footer configuration
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025-present @web-util'
        }
    },

    // Additional configurations for better documentation experience
    lastUpdated: true,
    ignoreDeadLinks: true
})