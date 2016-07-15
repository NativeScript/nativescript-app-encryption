var fs = require("fs");
var path = require("path");
var encryption = require("../scripts/app-encryption");

module.exports = function($logger, $projectData, $usbLiveSyncService, hookArgs) {
    // The hook is used only on iOS
    if (hookArgs.platform != 'ios') {
        return;
    }

    // Encrypt only in release
    if (!$projectData.$options.release) {
        return;
    }

    // Generate key
    var key = encryption.generateKey();
    console.log('Encrypting with key: ' + key);

    var platformData = $injector.resolve("platformsData").getPlatformData(hookArgs.platform);
    // Save the key in file on iOS
    if (hookArgs.platform == 'ios') {
        var keyFile = path.join(platformData.projectRoot, 'k');
        fs.writeFileSync(keyFile, key);
    }

    // Encrypt files
    return encryption.encryptPreparedAppFolder(platformData.appDestinationDirectoryPath, key);
}