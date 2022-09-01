// webpack.config.js

module.exports = {
    module: {
      rules: [
        // SCSS has different line endings than SASS
        // and needs a semicolon after the import.
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires sass-loader@^9.0.0
              options: {
                // This is the path to your variables
                additionalData: "@import '@/styles/main.scss';"
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
      ],
    },
  }