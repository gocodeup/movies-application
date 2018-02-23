const $ = require('jquery');

const loadingGif = () => {
    $('.page-loader').html("<img src='./img/page-loader.gif' class='loader'>");
};

module.exports = loadingGif;
