const $ = require('jquery');

module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
        .then(response => response.json());
  },
  addMovie: () => {
    const userMovie = {title: $('#title').val(), rating: $('#rating').val()};
    const url = '/api/movies';
    console.log('success');

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

  editMovie: (id) => {
    fetch('/api/movies')
        .then(data => {return data.json()
        }).then(data2 => {
      var newTitle = data2[id].title;
      console.log(newTitle);

      console.log(newTitle);
      const userMovie = {title: newTitle, rating: $('#ratingEdit').val()};
      const url = `/api/movies/${id}`;
      console.log('success');

      const options = {
        method: 'Put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMovie),
      };

      fetch(url, options)
          .then(/* post was created successfully */)
          .catch(/* handle errors */);
    });

  },
  refresh: (movies) => {
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {
      console.log(`id#${id} - ${title} - rating: ${rating}`);
      $('#movies').append(
          `<li>id#${id} - ${title} - rating: ${rating}</li>`
      )
    })
  }
};

