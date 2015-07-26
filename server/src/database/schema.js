export const schema = {
    movies: `CREATE TABLE IF NOT EXISTS movies
                    (
                        id INTEGER PRIMARY KEY,
                        url TEXT NOT NULL,
                        imdb_code TEXT(10),
                        title TEXT NOT NULL,
                        title_long TEXT NOT NULL,
                        slug TEXT,
                        year INTEGER NOT NULL,
                        rating REAL,
                        runtime INTEGER,
                        genres,
                        language TEXT,
                        download_count INTEGER,
                        like_count INTEGER,
                        rt_critics_score INTEGER,
                        rt_critics_rating TEXT,
                        rt_audience_score INTEGER,
                        rt_audience_rating TEXT,
                        description_intro TEXT,
                        description_full TEXT,
                        yt_trailer_code TEXT,
                        date_uploaded_unix INTEGER
                    )
    `,
    torrents: `CREATE TABLE IF NOT EXISTS torrents
                    (
                        hash TEXT PRIMARY KEY,
                        movie_id INTEGER,
                        url TEXT NOT NULL,
                        quality TEXT(10) NOT NULL,
                        resolution TEXT,
                        framerate REAL,
                        seeds INTEGER,
                        peers INTEGER,
                        size INTEGER NOT NULL,
                        download_count INTEGER,
                        date_uploaded_unix INTEGER,
                        FOREIGN KEY(movie_id) REFERENCES movies(id)
                    )
    `,
    genres: `CREATE TABLE IF NOT EXISTS genres
                    (
                        id TEXT PRIMARY KEY,
                        label TEXT NOT NULL
                    )
    `,
    movieGenre: `CREATE TABLE IF NOT EXISTS movie_genre
                    (
                        movie_id INTEGER NOT NULL,
                        genre_id TEXT NOT NULL,
                        FOREIGN KEY(movie_id) REFERENCES movies(id),
                        FOREIGN KEY(genre_id) REFERENCES genres(id)
                    )
    `
};
