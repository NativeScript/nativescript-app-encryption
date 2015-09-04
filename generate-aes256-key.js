#!/usr/bin/env node
var crypto = require("crypto");

var password = crypto.randomBytes(32);
var salt = crypto.randomBytes(32);
var key = crypto.pbkdf2Sync(password, salt, 10000, 256 / 8, "sha1");

process.stdout.write(key.toString("base64"));