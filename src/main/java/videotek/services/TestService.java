package main.java.videotek.services;

import main.java.videotek.model.Movie;
import yts.YtsClient;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by stan on 06/04/15.
 */
public class TestService {

    public static void main(String[] args) throws Exception {
        final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("in.memory.test");
        final EntityManager entityManager = entityManagerFactory.createEntityManager();

        final Movie movie = new Movie(1);
        entityManager.getTransaction().begin();
        entityManager.persist(movie);
        entityManager.getTransaction().commit();

        final YtsClient client = new YtsClient.Builder()
                .withMovies()
                .build();

        final MovieService movieService = new MovieService(client);
    }
}
