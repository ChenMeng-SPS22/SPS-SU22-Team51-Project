package com.google.sps.servlets;

import com.google.api.gax.paging.Page;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import java.io.IOException;
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
    String projectId = "sminga-sps-summer22";
    String bucketName = "sminga-sps-summer22.appspot.com";
    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    Bucket bucket = storage.get(bucketName);
    Page<Blob> blobs = bucket.list();

    // Output <img> elements as HTML. Would ideally be modified into json for later handling.
    response.setContentType("text/html;");
    for (Blob blob : blobs.iterateAll()) {
      String imgTag = String.format("<img src=\"%s\" />", blob.getMediaLink());
      response.getWriter().println(imgTag);
      response.getWriter().println("<br>");
    }
  }
}
/*Idea for js function, would be in a diff .js file. You can ignore this if you want to do it another way .
async function showImages(){
    const responseFromServer = await fetch('/list-images');
    const info = await responseFromServer.json();

    const dashboardContainer = document.getElementById('dashboardContainer');
    dashboardContainer.appendChild(Image1);
    dashboardContainer.appendChild(Image2);
    dashboardContainer.appendChild(Image..);
}
*/
