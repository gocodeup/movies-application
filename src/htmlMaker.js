module.exports = {
    makeHTML: (title, rating, id) => {
        let html = `<div class="col">`;
        html += `<h1>${title}</h1>`;
        html += `<h2>${rating}</h2>`;
        html += `<button class="editMovie" id="${id}">Edit</button>`;
        html += `<button class="deleteMovie" id="${id}">Delete</button>`;
        html += `</div>`;
        return html;
    }
};

// module.exports.newBinding = makeHTML();

// export default {makeHTML}

export const buildHTML = (title, rating, id) => {
    let html = `<div class="card carousel-item">`;
    html += `<img class="card-img-top" src="img/fancycrave-440143-unsplash.jpg">`;
    html += `<div class="card-body">`;
    html += `<h4 class="card-title"> ${title} </h4>`;
    html += `<p class="card-text"> Rated: ${rating}</p>`;
    html += `<button class="deleteBtn" id="${id}"> Delete </button>`;
    html += `<button class="editBtn" id="${id}"> Edit </button>`;
    html += `</div>`;
    html += `</div>`;
    return html;
};