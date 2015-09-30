# Usage

## Android
Add the plugin to your project and build in release.
To test the plugin in debug comment out the following line in include.gradle

appProtectionInclude.onlyIf { project.hasProperty('release') }



# Details

### `generate-aes256-key.js`
Generates a 256-bit Base64-encoded AES key 

### `encrypt-file.js`
Encrypts a file with AES256.
Usage: `encrypt-file.js <base64-encoded key> <input file path> <output file path>`