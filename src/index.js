/**
 * es6 modules and imports
 */
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
    // let html = '<ul>';
    // for(let user of users){
    // }	          }
    // html += '</ul>';
    // document.body.innerHTML = html;
    $(document).ready(function(){
      console.log('doc is ready');
      $("#loading").hide();
    let html = '<table>';
    for(const movie of movies){
      html += `<thead><tr><th colspan="3"> Movie info</th></tr></thead>` +
          `<tbody><tr>
            <td>NAME</td>
            <td>ID</td>
            <td>RATING</td>
            </tr></tbody>`;

    }
    html += `</table>`;
    $('body').append(html);



  })});
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
