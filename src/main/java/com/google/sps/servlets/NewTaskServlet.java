package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.KeyFactory;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.jsoup.safety.Whitelist;


// Servlet that creates new tasks(entities that will store info)

@WebServlet("/new-task")
public class NewTaskServlet extends HttpServlet {

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String description = Jsoup.clean(request.getParameter("description"), Safelist.none());
        //String location = Jsoup.clean(request.getParameter("location"), Safelist.none()); 
        String image = request.getParameter("image");
        
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("Task");
        FullEntity taskEntity =
            Entity.newBuilder(keyFactory.newKey())
            .set("description", description)
            //.set("location", location)
            .set("image", image)
            .build();
        datastore.put(taskEntity);
    }
    
}
