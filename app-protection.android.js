exports.decrypt = function(encrypted, iv) {
  	return com.tns.app_protection.AppProtection.decrypt(encrypted, iv);
};