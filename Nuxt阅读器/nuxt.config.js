
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: 'universal',
    head: {
        title: '阅读器',
        meta: [
            { charset: 'utf-8' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
            { name: 'msapplication-navbutton-color', content: '#4CAF50' },
            { name: 'x5-page-mode', content: 'app' },
            { name: 'browsermode', content: 'application' },
            { name: 'renderer', content: 'webkit' },
            { name: 'apple-touch-fullscreen', content: 'yes' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui,viewport-fit=cover' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    server: {
        host: '0.0.0.0',
        port: 3001,
    },
    // env: {
    //     client_id: 'cc6571de853ab8c8f717',
    //     client_secret: '4108ebda0ab1944b81217719a275e54d052f4e27',
    // },

    loading: '@/components/public/Loading.vue',
    css: [
        "@/assets/css/reset.css",
        "@/assets/css/border.css",
        "@/assets/css/transition.scss",
        "@/assets/css/glob.scss",
        'vue-virtual-scroller/dist/vue-virtual-scroller.css'
    ],

    plugins: [
        { src: "~/plugins/vant.js", ssr: true },
        { src: "~/plugins/filter.js", ssr: true },
        { src: "~/assets/css/iconfont.js", ssr: false },

    ],
    router: {
        middleware: ["redirect"],
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],

    axios: {
        withCredentials: true,
        baseURL: process.env.NODE_ENV === 'production' ? "http://101.132.188.203:3001" : "http://localhost:3001",
        // withCredentials: true,
    },
    proxy: {
        "/zhuishu": {
            target: "http://api.zhuishushenqi.com",
            changeOrigin: true,
            pathRewrite: {
                "^/zhuishu": ""
            }
        },
        "/book": {
            target: "https://novel.juhe.im",
            changeOrigin: true,
            pathRewrite: {
                "^/book": ""
            }
        },
        "/chapter": {
            target: "http://chapterup2.zhuishushenqi.com",
            changeOrigin: true,
            pathRewrite: {
                "^/chapter": "/chapter"
            }
        }
    },
    build: {
        babel: {
            "plugins": ["@babel/plugin-transform-modules-commonjs"]
        },
        // extractCSS: { allChunks: true },   // css单独提取到link中
        extend(config, ctx) {
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                }
            ]
        },
        postcss: {
            "plugins": {
                "postcss-write-svg": {
                    "utf8": false
                },
                "postcss-preset-env": {},
                "postcss-px-to-viewport": {
                    "viewportWidth": 375,
                    "viewportHeight": 667,
                    "unitPrecision": 3,
                    "viewportUnit": "vw",
                    "selectorBlackList": [
                        ".ignore",
                        ".hairlines"
                    ],
                    "minPixelValue": 1,
                    "mediaQuery": false
                },
                "cssnano": {
                    "cssnano-preset-advanced": {
                        "preset": "advanced",
                        "autoprefixer": false,
                        "postcss-zindex": false,
                        "zindex": false,
                    }
                }
            }
        }
    }
}
