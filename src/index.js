"use strict";

/**
 * es6 modules and imports
 */

const $ = require('jquery');

import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {

    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


const API = require('./api');

API.createLists();

console.log(API.createLists());




  $('#load_message').html('loading...');
  console.log('movie time!');


// (function() {
//   var restHtml = "";
//
//   $.ajax("data/blog.json")
//       .done(function(blogPosts){
//
//         $("#load-message").empty();
//
//         // var pillsHTML;
//
//         blogPosts.forEach(function(blogPost){
//           pillsHTML = "";
//           blogPost.categories.forEach(function(category){
//
//             pillsHTML += "<span class=\"badge badge-pill badge-primary\">"+category+"</span>\n";
//
//           });
//           restHtml = " <div class=\"card\">\n" +
//               "        <img src=\"https://via.placeholder.com/250\" class=\"card-img-top\" alt=\"https://via.placeholder.com/250\">\n" +
//               "        <div class=\"card-body\">\n" +
//               "            <h5 class=\"card-title\">"+blogPost.title+"</h5>\n" +
//               "            <p class=\"card-text\">"+blogPost.content+"</p>\n" +
//               "            <p class=\"card-text\"><small class=\"text-muted\">"+blogPost.date+"</small></p>\n" + pillsHTML +
//               "        </div>\n" +
//               "    </div>";
//           $("#posts").append(restHtml);

//         });
//       })
//       .fail(function(errors){
//         console.error(errors);
//       });
//
// })();
