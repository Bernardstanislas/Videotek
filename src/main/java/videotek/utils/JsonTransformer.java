package main.java.videotek.utils;

import com.google.gson.Gson;
import spark.ResponseTransformer;

/**
 * Created by stan on 06/04/15.
 */
public class JsonTransformer implements ResponseTransformer {
    private final Gson gson = new Gson();

    @Override
    public String render(final Object model) throws Exception {
        return gson.toJson(model);
    }
}
