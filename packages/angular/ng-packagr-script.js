const ngPackage = require('ng-packagr');
const path = require('path');

// Just using the `ng-packagr` command in terminal does not take `tsconfig.json` into account.
// To be able to change base ts-config settings of the `ng-packagr` we need to do it like this.
ngPackage
  .ngPackagr()
  .forProject(path.join(__dirname, 'ng-package.json'))
  .withTsConfig(path.join(__dirname, 'tsconfig.lib.json'))
  .build()
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
