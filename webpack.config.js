const path = require('path');

module.exports = {
  entry: './src/index.ts', // Путь к вашему исходному файлу TypeScript
  output: {
    filename: 'bundle.js',  // Выходной файл, который будет создан
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],  // Поддерживаемые расширения файлов
  },
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
  },
};
