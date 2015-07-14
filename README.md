Videotek
========

A project to make the link between [YIFY torrents](https://yts.to/browse-movies), [Transmission client](http://www.transmissionbt.com/) and [Plex Media Server](https://plex.tv/).

Plex media center
-----------------

Movies can be retrieved via a `GET` on the address :

```
http://server:port/library/arts?X-Plex-Container-Size=500&X-Plex-Container-Start=0&X-Plex-Token=token
```

Then you get the following answer :

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<MediaContainer size="210" totalSize="210" allowSync="0" identifier="com.plexapp.plugins.library" mediaTagPrefix="/system/bundle/media/flags/" mediaTagVersion="1436213533" offset="0">
    <Photo title="12 Years a Slave" type="image" key="/library/metadata/1/art/1431979035" thumb="" label="" mediaType="" summary="" rating="-1" addDate="-1" modDate="-1" metaModDate="-1" />
    <Photo title="2001: A Space Odyssey" type="image" key="/library/metadata/2/art/1431979040" thumb="" label="" mediaType="" summary="" rating="-1" addDate="-1" modDate="-1" metaModDate="-1" />
    <Photo title="22 Jump Street" type="image" key="/library/metadata/3/art/1431979040" thumb="" label="" mediaType="" summary="" rating="-1" addDate="-1" modDate="-1" metaModDate="-1" />
    ...
</MediaContainer>
```
