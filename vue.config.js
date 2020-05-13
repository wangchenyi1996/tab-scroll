// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
let publicPath = process.env.NODE_ENV === 'production' ? '/test' : '/'
module.exports = {
    publicPath,
    outputDir: 'dist',
    productionSourceMap: false,
    chainWebpack: config => {
        // 重新设置 alias
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@view', resolve('src/views'))

        // 查看打包文件体积大小
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    configureWebpack: {
        externals: {
          'vue': 'Vue',
          'vuex': 'Vuex',
          'vue-router': 'VueRouter',
          'Axios':'axios'
        }
    }
}