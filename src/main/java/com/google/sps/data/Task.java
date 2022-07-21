package com.google.sps.data;

// Item class for datastore
public final class Task {
  private final long id;
  private final String description;
  //private final String location;
  private final String image;
  public Task(long id, String description, String image){
      this.id = id;
      this.description = description;
      //this.location = location;
      this.image = image;
  }
  public String getDescription(){
      return description;
  }
  public String getImage(){
    return image;
}
}
