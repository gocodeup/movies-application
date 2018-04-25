let $ = require('jquery');
import 'bootstrap';
let omdbApi = require('omdb-client');

function test() {
    $('#search').on('click',  () => {

        $(".container").empty();

        let inputData = $('#input-box').val();
        let params = {
            apiKey: 'd294c676',
            query: inputData,
        };
        omdbApi.search(params, function(err, data) {


            let i = 0;
            data.Search.forEach(function(){

                let card  =

            `<div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${data.Search[i].Poster}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${data.Search[i].Title}</h5>
            <p class="card-text"> Year: ${data.Search[i].Year}</p>
            </div>
            </div>`;

                $(".container").append(card);

                i++;
            });
        })
    });
}

module.exports= test();