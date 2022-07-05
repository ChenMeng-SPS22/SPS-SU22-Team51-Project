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


  const image_classes =
      [ 'gallery__item--1',
      'gallery__item--2' ,'gallery__item--3', 'gallery__item--4', 'gallery__item--5', 'gallery__item--6',
      'gallery__item--7' ,'gallery__item--8', 'gallery__item--9', 'gallery__item--10', 'gallery__item--11', 
      'gallery__item--12' ,'gallery__item--13', 'gallery__item--14', 'gallery__item--15', 'gallery__item--16'];

  // Pick a random greeting.
  // const classes = image_classes[Math.floor(Math.random() * greetings.length)];
  
  var num = 0;

  // if(num != 0){
  //   if(current_class == classes){

  //   }
  // }


  // Add it to the page.
  //const classContainer = document.getElementById('greeting-container');
  //greetingContainer.innerText = greeting;



  // creating an img element and assinging it the link of the last upload image
  var img = document.createElement('figure');
  // adding image class to img element
  img.classList.add('gallery__item', image_classes[num]);
  num += 1;
  img.src = images[imageslength-1];

  // putting the image back to the webpage
  image_container.appendChild(img);

}
