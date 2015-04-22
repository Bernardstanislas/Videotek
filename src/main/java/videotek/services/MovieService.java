package main.java.videotek.services;

import main.java.videotek.utils.JsonTransformer;
import spark.Request;
import spark.Response;
import yts.YtsClient;
import yts.module.MovieModule;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.after;
import static spark.Spark.get;

/**
 * Created by stan on 22/04/15.
 */
public class MovieService {
    private final MovieModule movieModule;

    public MovieService(final YtsClient client) {
        this.movieModule = client.movies();

        get("movies/list", (final Request request, final Response response) -> {
            final Map<String, Object> options = new HashMap<String, Object>();
            for (final String param : request.queryParams()) {
                options.put(param, request.queryParams(param));
            }
            return movieModule.list(options);
        }, new JsonTransformer());

        after((request, response) -> {
            response.type("application/json");
        });
    }
}
