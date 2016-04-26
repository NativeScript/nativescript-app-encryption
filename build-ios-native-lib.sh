### Build iOS native library

# build the iOS library both for emulator and device
xcodebuild -project ./native-src/ios/AppProtection.xcodeproj -target AppProtection -sdk iphoneos -configuration Release ARCHS="armv7 arm64"
xcodebuild -project ./native-src/ios/AppProtection.xcodeproj -target AppProtection -sdk iphonesimulator -configuration Release ARCHS="i386 x86_64"

XCODE_BUILD_PATH="./native-src/ios/build"
DESTIONATION_PATH="./platforms/ios"
rm -rf "$DESTIONATION_PATH/include"
rm -f "$DESTIONATION_PATH/AppProtection.a"

# create fat binary
lipo -create "$XCODE_BUILD_PATH/Release-iphoneos/AppProtection.a" "$XCODE_BUILD_PATH/Release-iphonesimulator/AppProtection.a" -output "$DESTIONATION_PATH/AppProtection.a"
# copy all headers
cp -r "$XCODE_BUILD_PATH/Release-iphoneos/include" "$DESTIONATION_PATH/include"