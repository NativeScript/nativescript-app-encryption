**The plugins is still in experimental state and we need your feedback. Please write your comments in the issues.**

This plugin encrypts all your `app/**.js` files during a release build.

# How it works
This plugins encrypts all `.js` files in the `app` folder, except those under `tns_modules` with an AES256 key generated each build.
On Android, the key is embedded in native code, on iOS - the key is kept in additional __DATA section in the app binary.

*For the future we are thinking about enhacing the way the key is stored. We need your input here. We get the key from your server, but this will require that the application is online the first time it is executed. We are open for another suggestions how to improve this.*

Encryption is only applied for Release builds.

Decryption is transparently performed the first time a file is `require`d and the result is only cached in-memory.

### `generate-aes256-key.js`
Generates a 256-bit Base64-encoded AES key during a release build.

### `encrypt-file.js`
Encrypts a file with AES256 (you don't need to do this yourself).
Usage: `encrypt-file.js <base64-encoded key> <input file path> <output file path>`

# Usage
Install the platforms you need for your app before installing this plugin: `tns platform add [ios|android]`

## iOS
No additional steps required; just `tns build ios --release` and your `.js` files will be encrypted in the `.ipa` binary.

You can validate this on a Mac by right-clicking the `.ipa` and inspecting the package contents.

## Android
No additional steps required; just `tns build android --release` and your `.js` files will be encrypted in the `.apk` binary.

To test the plugin in debug comment out the following line in `platforms/android/include.gradle`

`appProtectionInclude.onlyIf { project.hasProperty('release') }`

### Additional protection
[Use Proguard or Dexguard](http://proguard.sourceforge.net/FAQ.html#encrypt) to obfuscate or encrypt strings in native files so the encryption key is hidden even more deeply. 


