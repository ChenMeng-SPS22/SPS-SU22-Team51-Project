package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.gson.Gson;
import com.google.sps.data.Task;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

// Servlet for showing tasks
@WebServlet("/show-task")
public class ShowTaskServlet extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
        String associated_image = request.getParameter("image");
        Query<Entity> query =
            Query.newEntityQueryBuilder().setKind("Task").setFilter(PropertyFilter.eq("image", associated_image)).build();
        QueryResults<Entity> results = datastore.run(query);
        List<Task> tasks = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();
            String image = entity.getString("image");
            long id = entity.getKey().getId();
            String description = entity.getString("description");
            //String location = entity.getString("location");
            Task task = new Task(id, description, image); // Add Location here and in Task.java
            tasks.add(task);
        }

    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(tasks));
  }
}
