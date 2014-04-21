/**
 * search
 */
var _ = require('underscore'),
    assert = require('assert'),
    debug = require('debug')('whatcd'),
    Promise = require('promise'),
    WhatCD = require('whatcd');

module.exports = function(username, password) {

    assert(username != undefined, "Must provide username");
    assert(username != undefined, "Must provide password");

    var whatcd = new WhatCD('https://what.cd', username, password);

    /**
     * Handle an error
     *
     * @param error Exception Some sort of ... EXCEPTION!
     */
    function error_handler(error) {
        debug('ERROR: ');
        debug(error);
    }

    /**
     * Browse using What.CD API.
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
     * @return Promise
     * */
    function browse(params, cb) {

        return new Promise(function (resolve, reject) {

            whatcd.browse(params, function (err, data) {
                if (err) return reject(err);
                return resolve(data);
            });

        }).nodeify(cb);

    }

    /**
     * Get a torrent group info and torrent info based on it's id
     * @param id String A torrentId
     * @return Promise
     */
    function getTorrent(id, cb) {

        return new Promise(function (resolve, reject) {

            whatcd.torrent({ id: id }, function (err, data) {
                if (err) return reject(err);
                return resolve(data);
            });

        }).nodeify(cb);

    }

    /**
     * search for torrrents
     * @param params Object the search parameters
     * @return Promise
     */
    function search(params, cb){
        var promise = new Promise(function(resolve, reject){

            browse(params).then(function (groups) {
                var promises = [];

                if (groups && groups.results) {

                    promises = groups.results.map(function (group) {
                        return getTorrent(group.torrentId);
                    });

                    return Promise.all(promises).then(function(torrents){
                        resolve(torrents);
                    });
                }
            }, reject);

        }).nodeify(cb);

        return promise;
    }

    return {
        getTorrent: getTorrent,
        browse: browse,
        search: search
    }

};

