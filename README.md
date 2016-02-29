Videotek
========

[![Build Status](https://travis-ci.org/Bernardstanislas/Videotek.svg?branch=master)](https://travis-ci.org/Bernardstanislas/Videotek)

A project to make the link between [YIFY torrents](https://yts.to/browse-movies) and [Plex Media Server](https://plex.tv/), using [WebTorrent](https://github.com/feross/webtorrent) as a torrent client.

Plex media center
-----------------

Movies can be retrieved via a `GET` on the address :

```
http://server:port/library/all?X-Plex-Container-Size=500&X-Plex-Container-Start=0&X-Plex-Token=token
```

Then you get the following answer :

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<MediaContainer size="205" totalSize="205" allowSync="1" art="/:/resources/movie-fanart.jpg" identifier="com.plexapp.plugins.library" librarySectionID="1" librarySectionTitle="Films" librarySectionUUID="51e99321-18d7-47b6-9c2e-048e786fd572" mediaTagPrefix="/system/bundle/media/flags/" mediaTagVersion="1436213533" offset="0" thumb="/:/resources/movie.png" title1="Films" title2="All Films" viewGroup="movie" viewMode="65592">
    <Video ratingKey="10" key="/library/metadata/10" studio="Orion-Nova Productions" type="movie" title="12 Angry Men" originalTitle="12 Angry Men" summary="Un jeune homme d&apos;origine modeste est accusé du meurtre de son père et risque la peine de mort. Le jury composé de douze hommes se retire pour délibérer et procède immédiatement à un vote : onze votent coupable, or la décision doit être prise à l&apos;unanimité. Le juré qui a voté non-coupable, sommé de se justifier, explique qu&apos;il a un doute et que la vie d&apos;un homme mérite quelques heures de discussion. Il s&apos;emploie alors à les convaincre un par un." rating="8.1" viewOffset="66322" lastViewedAt="1430511604" year="1957" tagline="Life Is In Their Hands -- Death Is On Their Minds!" thumb="/library/metadata/10/thumb/1431979035" art="/library/metadata/10/art/1431979035" duration="5781865" originallyAvailableAt="1957-04-10" addedAt="1430254602" updatedAt="1431979035" chapterSource="">
        <Media videoResolution="720" id="10" duration="5781865" bitrate="2737" width="1200" height="720" aspectRatio="1.66" audioChannels="1" audioCodec="ac3" videoCodec="h264" container="mkv" videoFrameRate="24p">
            <Part id="10" key="/library/parts/10/file.mkv" duration="5781865" file="/data/Videos/Films/Angry.Men.1957.720p.BRRip.x264-x0r/12.Angry.Men.1957.720p.BRRip.x264-x0r.mkv" size="1978448797" container="mkv" />
        </Media>
        <Genre tag="Drame" />
        <Writer tag="Reginald Rose" />
        <Director tag="Sidney Lumet" />
        <Country tag="USA" />
        <Role tag="Henry Fonda" />
        <Role tag="Lee J. Cobb" />
        <Role tag="Ed Begley" />
    </Video>
    ...
</MediaContainer>
```

Architecture
------------

The back office lays on a [LevelDB](https://www.sqlite.org/), containing movies from YIFY.

The available movie list is refreshed through the [YIFY API](https://yts.to/api), with plain HTTP calls.

The movies are then downloaded with WebTorrent, and sent to the Plex media folder, watched by the Plex media center itslef that will refresh the Plex database upon movie arrival.
