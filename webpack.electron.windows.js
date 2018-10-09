const path = require('path')

module.exports = {
  entry: {
    renderer: './src/renderer.js',
    settings: './src/settings.js',
    help: './src/help.js',
    about: './src/about.js'
  },
  output: {
    filename: 'windows/resources/app/js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'electron-renderer',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  }
}