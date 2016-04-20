package com.tns.app_protection;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import android.util.Base64;

public class AppProtection {

  private static String key;

  public static void setKey(String pKey) {
    key = pKey;
  }

  public static String decrypt(String raw, String i) throws Exception {
    byte[] encryptedBytes = Base64.decode(raw, 0);
    byte[] ivBytes = Base64.decode(i, 0);
    IvParameterSpec iv = new IvParameterSpec(ivBytes);
    byte[] encryptionKey = Base64.decode(key, 0);
    byte[] decrypted = decrypt(encryptionKey, encryptedBytes, iv);
    return new String(decrypted);
  }

  private static byte[] decrypt(byte[] key, byte[] encryptedData, IvParameterSpec iv) throws Exception {
    SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
    cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
    return cipher.doFinal(encryptedData);
  }
}
