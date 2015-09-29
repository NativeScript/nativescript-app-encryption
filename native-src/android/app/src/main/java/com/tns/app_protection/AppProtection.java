package com.tns.app_protection;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import android.content.Context;
import android.util.Base64;
import android.util.Log;

public class AppProtection
{
    public static String decrypt(String raw, String i, Context context) throws Exception
    {
        byte[] encryptedBytes = Base64.decode(raw, 0);
        byte[] ivBytes = Base64.decode(i, 0);
        IvParameterSpec iv = new IvParameterSpec(ivBytes);

        int encryptionKeyId = context.getResources().getIdentifier("encryptionKey", "string", context.getPackageName());
        Log.d("encryption-key-id", "Encryption key id is: " + encryptionKeyId + " iv:" + i);
        String encryptionKeyText = context.getResources().getString(encryptionKeyId);
        byte[] encryptionKey = Base64.decode(encryptionKeyText, 0);

        byte[] decrypted = decrypt(encryptionKey, encryptedBytes, iv);
        String source = new String(decrypted);

        return source;
    }

    private static byte[] decrypt(byte[] key, byte[] encryptedData, IvParameterSpec iv) throws Exception
    {
        SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
        byte[] decrypted = cipher.doFinal(encryptedData);
        return decrypted;
    }
}
