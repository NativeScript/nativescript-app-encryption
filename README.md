__ATTENTION: This repository is deprecated. Use [Webpack with uglify](https://docs.nativescript.org/tooling/bundling-with-webpack#uglifyjs) as an encryption alternative.__


This plugin encrypts all of your `app/**.js` files during a release build.

# How it works
This plugins encrypts all `.js` files in the `app` folder, except those under `tns_modules` with a unique AES256 key that is generated on  each build.
On Android, the key is embedded in native code, on iOS - the key is kept in additional __DATA section in the app binary.

*For the future we are thinking about enhancing the way the encryption key is used. We need your input here. For the moment the plugin is responsible for storing and retrieving the key, but we are open for other suggestions on how to improve this.* See [#1](https://github.com/NativeScript/nativescript-app-encryption/issues/1).

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

### Further reading
Encryption does not guarantee 100% protection. Any sensitive/critical logic should be kept on the server. Please read this blog post for more details - [How secure is NativeScript?](https://www.nativescript.org/blog/how-secure-is-nativescript).

### Next steps
with our 2.5 release we will also enable code obfuscation for the code as part of our integration with WebPack.
