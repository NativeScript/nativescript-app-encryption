var fs = require('fs');

var preBuildStepFile = '../../platforms/ios/internal/nativescript-pre-build';
var postBuildStepFile = '../../platforms/ios/internal/nativescript-post-build';

module.exports = {
    preBuildScript: '\n# Added by nativescript-app-protection plugin\npushd "$SRCROOT/../../node_modules/nativescript-app-protection/hooks/ios"\n./nativescript-pre-build\npopd\n',
    postBuildScript: '\n# Added by nativescript-app-protection plugin\npushd "$SRCROOT/../../node_modules/nativescript-app-protection/hooks/ios"\n./nativescript-post-build\npopd\n',
    addIosBuildSteps: function() {
        fs.appendFile(preBuildStepFile, this.preBuildScript, function(err) {
            console.log(err ? "iOS platform not found - skipping app-protection plugin configuration. Details: " + err : 'app-protection pre-build step added for iOS');
        });
        fs.appendFile(postBuildStepFile, this.postBuildScript, function(err) {
            // we have likely already seen the error message, so skipping that
            if (!err) {
                console.log('app-protection post-build step added for iOS');
            }
        });
    },
    removeIosBuildSteps: function() {
        findAndRemoveInFile(preBuildStepFile, this.preBuildScript);
        findAndRemoveInFile(postBuildStepFile, this.postBuildScript);
    }
};

function findAndRemoveInFile(filePath, content) {
    var newFileContent = fs.readFileSync(filePath).toString().replace(content, '');
    fs.writeFileSync(filePath, newFileContent);
}