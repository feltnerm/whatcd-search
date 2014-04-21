#!/usr/bin/env node

var util = require('util'),
    _ = require('underscore'),
    minimist = require('minimist');

var Client = require('./lib/search');

// set default params
var params = {
    searchstr: 'Pure Guava'
};

function filter_torrents(torrents){
    return torrents.map(function (torrent) {
        var info = _.extend(
            _.omit(torrent.group, 'wikiBody', 'vanityHouse',
                   'isBookmarked'),
            _.omit(torrent.torrent, 'description', 'seeders',
                   'leechers', 'snatched', 'freeTorrent',
                   'reported', 'time', 'description', 'fileList')
        );

        return info;
    });
}

if (process.argv.length > 2) {
    var args = process.argv.slice(2),
        argv = minimist(args);

    params = _.extend(params, argv);

    var client = Client(process.env.WHAT_USERNAME, process.env.WHAT_PASSWORD);

    client.search(params).then(function(result){
        console.dir(filter_torrents(result));
    }, function(error){
        debug(error);
    });

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
    process.exit(1)

}
