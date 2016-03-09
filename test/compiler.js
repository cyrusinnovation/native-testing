var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var origJs = require.extensions['.js'];


require.extensions['.js'] = function (module, fileName) {
  var isAReactNativeModule = fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0;
  if (isAReactNativeModule) {
    fileName = path.resolve('./test/mocks/react-native.js');
  }

  if (fileName.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, fileName);
  }
  var src = fs.readFileSync(fileName, 'utf8');
  output = babel.transform(src, {
    filename: fileName,
    sourceFileName: fileName,
    "retainLines": true,
    "compact": true,
    "comments": false,
    "presets": [
      "react","es2015"
    ],
    "plugins": [
      "transform-object-rest-spread"
    ],
    "sourceMaps": false

  }).code;

  return module._compile(output, fileName);
};

