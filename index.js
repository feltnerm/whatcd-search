#!/usr/bin/env node

var _ = require('underscore'),
    minimist = require('minimist');

var search = require('./lib/search');

// set default params
var params = {
    media: 'CD',
    encoding: 'lossless',
    format: 'FLAC',
};

if (process.argv.length > 2) {
    var args = process.argv.slice(2),
        argv = minimist(args);

    params = _.extend(params, argv);
    console.log(search(params));

} else {
    console.log("Usage: \n" +
                "\n" +
                "--artistname ['Ween',...]\n" +
                "--searchstr ['White Pepper',...]\n" +
                "--media [WEB,CD,...]\n" +
                "--encoding [lossless,...]\n" +
                "--format [FLAC,...]\n" +
                "\n" +
                " .. and so forth ...\n");
    process.exit(1);

}
