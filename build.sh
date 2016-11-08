### Build and update iOS native library

# build the iOS library both for emulator and device
xcodebuild -project ./native-src/ios/AppEncryption.xcodeproj -target AppEncryption -sdk iphoneos -configuration Release ARCHS="armv7 arm64"
xcodebuild -project ./native-src/ios/AppEncryption.xcodeproj -target AppEncryption -sdk iphonesimulator -configuration Release ARCHS="i386 x86_64"

XCODE_BUILD_PATH="./native-src/ios/build"
DESTIONATION_PATH="./platforms/ios"
rm -rf "$DESTIONATION_PATH/include"
rm -f "$DESTIONATION_PATH/AppEncryption.a"

# create fat binary
lipo -create "$XCODE_BUILD_PATH/Release-iphoneos/AppEncryption.a" "$XCODE_BUILD_PATH/Release-iphonesimulator/AppEncryption.a" -output "$DESTIONATION_PATH/AppEncryption.a"
# copy all headers
cp -r "$XCODE_BUILD_PATH/Release-iphoneos/include" "$DESTIONATION_PATH/include"

### TODO: Build and update Android native library

### NPM pack
npm pack