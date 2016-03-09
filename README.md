Example of a Unit Tested React Native Application
==================================================

When working with ReactNative, I have had much difficulty getting any semblance of testing up and running.
There were several layers that need to be made clear. Those being Mocha itself, ES6(7?), and React-Native itself.

Mocha
--------------------------------------------------
The very basics of a mocha setup reads from mocha.opts in the ./test folder of your project root. In it, we define the options for your mocha run.

In order to simply be able to run mocha tests, add the following to mocha.opts:

```
--reporter nyan
 --recursive
 app/**/__tests__/*test.js
```
 

### --reporter 
This line defines what form your output is reported in. I chose nyan cat because that is one of the great benefits of mocha over jasmine. (The other being speed, but who need practical benefits?)
### --recursive 
This line will simply tell the test running to recursively go looking for tests.
### 'app/**/__tests__/*test.js' 
This line is simply a pattern for matching what files will run, in this case, any file with 'tests.js' in any folder named '__tests__'. 


ES6
-----------------------------------------------------
In order to use ES6 syntax we need to add babel and the react, and es2105 presets for babel. 

After babel-core and the presets are installed via the package, you may add 
`--compilers js: babel-core/reporter/` to the mocha.opts

### --compilers 
This line specifies the script used for code compilation. For now the default babel compiler, using the configuration from .babelrc is good.


React-Native
-----------------------------------------------------
This is the really tricky part. Apparently the React-Native library has some issues with compilation in babel. 
Some of the theories floating around claim that is actually closer to es7 compliant than es6. Regardless, the approach I have
taken in this project is to mock out the react-native libraries and components. 

To that end I have created mockReactNative.js and compiler.js.

In the mocha opts

Replace `--compilers js: babel-core/reporter/` with `--compilers js: ./compiler`

### mockReactNative.js 
This is the that file that will replace the problematic ReactNative components with mock versions of said components.
These can be queried for properties and children, without any of the baggage of the real components. 

Any additional ReactNative View components that you need to use will need to be added to the `componentsToMock` array in said file.

For non View Components in ReactNative, it tends to be a bit trickier. See `StyleSheet`, `Platform`, and `Dimensions` for examples of dealing with them.
 
### compiler.js 
This is a custom babel compiler which, for most things will act the same as the default compiler. 
The notable and important exception is 

``` 
var containsReactNative = fileName.indexOf('node_modules/react-native/Libraries/react-native/react-native.js') >= 0;
        if (containsReactNative) {
            fileName = path.resolve('./test/mocks/react-native.js');
        }
```
                                            
That will look for the import of the react-native module from your node modules and replace it with the aforementioned mockReactNative.

In addition, React-Native has its own babel settings for production, that will be overwritten by a .babelrc file. Because of this, 
the compile contains the settings that normally would be included in a .babelrc file in its tranform. 

```
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
```

Any additional presets or plugins necessary for testing will need to be added here and not to a .babelrc to avoid conflicting with reactnative settings. 

**Note**

Most react-native packages you may install will also need to be mocked, as they do not seem to include a previously translated /bin/.
You may need to add additional paths to check for "containsReactNative" here.


Further Setup
--------------------------------------------------------
A few more things added to the mocha.opts for convenience sake. 

```
--require ./test/ignoreImagesForBabel
--require ./test/setupFakeDOM
--require ./test/testSetup
```
These files are run before running all tests in Mocha

### -require ./test/ignoreImagesForBabel
In order for ReactNative to display images, you will most likely have require(*name*.png) in your code.
In order to prevent Babel from attempting to process these binary files and failing, we added the ignore-styles package,
and register [.png] as an ignored extension.

### -require ./test/setupFakeDOM
In order for enzyme to render components, it needs a DOM to target. This file creates a generic dom for use in your tests.
If you are only using shallow rendering, you will not need this, but I highly recommend not completely relying on shallow rendering.

### -require ./test/testSetup
This was a simply convenience method which imports and exposes chai.expect, React, and enzyme.mount on the global of a test session.
This simply allows us to use these for every single test without requiring the boilerplate imports on every file. Once again, completely optional.
