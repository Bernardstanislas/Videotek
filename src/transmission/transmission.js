import {promisify} from 'bluebird';

const S4 = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

const uuid = function() {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
};

const Transmission = function(options) {
    options = options || {};
    this.url = options.url || '/transmission/rpc';
    this.host = options.host || 'localhost';
    this.port = options.port || 9091;
    this.key = null;

    if (options.username) {
        this.authHeader = 'Basic ' + new Buffer(options.username + (options.password ? ':' + options.password: '')).toString('base64');
    }

};

Transmission.prototype.set = promisify(function(ids, options, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    const args = {ids: ids};

    if ( typeof options === 'function') {
        callback = options;
    } else {
        if ( typeof options === 'object') {
            const keys = Object.keys(options);
            for (let i = 0; i < keys.length; i++) {
                args[keys[i]] = options[keys[i]];
            }
        } else {
            callback(new Error('Arguments mismatch for "bt.set"'));
        }
    }

    this.callServer({
        arguments: args,
        method: this.methods.torrents.set,
        tag: uuid()
    }, function(err) {
        callback(err);
    });

});

Transmission.prototype.add = promisify(function(path, options, callback) {
    // for retro-compatibility with old function
    this.addUrl(path, options, callback);
});

Transmission.prototype.addUrl = promisify(function(url, options, callback) {
    const args = {};
    args.filename = url;
    this.addTorrentDataSrc(args, options, callback);
});

Transmission.prototype.addTorrentDataSrc = promisify(function(args, options, callback) {
    if ( typeof options === 'function') {
        callback = options;
    } else {
        if ( typeof options === 'object') {
            const keys = Object.keys(options);
            for (let i = 0; i < keys.length; i++) {
                args[keys[i]] = options[keys[i]];
            }
        } else {
            callback(new Error('Arguments mismatch for "bt.add"'));
        }
    }
    this.callServer({
        arguments: args,
        method: this.methods.torrents.add,
        tag: uuid()
    }, function(err, result) {
        if (err) {
            return callback(err);
        }
        const torrent = result['torrent-duplicate'] ? result['torrent-duplicate']: result['torrent-added'];
        callback(err, torrent);
    });
});

Transmission.prototype.remove = promisify(function(ids, del, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    if ( typeof del === 'function') {
        callback = del;
        del = false;
    }
    const options = {
        arguments: {
            ids: ids,
            'delete-local-data': !!del
        },
        method: this.methods.torrents.remove,
        tag: uuid()
    };
    this.callServer(options, callback);
});

Transmission.prototype.move = promisify(function(ids, location, move, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    if ( typeof move === 'function') {
        callback = move;
        move = true;
    }
    const options = {
        arguments: {
            ids: ids,
            location: location,
            move: move
        },
        method: this.methods.torrents.location,
        tag: uuid()
    };
    this.callServer(options, callback);
});

Transmission.prototype.get = promisify(function(ids, callback) {
    const options = {
        arguments: {
            fields: this.methods.torrents.fields,
            ids: ids
        },
        method: this.methods.torrents.get,
        tag: uuid()
    };

    if ( typeof ids === 'function') {
        callback = ids;
        delete (options.arguments.ids);
    } else {
        options.arguments.ids = Array.isArray(ids) ? ids: [ids];
    }

    this.callServer(options, callback);
    return this;
});

Transmission.prototype.peers = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    const options = {
        arguments: {
            fields: ['peers', 'hashString', 'id'],
            ids: ids
        },
        method: this.methods.torrents.get,
        tag: uuid()
    };

    this.callServer(options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result.torrents);
    });
    return this;
});

Transmission.prototype.files = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    const options = {
        arguments: {
            fields: ['files', 'fileStats', 'hashString', 'id'],
            ids: ids
        },
        method: this.methods.torrents.get,
        tag: uuid()
    };

    this.callServer(options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result.torrents);
    });
    return this;
});

Transmission.prototype.fast = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    const options = {
        arguments: {
            fields: ['id', 'error', 'errorString', 'eta', 'isFinished', 'isStalled', 'leftUntilDone', 'metadataPercentComplete', 'peersConnected', 'peersGettingFromUs', 'peersSendingToUs', 'percentDone', 'queuePosition', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedRatioMode', 'seedRatioLimit', 'sizeWhenDone', 'status', 'trackers', 'uploadedEver', 'uploadRatio'],
            ids: ids
        },
        method: this.methods.torrents.get,
        tag: uuid()
    };
    this.callServer(options, function(err, result) {
        if (err) {
            return callback(err);
        }
        callback(null, result.torrents);
    });
    return this;
});

Transmission.prototype.stop = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    this.callServer({
        arguments: {
            ids: ids
        },
        method: this.methods.torrents.stop,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.stopAll = promisify(function(callback) {
    this.callServer({
        method: this.methods.torrents.stop
    }, callback);
    return this;
});

Transmission.prototype.start = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    this.callServer({
        arguments: {
            ids: ids
        },
        method: this.methods.torrents.start,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.startAll = promisify(function(callback) {
    this.callServer({
        method: this.methods.torrents.start
    }, callback);
    return this;
});

Transmission.prototype.startNow = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    this.callServer({
        arguments: {
            ids: ids
        },
        method: this.methods.torrents.startNow,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.verify = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    this.callServer({
        arguments: {
            ids: ids
        },
        method: this.methods.torrents.verify,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.reannounce = promisify(function(ids, callback) {
    ids = Array.isArray(ids) ? ids: [ids];
    this.callServer({
        arguments: {
            ids: ids
        },
        method: this.methods.torrents.reannounce,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.all = promisify(function(callback) {
    this.callServer({
        arguments: {
            fields: this.methods.torrents.fields
        },
        method: this.methods.torrents.get,
        tag: uuid()
    }, callback);
    return this;
});

Transmission.prototype.active = promisify(function(callback) {
    const options = {
        arguments: {
            fields: this.methods.torrents.fields,
            ids: 'recently-active'
        },
        method: this.methods.torrents.get,
        tag: uuid()
    };
    this.callServer(options, callback);
    return this;
});

Transmission.prototype.session = promisify(function(data, callback) {
    let options = {};
    if ( typeof data !== 'function') {
        const keys = Object.keys(data);
        let key;
        for (let i = 0, j = keys.length; i < j; i++) {
            key = keys[i];
            if (!this.methods.session.setTypes[key]) {
                const error = new Error('Cant set type ' + key);
                // error.result = page; // FIXME: page not defined
                callback(error);
                return this;
            }
        }
        options = {
            arguments: data,
            method: this.methods.session.set,
            tag: uuid()
        };
    } else {
        options = {
            method: this.methods.session.get,
            tag: uuid()
        };
    }
    this.callServer(options, data);
    return this;
});

Transmission.prototype.sessionStats = promisify(function(callback) {
    const options = {
        method: this.methods.session.stats,
        tag: uuid()
    };
    this.callServer(options, callback);
});

Transmission.prototype.callServer = async function(query, callBack) {
    const self = this;
    const queryJsonify = JSON.stringify(query);
    const options = {
        method: 'POST',
        headers: {
            'Time': new Date(),
            'Host': this.host + ':' + this.port,
            'X-Requested-With': 'Node',
            'X-Transmission-Session-Id': this.key || '',
            'Content-Length': queryJsonify.length,
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: queryJsonify
    };

    if (this.authHeader) {
        options.headers.Authorization = this.authHeader;
    }

    const response = await fetch(`http://${this.host}:${this.port}${this.url}`, options);
    if (response.status == 409) {
        const body = await response.text();
        self.key = body.match(/.*: (.*)<\/c/)[1];
        return self.callServer(query, callBack);
    } else {
        try {
            const data = await response.json();
            callBack(null, data.arguments);
        } catch (err) {
            console.error(err);
        }
    }
};

Transmission.prototype.statusArray = ['STOPPED', 'CHECK_WAIT', 'CHECK', 'DOWNLOAD_WAIT', 'DOWNLOAD', 'SEED_WAIT', 'SEED', 'ISOLATED'];
Transmission.prototype.status = {};

Transmission.prototype.statusArray.forEach(function(status, i) {
    Transmission.prototype.status[status] = i;
});

Transmission.prototype.methods = {
    torrents: {
        stop: 'torrent-stop',
        start: 'torrent-start',
        startNow: 'torrent-start-now',
        verify: 'torrent-verify',
        reannounce: 'torrent-reannounce',
        set: 'torrent-set',
        setTypes: {
            'bandwidthPriority': true,
            'downloadLimit': true,
            'downloadLimited': true,
            'files-wanted': true,
            'files-unwanted': true,
            'honorsSessionLimits': true,
            'ids': true,
            'location': true,
            'peer-limit': true,
            'priority-high': true,
            'priority-low': true,
            'priority-normal': true,
            'seedRatioLimit': true,
            'seedRatioMode': true,
            'uploadLimit': true,
            'uploadLimited': true
        },
        add: 'torrent-add',
        addTypes: {
            'download-dir': true,
            'filename': true,
            'metainfo': true,
            'paused': true,
            'peer-limit': true,
            'files-wanted': true,
            'files-unwanted': true,
            'priority-high': true,
            'priority-low': true,
            'priority-normal': true
        },
        remove: 'torrent-remove',
        removeTypes: {
            'ids': true,
            'delete-local-data': true
        },
        location: 'torrent-set-location',
        locationTypes: {
            'location': true,
            'ids': true,
            'move': true
        },
        get: 'torrent-get',
        fields: ['activityDate', 'addedDate', 'bandwidthPriority', 'comment', 'corruptEver', 'creator', 'dateCreated', 'desiredAvailable', 'doneDate', 'downloadDir', 'downloadedEver', 'downloadLimit', 'downloadLimited', 'error', 'errorString', 'eta', 'files', 'fileStats', 'hashString', 'haveUnchecked', 'haveValid', 'honorsSessionLimits', 'id', 'isFinished', 'isPrivate', 'leftUntilDone', 'magnetLink', 'manualAnnounceTime', 'maxConnectedPeers', 'metadataPercentComplete', 'name', 'peer-limit', 'peers', 'peersConnected', 'peersFrom', 'peersGettingFromUs', 'peersKnown', 'peersSendingToUs', 'percentDone', 'pieces', 'pieceCount', 'pieceSize', 'priorities', 'rateDownload', 'rateUpload', 'recheckProgress', 'seedIdleLimit', 'seedIdleMode', 'seedRatioLimit', 'seedRatioMode', 'sizeWhenDone', 'startDate', 'status', 'trackers', 'trackerStats ', 'totalSize', 'torrentFile', 'uploadedEver', 'uploadLimit', 'uploadLimited', 'uploadRatio', 'wanted', 'webseeds', 'webseedsSendingToUs']
    },
    session: {
        stats: 'session-stats',
        get: 'session-get',
        set: 'session-set',
        setTypes: {
            'start-added-torrents': true,
            'alt-speed-down': true,
            'alt-speed-enabled': true,
            'alt-speed-time-begin': true,
            'alt-speed-time-enabled': true,
            'alt-speed-time-end': true,
            'alt-speed-time-day': true,
            'alt-speed-up': true,
            'blocklist-enabled': true,
            'dht-enabled': true,
            'encryption': true,
            'download-dir': true,
            'peer-limit-global': true,
            'peer-limit-per-torrent': true,
            'pex-enabled': true,
            'peer-port': true,
            'peer-port-random-on-start': true,
            'port-forwarding-enabled': true,
            'seedRatioLimit': true,
            'seedRatioLimited': true,
            'speed-limit-down': true,
            'speed-limit-down-enabled': true,
            'speed-limit-up': true,
            'speed-limit-up-enabled': true
        }
    },
    other: {
        blockList: 'blocklist-update',
        port: 'port-test'
    }
};

export default Transmission;
