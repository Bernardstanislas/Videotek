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
    private int id;

    private MovieStatus status;

    public Movie() {
        this.status = MovieStatus.WAITING;
    }

    public Movie(final int id) {
        this.id = id;
        this.status = MovieStatus.WAITING;
    }

    public int getId() {
        return id;
    }

    public void setId(final int id) {
        this.id = id;
    }

    public MovieStatus getStatus() {
        return status;
    }

    public void setStatus(final MovieStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "id='" + id + '\'' +
                "status='" + status + '\'' +
                '}';
    }

}
