package main.java.videotek.services;

import main.java.videotek.model.Movie;
import main.java.videotek.utils.JsonTransformer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;

import static spark.Spark.get;

/**
 * Created by stan on 06/04/15.
 */
public class TestService {

    public static void main(String[] args) throws Exception {
        final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("in.memory.test");
        final EntityManager entityManager = entityManagerFactory.createEntityManager();

        final Movie movie = new Movie("Titre de film lol");
        entityManager.getTransaction().begin();
        entityManager.persist(movie);
        entityManager.getTransaction().commit();

        get("/movies", "application/json", (request, response) -> {
            TypedQuery<Movie> query = entityManager.createQuery(
                    "SELECT m FROM Movie AS m", Movie.class);
            return query.getResultList();
        }, new JsonTransformer());
    }
}
