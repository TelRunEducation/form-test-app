const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts', // Путь к вашему исходному файлу TypeScript
  output: {
    filename: 'bundle.js',  // Выходной файл, который будет создан
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Поддерживаемые расширения файлов
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',  // Убедитесь, что указали путь к вашему шаблону HTML
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,  // Применяем для файлов с расширением .ts
        use: 'ts-loader',  // Используем ts-loader для трансляции TypeScript в JavaScript
        exclude: /node_modules/,
      },
    ],
  },

  devServer: {
    static: './dist',  // Папка для статичных файлов
   // contentBase: path.join(__dirname, 'dist'), // Папка с ресурсами для сервера
    compress: true, // Включение сжатия (gzip)
    port: 9000, // Порт, на котором будет запускаться сервер
    hot: true, // Включение горячей перезагрузки
    open: true, // Автоматическое открытие браузера при запуске сервера
    historyApiFallback: true, // Для поддержки SPA (Single Page Application)
  },
};
