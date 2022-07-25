package com.google.sps.servlets;

import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.sps.data.Task;


/** Shows all of the images uploaded to Cloud Storage. */
@WebServlet("/list-images")
public class ListImagesServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Get images from dataStore with descriptions
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Query<Entity> query =
        Query.newEntityQueryBuilder().setKind("Task").build();
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
    /* List all of the uploaded files.
    String projectId = "summer22-sps-51";
    String bucketName = "summer22-sps-51.appspot.com";
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    Bucket bucket = storage.get(bucketName);
    Page<Blob> blobs = bucket.list();


   
    

    
    */
    
     // List to store all the img html tag of the stored images
    List<String> images_html = new ArrayList<String>();
    var num = 0;
    // Adding cloud storage images as <img> html element to the list 
    for(Task task : tasks){
        num++;
        String imgTag = 
        String.format("<figure class= \"gallery__img gallery__img--%s\" title=\"%s\" onclick= \"changeDescription(\'%s\', this.title);\">" + 
        "<a style=“border-style:hidden; background: #528592” href=\"#popup1\"> <img src=\"%s\" alt=\"Gallery image %s\" class=\"gallery__img\"> </a>" +
        "</figure>",
         num, task.getDescription(),task.getImage(), task.getImage(), num);
        images_html.add(imgTag);
        if(num > 16){
            num = 0;
        }
    }

    // converting the list to json using gson
    String images_json = convertToJsonUsingGson(images_html);

    // Output images as list of json <img> elements as HTML.
    response.setContentType("application/json;");
    response.getWriter().println(images_json);
  }


  // convert to json using gson
  private String convertToJsonUsingGson(List<String> images_html) {

    Type listType = new TypeToken<List<String>>() {}.getType();

    Gson gson = new Gson();
    String json = gson.toJson(images_html, listType);

    return json;
  }
}