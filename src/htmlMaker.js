module.exports = {
    makeHTML: (title, rating, id) => {
        let html = `<div>`;
        html += `<h1>${title}</h1>`;
        html += `<h2>${rating}</h2>`;
        html += `<h3>${id}</h3>`;
        html += `</div>`;
        return html;
    }
};

// module.exports.newBinding = makeHTML();

// export default {makeHTML}