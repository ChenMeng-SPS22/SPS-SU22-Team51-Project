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
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;

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


window.addEventListener('scroll', highlightMenu)
window.addEventListener('click', highlightMenu)

menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)


// To put the uploaded images back in the webpage
async function image_upload() {
  //const uploaded_images = await fetch('/list-images');


  const uploaded_images = await fetch('/list-images' , {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });


  const images = await uploaded_images.json();

  //Puts them in a container (need to adjust images inside of it using css)
  const dashboard = document.getElementById('main__img--container'); 
  dashboard.innerText = "";
  dashboard.innerHTML = images;
}
