var fs = require('fs');

// add a pre-build step
fs.appendFile(
  '../../platforms/ios/internal/nativescript-pre-build',
  '\npushd "$SRCROOT/../../node_modules/nativescript-app-protection"\n./nativescript-pre-build\npopd\n',
  (err) => {
    if (err) throw err;
    console.log('pre-build step added');
  }
);

// add a post-build step
fs.appendFile(
  '../../platforms/ios/internal/nativescript-post-build',
  '\npushd "$SRCROOT/../../node_modules/nativescript-app-protection"\n./nativescript-post-build\npopd\n',
  (err) => {
    if (err) throw err;
    console.log('post-build step added');
  }
);