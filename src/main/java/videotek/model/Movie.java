package main.java.videotek.model;

import javax.persistence.*;

/**
 * Created by stan on 06/04/15.
 */
@Entity
@Table(name = "movie")
@NamedQuery(name="listAll", query="select m from Movie m")
public class Movie {
    public static final String LIST_ALL = "listAll";

    @Id
    @GeneratedValue(strategy=GenerationType.TABLE)
    private long id;

    private String title;

    public Movie() {
    }

    public Movie(final String title) {
        this.title = title;
    }

    public long getId() {
        return id;
    }

    public void setId(final long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(final String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "title='" + title + '\'' +
                '}';
    }

}
