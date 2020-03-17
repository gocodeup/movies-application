const $ = require('jquery');

module.exports = {
    getMovies: () => {


        return fetch('/api/movies')
            .then(response => response.json());
    },
    addMovie: (rate) => {
        const userMovie = {title: $('#title').val(), rating: rate, description: $('#description').val()};
        const url = '/api/movies';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userMovie),
        };
        fetch(url, options)
            .then(/* post was created successfully */)
            .catch(/* handle errors */);
    },


    editMovie: (id, body) => {
        return fetch(`api/movies/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => console.log(response))
    },

    // editMovie: (id) => {
    //   fetch('/api/movies')
    //   const userMovie = {rating: $('#ratingEdit').val()};
    //   const url = `/api/movies/${id}`;
    //   console.log('success');
    //
    //   const options = {
    //     method: 'Patch',
    //     headers: {
    //       'Content-Type': 'application/json',
    //
    //     },
    //     body: JSON.stringify(userMovie),
    //   };
    //   fetch(url, options)
    //       .then(/* post was created successfully */)
    //       .catch(/* handle errors */);
    // },

    // editMovie: (id) => {
    //     fetch('/api/movies')
    //         .then(data => {
    //             return data.json()
    //         }).then(data2 => {
    //         var newTitle = data2[id].title;
    //         console.log(newTitle);
    //
    //         console.log(newTitle);
    //         const userMovie = {title: newTitle, rating: $('#ratingEdit').val()};
    //         const url = `/api/movies/${id}`;
    //         console.log('success');
    //
    //         const options = {
    //             method: 'Patch',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(userMovie),
    //         };
    //
    //         fetch(url, options)
    //             .then(/* post was created successfully */)
    //             .catch(/* handle errors */);
    //     });
    //
    // },
    deleteMovie: (id) => {
        return fetch(`api/movies/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json());
    },
    // refresh: (movies) => {
    //
    //     console.log('Here are all the movies:');
    //     $('#movies').html('');
    //     movies.forEach(({title, rating, id}) => {
    //         console.log(`id#${id} - ${title} - rating: ${rating}`);
    //
    //         $('#movies').append(
    //             `<li>id#${id} - ${title} - rating: ${rating}</li>` +
    //             `<button value="${id}" type="submit" class="deleteButton">delete</button>`)
    //
    //     });
    //     $('li').click(function () {
    //         console.log('hi there');
    //         $(this).toggleClass('highlighted')
    //     });
    //
    //   $('.deleteButton').click(function (e) {
    //     e.preventDefault();
    //     deleteMovie($(this).val());
    //     getMovies().then((movies)=>refresh(movies));
    //     console.log('click')
    //   });
    //     // $('li').css('color', 'yellow');
    // }
};

