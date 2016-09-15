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
    
    // Save the key in file
    var keyFile = path.join(platformData.projectRoot, 'k');
    fs.writeFileSync(keyFile, key);

    /* 
     * Inject the plugin specific linker flags in plugin-release.xcconfig file. This is needed because relying on the CLI mechanism for
     * merging .xcconfig files results in reordering of the linker flags (see https://github.com/NativeScript/app-protection/issues/8).
     */
    var pluginReleaseFile = path.join(platformData.projectRoot, 'plugins-release.xcconfig');
    var placeholder = /___app_protection_plugin_OTHER_LDFLAGS_placeholder___/g;
    var linkerFlags = '$(inherited) -ObjC -sectcreate __DATA __bin_data $(PROJECT_DIR)/k';
    fs.readFile(pluginReleaseFile, 'utf8', function (err, fileContent) {
        var newFileContent = fileContent.replace(placeholder, linkerFlags);
        fs.writeFile(pluginReleaseFile, newFileContent, 'utf8');
    });

    // Encrypt files
    return encryption.encryptPreparedAppFolder(platformData.appDestinationDirectoryPath, key);
}