//
//  TNSAppProtection.m
//  AppProtection
//
//  Created by Yavor Georgiev on 2.10.15 г..
//  Copyright © 2015 г. Telerik. All rights reserved.
//

#import "TNSAppProtection.h"
#import <CommonCrypto/CommonCrypto.h>

@implementation TNSAppProtection

extern char startOfKeySection __asm("section$start$__DATA$__bin_data");

static NSData *getKey() {
    static NSData *_key;
    if (!_key) {
        _key = [[NSData alloc] initWithBase64EncodedString: [[NSString stringWithUTF8String: &startOfKeySection] substringToIndex: 44] options:0];
    }
    return _key;
}

- (NSData *)decrypt:(NSData *)payload iv:(NSData *)iv error:(NSError **)error{
    NSParameterAssert(payload);
    NSParameterAssert(iv);

    NSMutableData *decrypted = [NSMutableData dataWithLength:payload.length];

    size_t decryptedBytes = 0;
    NSData *key = getKey();
    CCCryptorStatus status = CCCrypt(kCCDecrypt, kCCAlgorithmAES128, 0, key.bytes, key.length, iv.bytes, payload.bytes, payload.length, decrypted.mutableBytes, decrypted.length, &decryptedBytes);
    if (status != kCCSuccess && error) {
        *error = [NSError errorWithDomain:@"TNSAppProtectionErrorDomain" code:status userInfo:nil];
        return nil;
    }
    assert(decryptedBytes == payload.length);

    return [decrypted copy];
}

@end
