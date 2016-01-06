var protector = TNSAppProtection.alloc().init();

exports.decrypt = function decrypt(encryptedBase64, ivBase64) {
    var encrypted = NSData.alloc().initWithBase64EncodedStringOptions(encryptedBase64, 0);
    var iv = NSData.alloc().initWithBase64EncodedStringOptions(ivBase64, 0);
    
    var decrypted;
    try {
        decrypted = protector.decryptIvError(encrypted, iv);
    } catch (e) {
        throw new Error(`Could not decrypt ${module.id}: ${e.message}`);
    }
    
    return NSString.alloc()
                   .initWithDataEncoding(decrypted, NSUTF8StringEncoding)
                   .stringByTrimmingCharactersInSet(NSCharacterSet.controlCharacterSet())
                   .toString();
};