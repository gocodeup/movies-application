

//------------module for creating cards---------------->
export default (title, rating, id) => `<div class="col-lg-4 mt-4"><div class=card><div class="thumbnail"><a id="${id}" class="close mr-2 mt-1" href="#">×</a>
    <div class=card-body>
         <h2>${title}</h2>
          <div class="rateYo" data-rating="${rating}"></div>
    </div></div>`;

