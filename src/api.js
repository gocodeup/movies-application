module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  }
};

const blogPost = {title: '$()', rating: 'Are a fun way to use JS!'};
const url = '/api/movies';
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogPost),
};

fetch(url, options)
    .then(/* post was created successfully */)
    .catch(/* handle errors */);