var crypto = require("crypto");
var fs = require("fs");
var path = require("path");
var util = require("util");

function generateKey() {
    var password = crypto.randomBytes(32);
    var salt = crypto.randomBytes(32);
    var key = crypto.pbkdf2Sync(password, salt, 10000, 256 / 8, "sha1").toString("base64");
    return key;
}

function encryptFile(keyString, filePath) {
    var key = new Buffer(keyString, "base64");
    var iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    var input = fs.readFileSync(filePath);
    var encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    var output = util.format("eval(require('nativescript-app-protection').decrypt('%s', '%s'));", encrypted.toString("base64"), iv.toString("base64"));
    
    return new Promise(function(res, rej) {
        fs.writeFile(filePath, output, function(err) {
            res();
        });
    });
}

function walkDir(dir, callback) {
    return new Promise(function(res, rej) {
        fs.readdir(dir, function(err, files) {
            var childPromises = [];
            files.forEach(function(file) {
                var filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    childPromises.push(walkDir(filePath, callback));
                }
                else {
                    childPromises.push(callback(filePath));
                }
            });
            Promise.all(childPromises).then(function() { res(); });
        });
    });
};

function encryptPreparedAppFolder(preparedAppFolder, key) {
    var tnsModulesFolder = path.join(preparedAppFolder, 'app', 'tns_modules');
    return walkDir(preparedAppFolder, function(filePath) {
        // skip files in app/tns_modules path and non js files
        if (filePath.indexOf(tnsModulesFolder) == 0 || path.extname(filePath) !== ".js") {
            return Promise.resolve();
        }
        return encryptFile(key, filePath);
    });
}

module.exports = {
    generateKey: generateKey,
    encryptFile: encryptFile,
    encryptPreparedAppFolder: encryptPreparedAppFolder
}