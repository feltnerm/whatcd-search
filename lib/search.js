/**
 * search
 */
var _ = require('underscore'),
    RSVP = require('rsvp'),
    WhatCD = require('whatcd');

var username = process.env.WHAT_USERNAME || '',
    password = process.env.WHAT_PASSWORD || '';

var whatcd = new WhatCD('https://what.cd', username, password);

/**
 * Search using What.CD API.
 *
 * @param params Object params are search parameters as documented below:
 *     searchstr - string to search for
 *
 *     page - page to display (default: 1)
 *
 *     taglist, tags_type, order_by, order_way, filter_cat, freetorrent,
 *     vanityhouse, scene, haslog, releasetype, media, format, encoding,
 *     artistname, filelist, groupname, recordlabel, cataloguenumber, year,
 *     remastertitle, remasteryear, remasterrecordlabel,
 *     remastercataloguenumber
 * @return RSVP.Promise
 * */
function search(params) {

    return new RSVP.Promise(function (resolve, reject) {

        whatcd.browse(params, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });

    });

}

/**
 * Get a torrent group info and torrent info based on it's id
 * @param id String A torrentId
 * @return RSVP.Promise
 */
function getTorrent(id) {

    return new RSVP.Promise(function (resolve, reject) {

        whatcd.torrent({ id: id }, function (err, data) {
            if (err) return reject(err);
            return resolve(data);
        });

    });

}

/**
 * Handle an error
 *
 * @param error Exception Some sort of ... EXCEPTION!
 */
function error_handler(error) {
    console.log('ERROR: ');
    console.error(error);

    process.exit(1);
}

// search what.cd
module.exports = function (params) {

    search(params).then(function (results) {
        return results;

    }, function (err) {
        error_handler(err);

    }).then(function (groups) {
        var promises = [];

        if (groups && groups.results) {

            promises = groups.results.map(function (group) {
                return getTorrent(group.torrentId);
            });

            return promises;
        }

    }).then(function (promises) {
        return RSVP.all(promises).then(function (torrents) {
            // @TODO: proper filtering on search critera maybe some boolean ops
            var matched_torrents = torrents.map(function (torrent) {
                var info = _.extend(
                        _.omit(torrent.group, 'wikiBody', 'vanityHouse',
                               'isBookmarked'),
                        _.omit(torrent.torrent, 'description', 'seeders',
                               'leechers', 'snatched', 'freeTorrent',
                               'reported', 'time', 'description', 'fileList')
                );

                return info;
            });

            return matched_torrents;

        }, function (error) {
            error_handler(error);

        });

    }, function (err) {
        error_handler(err);

    });

};
