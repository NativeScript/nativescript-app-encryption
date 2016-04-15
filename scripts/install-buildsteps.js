var fs = require('fs');

// add a pre-build step
fs.appendFile(
  '../../platforms/ios/internal/nativescript-pre-build',
  '\npushd "$SRCROOT/../../node_modules/nativescript-app-protection/scripts/ios"\n./nativescript-pre-build\npopd\n',
  function(err) {
    if (err) {
      console.log("iOS platform not found - skipping app-protection plugin configuration. Details: " + err);
    } else {
      console.log('app-protection pre-build step added for iOS');
    }
  }
);

// add a post-build step
fs.appendFile(
  '../../platforms/ios/internal/nativescript-post-build',
  '\npushd "$SRCROOT/../../node_modules/nativescript-app-protection/scripts/ios"\n./nativescript-post-build\npopd\n',
  function(err) {
    // we have likely already seen the error message, so skipping that
    if (!err) {
      console.log('app-protection post-build step added for iOS');
    }
  }
);