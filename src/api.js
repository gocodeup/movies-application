module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json())
  },
    getMovie: () => {
      return fetch('/api/movies')
          .then(response => response.json())
          .then(response => console.log(response[1]));
    },
    postMovie: (data) => {
        return fetch("/api/movies",{
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                console.log(response.json());
            });
    },
    patchMovie: (data, id) => {
    fetch(`/api/movies/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            console.log(response.json());
        })
  }
};
