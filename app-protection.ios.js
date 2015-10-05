var protector = TNSAppProtection.alloc().init();

exports.decrypt = function decrypt(encryptedBase64, ivBase64) {
    var encrypted = NSData.alloc().initWithBase64EncodedStringOptions(encryptedBase64, 0);
    var iv = NSData.alloc().initWithBase64EncodedStringOptions(ivBase64, 0);
    
    var decrypted;
    try {
        decrypted = protector.decryptIvError(encrypted, iv);
    } catch (e) {
        console.error(e);
        throw new ModuleError(`Could not decrypt ${module.id}`);
    }
    
    return NSString.alloc()
                   .initWithDataEncoding(decrypted, NSUTF8StringEncoding)
                   .stringByTrimmingCharactersInSet(NSCharacterSet.controlCharacterSet())
                   .toString();
};