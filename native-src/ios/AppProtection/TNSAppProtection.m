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

static NSData *_key;

+ (void) setKey:(NSData *)key {
  _key = [key copy];
}

- (NSData *)decrypt:(NSData *)payload iv:(NSData *)iv error:(NSError **)error{
    NSParameterAssert(payload);
    NSParameterAssert(iv);

    NSMutableData *decrypted = [NSMutableData dataWithLength:payload.length];

    size_t decryptedBytes = 0;
    CCCryptorStatus status = CCCrypt(kCCDecrypt, kCCAlgorithmAES128, 0, _key.bytes, _key.length, iv.bytes, payload.bytes, payload.length, decrypted.mutableBytes, decrypted.length, &decryptedBytes);
    if (status != kCCSuccess && error) {
        *error = [NSError errorWithDomain:@"TNSAppProtectionErrorDomain" code:status userInfo:nil];
        return nil;
    }
    assert(decryptedBytes == payload.length);

    return [decrypted copy];
}

@end
