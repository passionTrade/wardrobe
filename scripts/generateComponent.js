/* eslint no-console: 0 */
const fs = require('fs');

const COMPONENTS_PATH = './src/components';
const isDirectory = name => fs.lstatSync(`${COMPONENTS_PATH}/${name}`).isDirectory();
const currentComponents = fs.readdirSync(COMPONENTS_PATH).map(name => name)
  .filter(isDirectory);

const componentName = process.argv[process.argv.indexOf('--name') + 1];
if (currentComponents.indexOf(componentName) > -1) {
  console.log(`A component with the name ${componentName} already exists!`);
  return;
}

const componentPath = `${COMPONENTS_PATH}/${componentName}`;
const withStyledComponents = process.argv.indexOf('--with-styled-components') > -1;
const withScss = process.argv.indexOf('--with-scss') > -1;
let stylesBoilterplate = '// import scss file or styled components';

if (withStyledComponents) {
  stylesBoilterplate = "import styled from 'styled-components';";
} else if (withScss) {
  stylesBoilterplate = `import './${componentName}.scss';`;
}

const ComponentBoilerplate = `import React from 'react';
import PropTypes from 'prop-types';
${stylesBoilterplate}

const ${componentName} = (props) => (

);

${componentName}.defaultProps = {};

${componentName}.propTypes = {};

export default ${componentName};
`;

const ScssBoilerplate = `//
// ${componentName}
//
@import '../../globals/scss/colors';
@import '../../globals/scss/typography';
@import '../../globals/scss/variables';
@import '../../globals/scss/import-once';

`;

// Create new folder.
fs.mkdirSync(componentPath);
// Create JS file.
fs.writeFileSync(`${componentPath}/${componentName}.js`, ComponentBoilerplate);

// Create index file.
fs.writeFileSync(`${componentPath}/index.js`, `export default from './${componentName}';\n`);

if (withScss) {
  // Create scss file.
  fs.writeFileSync(`${componentPath}/${componentName}.scss`, ScssBoilerplate);
}

// Create markdown file.
fs.writeFileSync(`${componentPath}/${componentName}.md`, '');

// Add export in src/components/index.js
fs.appendFile(`${COMPONENTS_PATH}/index.js`, `export ${componentName} from './${componentName}';\n`);

console.log(`Your component can be found in ${componentPath}`);
