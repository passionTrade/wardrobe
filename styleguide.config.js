const path = require('path');

module.exports = {
  title: 'FashionTrade Style Guide',
  defaultExample: true,
  pagePerSection: true,
  skipComponentsWithoutExample: true,

  sections: [
    { name: 'Components', components: 'src/components/**/*.js' },
    { name: 'Style', components: 'src/style/**/*.js' },
  ],

  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    const dir = path.dirname(componentPath);
    return `import { ${name} } from 'fashiontrade-component-library';`; // TODO: change name
  },

  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/ThemeWrapper'),
  },

  webpackConfig: {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1',
        },
      ],
    },
  },
};
