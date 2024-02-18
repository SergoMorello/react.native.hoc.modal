const path = require('path');

module.exports = {
  entry: {
	index: '/src/index.tsx'
  },
  target: 'web',
  mode: 'production', //production | development
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
			'ts-loader'
		],
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
	library: 'Modal',
	libraryTarget: 'umd',
	auxiliaryComment: 'React Native Hoc Modal'
  },
  externals: {
	'react-native': {
		root: 'React Native',
		commonjs: 'react-native',
		commonjs2: 'react-native',
		amd: 'react-native',
	},
    react: {
       root: 'React',
       commonjs: 'react',
       commonjs2: 'react',
       amd: 'react',
    }
  }
};