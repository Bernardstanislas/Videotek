package main.java.videotek.model.dao;

import main.java.videotek.model.Movie;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by stan on 06/04/15.
 */
public class MovieDAO {
    private String persistenceUnit;
    private EntityManagerFactory emf;
    private EntityManager em;

    public MovieDAO(final String persistenceUnit) {
        this.persistenceUnit = persistenceUnit;
    }

    public void startConnection(){
        emf = Persistence.createEntityManagerFactory(persistenceUnit);
        em = emf.createEntityManager();
        em.getTransaction().begin();
    }

    public void closeConnection(){
        em.getTransaction().commit();
        emf.close();
    }

    public void save(final Movie movie){
        em.persist(movie);
    }

    public void edit(final Movie movie){
        em.merge(movie);
    }

    public Movie getById(final long movieId){
        return em.find(Movie.class, movieId);
    }

    public Movie getByTitle(final String title) {
        final TypedQuery<Movie> query = em.createQuery("select m from Movie as m where lower(m.title) = lower(:title)", Movie.class);
        return query.setParameter("title", title).getSingleResult();
    }

    public void remove(final Movie movie){
        em.remove(movie);
    }

    public List listAll(){
        return em.createNamedQuery(Movie.LIST_ALL, Movie.class).getResultList();
    }
}
