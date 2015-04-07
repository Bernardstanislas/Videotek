package test.java;

import junit.framework.Assert;
import main.java.videotek.model.Movie;
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
        data.add(new Movie("Le train sonnera trois fois"));
        data.add(new Movie("West side story"));
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
        final Movie result = movieDAO.getById(2);
        Assert.assertEquals(data.get(1), result);
    }

    @Test
    public void findByTitle() {
        final Movie result = movieDAO.getByTitle("West side story");
        Assert.assertEquals(data.get(1), result);
    }

    @Test
    public void editMovie() {
        final Movie movie = movieDAO.getByTitle("West side story");
        movie.setTitle("Taxi driver");
        movieDAO.edit(movie);
        final Movie result = movieDAO.getByTitle("Taxi driver");
        Assert.assertEquals(movie, result);
    }

    //----
    @After
    public void closeConnection() {
        movieDAO.closeConnection();
    }

}
