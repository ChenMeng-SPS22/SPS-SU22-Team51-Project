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

/**
 * Adds a random greeting to the page.
 */
// function addRandomGreeting() {
//   const greetings =
//       ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

//   // Pick a random greeting.
//   const greeting = greetings[Math.floor(Math.random() * greetings.length)];


//   // Add it to the page.
//   const greetingContainer = document.getElementById('greeting-container');
//   greetingContainer.innerText = greeting;
// }

// variables for hamburger menu
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

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


menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)

//   // Add it to the page.
//   const greetingContainer = document.getElementById('greeting-container');
//   greetingContainer.innerText = greeting;
// }



// To put the uploaded images back in the webpage
async function image_upload() {

  const uploaded_images = await fetch('/list-images', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(translateParameters)
  });
  const images = await uploaded_images.json();


  // code to add image back in the webpage
  const image_container = document.getElementsByClassName('main__img--container');

  // creating an img element and assinging it the link of the last upload image
  var img = document.createElement('img');
  img.src = images[imageslength-1];

  // putting the image back to the webpage
  image_container.appendChild(img);

}
