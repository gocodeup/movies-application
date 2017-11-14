module.exports = {
    getMovies: () => {
        return fetch('/api/movies')
            .then(response => response.json());
            // .then(data => fillHTML());
    }
};



// movies.forEach(function (movie) {
//     var moviesHTML = "";
//
//     moviesHTML += "<div class='row col-sm-offset-2 col-sm-8'>
//     moviesHTML += "<div class='row col-sm-4'>"Movie"</div>";
//     moviesHTML += "<div class='row col-sm-4'>"ID"</div>";
//     moviesHTML += "<div class='row col-sm-4'>"Rating"</div>";
//     moviesHTML += "<div class='row col-sm-4'>" + movie.title + "</div>";
//     moviesHTML += "<div class='row col-sm-4'>" + movie.id + "</div>";
//     moviesHTML += "<div class='row col-sm-4'>" + movie.rating + "</div>";
//     moviesHTML += "</div>"
//
//     $(".bodyHTML").html(moviesHTML);
//
// }
//
// fillHTML();




//
// table +=
// <tbody>
// <tr>
// <td class="id">${id}</td>
//     <td class="rating">${rating}</td>
//     <td class="title">${title}</td>
//     </tr>
//     </tboday>