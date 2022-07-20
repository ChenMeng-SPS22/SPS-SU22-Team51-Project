// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


let map;
let editMarker;

// variables for hamburger menu
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo')

// Display the hamburger menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

//toggle the div of hamburger menu
menu.addEventListener('click', mobileMenu);


  // Add it to the page.
  // const greetingContainer = document.getElementById('greeting-container');
  // greetingContainer.innerText = greeting;

// close hamburger menu when click on item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active')

  if(window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active')
    menuLinks.classList.remove('active')
  }
}

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight')
  const homeMenu = document.querySelector('#home-page')
  const galleryMenu = document.querySelector('#gallery-page')
  const aboutMenu = document.querySelector('#about-page')
  let scrollPos = window.scrollY
  

  // Adds the 'highlight' class to menu items
  if(window.innerWidth > 960 && scrollPos < 700) {
    homeMenu.classList.add('highlight')
    galleryMenu.classList.remove('highlight')
    return
  }
  else if(window.innerWidth > 960 && scrollPos < 2250) {
    galleryMenu.classList.add('highlight')
    homeMenu.classList.remove('highlight')
    aboutMenu.classList.remove('highlight')
    return
  }
  else if(window.innerWidth > 960 && scrollPos < 4010) {
    aboutMenu.classList.add('highlight')
    galleryMenu.classList.remove('highlight')
    return
  }

  if((elem && window.innerWidth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight')
  }
}

// Load images on window load
window.onload = function() {
    image_upload();
}

window.addEventListener('scroll', highlightMenu)
window.addEventListener('click', highlightMenu)

menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)


// To put the uploaded images back in the webpage
async function image_upload() {
  const uploaded_images = await fetch('/list-images');
  const images = await uploaded_images.json();
  //Puts them in a container (need to adjust images inside of it using css)
  const dashboard = document.getElementById('main__img--container'); 
  dashboard.innerText = "";
  for (let index = 0; index < images.length; index++) {
    dashboard.innerHTML += images[index]; 
  }
}

function changeDescription(imgSrc, txt){
    const img = document.getElementById("imgPP");
    const description = document.getElementById("descriptionText");
    
    description.innerText = txt;
    img.src = imgSrc;
}




// Creats map an centers it base on users location
function createMap() {
  map = new google.maps.Map(
      document.getElementById('map'),
      // work on centering it where the user is located
      {center: {lat: 37.422, lng: -122.084}, zoom: 16, mapTypeId: "satellite",
    });


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }

    fetchMarkers();
}


/** Fetches markers from the backend and adds them to the map. */
function fetchMarkers() {
    fetch('/markers').then(response => response.json()).then((markers) => {
      markers.forEach(
          (marker) => {
              createMarkerForDisplay(marker.lat, marker.lng)});
    });
  }

/** Creates a marker that shows a read-only info window when clicked. */
function createMarkerForDisplay(lat, lng) {
    const marker =
        new google.maps.Marker({position: {lat: lat, lng: lng}, map: map});
  }
  
  /** Sends a marker to the backend for saving. */
  function postMarker() {

    navigator.geolocation.getCurrentPosition(function (position) {
        const params = new URLSearchParams();
        params.append('lat', position.coords.latitude);
        params.append('lng', position.coords.longitude);
      
        fetch('/markers', {method: 'POST', body: params});
        
    });

  }

