const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = defineConfig({
	transpileDependencies: true,
	// 配置方式一： LCI提供的属性
	outputDir: './build',
	// build打包的时候可用，部署到服务器的时候不要使用！
	publicPath: './',
	// 配置方式二： 和webpack属性完全一致，最后会进行合并
	configureWebpack: {
		resolve: {
			alias: {
				components: '@/components'
			}
		},
		plugins: [
			AutoImport({
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [ElementPlusResolver()]
			})
		]
	}
	// configureWebpack: (config) => {
	// 	config.resolve.alias = {
	// 		'@': path.resolve(__dirname, 'src'),
	// 		components: '@/components'
	// 	};
	// }
});
