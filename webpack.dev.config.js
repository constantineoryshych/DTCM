const map = require("lodash/map");
const path = require("path");

const loaders = {
	sass: {
		test: /\.sass$/,
		use: [
			"style-loader",
			"css-loader",
			{
				loader: "sass-loader",
				options: {
					includePaths: [path.resolve(__dirname, "./source/common/style/stylesheets")]
				}
			}
		]
	},
	media: {
		test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg|otf)$/,
		exclude: /\/node_modules\//,
		use: {
			loader: "file-loader",
			options: {
				name: "style/fonts/[name].[ext]"
			}
		}
	},
	js: {
		test: /\.tsx?/,
		exclude: [/node_modules/, `${process.cwd()}/source/server`],
		use: ["babel-loader", "ts-loader"]
	},
	json: {
		test: /\.json$/,
		use: "json-loader"
	}
};

// const ports = {
// 	"touch-screen": 4000,
// 	"control-panel": 4001
// }

const config = name => ({
	mode: "development",
	context: `${__dirname}/source/${name}/`,
	entry: [

		`${__dirname}/source/${name}/ts/index.ts`,
		`${__dirname}/node_modules/webpack/hot/dev-server`
	],
	resolve: {
		extensions: [".ts", ".js", ".tsx"]
	},
	output: {
		path: `${__dirname}/public/${name}/`,
		publicPath: `/public/${name}/`,
		filename: `${name}.min.js`
	},
	module: {
		rules: [loaders.sass, loaders.media, loaders.json, loaders.js]
	},
	devServer: {
		contentBase: "./",
		inline: true,
		hot: true,
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
		}
	}

});

const fronts = ["control-panel"];
// const fronts = ["touch-screen", "control-panel"];

module.exports = map(fronts, f => config(f));
