import {parseString} from 'xml2js';
import {promisify} from 'bluebird';

const url = 'http://plex.meowtsetung.com/library/sections/1/all';

const headers = new Headers();
headers.append('X-Plex-Platform', 'NodeJS');
headers.append('X-Plex-Platform-Version', '0.4.3');
headers.append('X-Plex-Provides', 'player');
headers.append('X-Plex-Client-Identifier', '9999');
headers.append('X-Plex-Product', 'Videotek');
headers.append('X-Plex-Version', '0.0.1');
headers.append('X-Plex-Device', 'Electron');

export const refresh = () => fetch(url, {headers})
.then(response => response.text())
.then(promisify(parseString))
.then(results => results.MediaContainer.Video)
.then(movies => movies.map(movie => movie.$.originalTitle || movie.$.title))
