#!/usr/bin/env node
var crypto = require("crypto");
var fs = require("fs");
var util = require("util");

var key = new Buffer(process.argv[2], "base64");
var iv = crypto.randomBytes(16);
var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

var input = fs.readFileSync(process.argv[3]);
var encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

var output = util.format("eval(require('app-protection').decrypt('%s', '%s'))", encrypted.toString("base64"), iv.toString("base64"));
fs.writeFileSync(process.argv[4], output);