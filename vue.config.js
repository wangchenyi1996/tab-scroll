// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
let publicPath = process.env.NODE_ENV === 'production' ? '/test' : '/'
module.exports = {
    publicPath,
    outputDir: 'dist',
    productionSourceMap: false,

    lintOnSave: false, //关闭 eslint

    chainWebpack: config => {
        // 重新设置 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@view', resolve('src/views'))

        // 查看打包文件体积大小
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)


        // const imagesRule = config.module.rule('images')
        // imagesRule
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         bypassOnDebug: true
        //     })
        //     .end()

        //  config.module
        //     .rule("images")
        //     .use("image-webpack-loader")
        //     .loader("image-webpack-loader")
        //     .options({
        //       mozjpeg: { progressive: true, quality: 65 },
        //       optipng: { enabled: false },
        //       pngquant: { quality: [0.65, 0.9], speed: 4 },
        //       gifsicle: { interlaced: false },
        //     //   webp: { quality: 75 }
        //     });

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