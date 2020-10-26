// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
let publicPath = process.env.NODE_ENV === 'production' ? '/test' : './'
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,
    lintOnSave: false, //关闭 eslint

    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          swSrc: 'src/sw.js',
        }
    },

    devServer: {
        port: 8080, // 端口号
        // host: "localhost",
        // https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: {
            "/api": {
                target: "http://172.11.11.11:7071",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": "/"
                }
            },
            "/api2": {
                target: "http://172.12.12.12:2018",
                changeOrigin: true,
                //ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api2": "/"
                }
            },
            "/book": {
                target: "http://39.96.77.250",
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    "^/book": ""
                }
            },
        },
        before(app) {
            app.get('/test', function (req, res) {
                res.json({
                    name: '张三', age: 18
                });
            });
        },
    },
    chainWebpack: config => {
        // 重新设置 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@view', resolve('src/views'))

        // 查看打包文件体积大小
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

        // ============压缩图片 start============
        // config.module
        //     .rule("images")
        //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        //     .use("image-webpack-loader")
        //     .loader("image-webpack-loader")
        //     .options({
        //         mozjpeg: { progressive: true, quality: 65 },
        //         optipng: { enabled: false },
        //         pngquant: { quality: [0.65, 0.90], speed: 4 },
        //         gifsicle: { interlaced: false }
        //     });
        // ============压缩图片 end============
    },
    configureWebpack: {
        externals: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios'
        }
    }
}