/*
 * @Description: cli3 webpack配置
 * @Author: linjia
 * @Date: 2020-03-24 14:18:53
 * @LastEditors: linjia
 * @LastEditTime: 2020-07-10 15:21:45
 */
const path = require('path');
const webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 引入webpack-bundle-analyzer
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

/* 配置cdn */
const cdnBaseURL = {
  bootcss: 'https://cdn.bootcss.com',
  cloudflare: 'https://cdnjs.cloudflare.com/ajax/libs',
  our: 'https://express-image.oss-cn-hangzhou.aliyuncs.com/plugins', // 自己的服务器
};
// 配置默认cdn
const cdnBaseHttp = cdnBaseURL.our;
// externalConfig配置
const externalConfig = [
  { name: 'vue', scope: 'Vue', js: 'vue.min.js' },
  { name: 'vue-router', scope: 'VueRouter', js: 'vue-router.min.js' },
  { name: 'vuex', scope: 'Vuex', js: 'vuex.min.js' },
  { name: 'element-ui', scope: 'ELEMENT', js: 'index.js', css: 'theme-chalk/index.css' },
  { name: 'qs', scope: 'Qs', js: 'qs.min.js' },
  { name: 'axios', scope: 'axios', js: 'axios.min.js' },
  { name: 'lodash', scope: '_', js: 'lodash.min.js', defer: true },
  { name: 'moment', scope: 'moment', js: 'moment.min.js', alia: 'moment.js', defer: true },
  { name: 'highcharts', scope: 'Highcharts', js: 'highcharts.js', defer: true },
  { name: 'blueimp-md5', scope: 'md5', js: 'js/md5.js', defer: true},
];
// 获取模块版本号
const getModulesVersion = () => {
  let mvs = {};
  let regexp = /^npm_package_.{0,3}dependencies_/gi;
  for (let m in process.env) {
    // 从node内置参数中读取，也可直接import 项目文件进来
    if (regexp.test(m)) {
      // 匹配模块
      // 获取到模块版本号
      mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[m].replace(/(~|\^)/g, '');
    }
  }
  return mvs;
};
// 导出不需要被打包的cdn模块配置
const getExternalModules = config => {
  let externals = {}; // 结果
  let cdn = {
    js: [],
    css: [],
  };
  let dependencieModules = getModulesVersion(); // 获取全部的模块和版本号
  config = config || externalConfig; // 默认使用utils下的配置
  config.forEach(item => {
    // 遍历配置
    if (item.name in dependencieModules) {
      let version = dependencieModules[item.name];
      // 拼接css 和 js 完整链接
      item.css && cdn.css.push({ url: item.css && [cdnBaseHttp, (item.alia && item.alia) || item.name, version, item.css].join('/')});
      item.js && cdn.js.push({ url: item.js &&[cdnBaseHttp, (item.alia && item.alia) || item.name, version, item.js].join('/'), defer: item.defer});
      externals[item.name] = item.scope; // 为打包时准备
    } else {
      throw new Error('相关依赖未安装，请先执行npm install ' + item.name);
    }
  });
  return { externals, cdn };
};

const { externals, cdn } = getExternalModules(externalConfig);

module.exports = {
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  devServer: {
    port: 8081,
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  configureWebpack: config => {
    if (isProduction) {
      config.externals = externals;
      // 正式环境删除console webpack4需要这样写
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@v': path.resolve(__dirname, './src/views'),
        }, // 别名配置
      },
    });
  },
  /* css: {
    extract: false, // false表示开发环境,true表示生成环境
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
            viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
            unitPrecision: 3, // 单位转换后保留的精度
            propList: [ // 能转化为vw的属性列表
              '*',
            ],
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          }),
        ],
      },
    },
  }, */
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn;
        return args;
      });
      config.plugin('ignore')
        .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));// 忽略/moment/locale下的所有文件
      // config.plugin('analyzer')
      //   .use(new BundleAnalyzerPlugin())// 使用webpack-bundle-analyzer 生成报表
      config.plugin('loadshReplace')
        .use(new LodashModuleReplacementPlugin());// 优化lodash
    }
    config.plugins.delete('prefetch'); // 加载首页会将所有用的没用的文件全都加载，这句话就是为了解决这个问题。
  },
};
