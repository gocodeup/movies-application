"use strict";

/**
 * es6 modules and imports
 */

const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

// $('#load_message').html('loading...');

console.log('movie time!');


/**
 * require style imports
 */

const {getMovies} = require('./api.js');

let htmlBody = "<table>";

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  $("#main").empty();

  movies.forEach(({title, rating, id}) => {

    console.log(`id#${id} - ${title} - rating: ${rating}`);

    htmlBody += `<tr>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>id</th>
                </tr>
                <tr>
                    <td>${title}</td>
                    <td>${rating}</td>
                    <td>${id}</td>
                </tr>`


  });
  htmlBody += '</table>';
  $('#main').html(htmlBody);


}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});




