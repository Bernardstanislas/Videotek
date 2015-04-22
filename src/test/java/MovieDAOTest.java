package test.java;

import junit.framework.Assert;
import main.java.videotek.model.Movie;
import main.java.videotek.model.MovieStatus;
import main.java.videotek.model.dao.MovieDAO;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by stan on 06/04/15.
 */
public class MovieDAOTest {
    final List<Movie> data = new ArrayList<>();
    final MovieDAO movieDAO = new MovieDAO("in.memory.test");

    @Before
    public void insertData() {
        movieDAO.startConnection();
        data.add(new Movie(0));
        data.add(new Movie(1));
        data.add(new Movie(2));
        data.add(new Movie(4));
        data.get(1).setStatus(MovieStatus.DOWNLOADING);
        data.get(2).setStatus(MovieStatus.DOWNLOADING);
        data.get(3).setStatus(MovieStatus.DOWNLOADED);
        for (final Movie movie : data) {
            movieDAO.save(movie);
        }
    }

    //----
    @Test
    public void moviesInserted() {
        Assert.assertEquals(data, movieDAO.listAll());
    }

    @Test
    public void findById() {
        final Movie result = movieDAO.getById(4);
        Assert.assertEquals(data.get(3), result);
    }

    @Test
    public void findByDownloadingStatus() {
        final List<Movie> results = movieDAO.getByStatus(MovieStatus.DOWNLOADING);
        Assert.assertEquals(2, results.size());
        Assert.assertEquals(data.get(1), results.get(0));
        Assert.assertEquals(data.get(2), results.get(1));
    }

    @Test
    public void findByDownloadedStatus() {
        final List<Movie> results = movieDAO.getByStatus(MovieStatus.DOWNLOADED);
        Assert.assertEquals(1, results.size());
        Assert.assertEquals(data.get(3), results.get(0));
    }

    @Test
    public void editMovie() {
        final Movie movie = movieDAO.getById(2);
        movie.setStatus(MovieStatus.WAITING);
        movieDAO.edit(movie);
        final Movie result = movieDAO.getById(2);
        Assert.assertEquals(MovieStatus.WAITING, result.getStatus());
    }

    //----
    @After
    public void closeConnection() {
        movieDAO.closeConnection();
    }

}
