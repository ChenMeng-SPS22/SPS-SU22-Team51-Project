package com.google.sps.servlets;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.lang.reflect.Type;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Shows all of the images uploaded to Cloud Storage. */
@WebServlet("/list-images")
public class ListImagesServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // List all of the uploaded files.
    String projectId = "summer22-sps-51";
    String bucketName = "summer22-sps-51.appspot.com";
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    Bucket bucket = storage.get(bucketName);
    Page<Blob> blobs = bucket.list();


    // List to store all the img html tag of the stored images
    List<String> images_html = new ArrayList<String>();


    // Adding cloud storage images as <img> html element to the list 
    for(Blob blob : blobs.iterateAll()){
        String imgTag = String.format("<img src=\"%s\" alt=\"Gallery image\" class=\"gallery__img\">", blob.getMediaLink());
        //String imgTag =  blob.getMediaLink();
        images_html.add(imgTag);

        //<img src="assets/images/test8.jpg" alt="Gallery image 16" class="gallery__img">
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