This plugin encrypts all your `app/**.js` files during a release build.

# Usage

Install the platforms you need for your app (`tns platform add [ios|android]`) before installing this plugin.

## iOS
No additional steps required; just `tns build ios --release` and your `.js` files will be encrypted in the `.ipa` binary.

You can validate this on a Mac by right-clicking the `.ipa` and inspecting the package contents.

## Android (work in progress)
Add the plugin to your project and build in release.

To test the plugin in debug comment out the following line in include.gradle

`appProtectionInclude.onlyIf { project.hasProperty('release') }`

# Details
This plugins encrypts all `.js` files in the `app` folder, except those under `tns_modules` with an AES256 key generated each build. The key is embedded in `res/values/strings.xml` on Android and in native code on iOS. The key storage on Android is subject to change.

Encryption is only applied for Release builds.

Decryption is transparently performed the first time a file is `require`d and the result is only cached in-memory.

### `generate-aes256-key.js`
Generates a 256-bit Base64-encoded AES key during a release build.

### `encrypt-file.js`
Encrypts a file with AES256 (you don't need to do this yourself).
Usage: `encrypt-file.js <base64-encoded key> <input file path> <output file path>`
