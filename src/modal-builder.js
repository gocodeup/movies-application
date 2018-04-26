export default (title, rating, id) =>

    `<div class="form-group">
        <label for="input">Edit Title</label>
<input type="text" class="form-control" id="input" aria-describedby="input"
placeholder="${title}">
    </div>
    <div class="form-group">
    <div class="rateYo" id="getRating" data-rating="${rating}"></div>
    <small>Rate movie</small>
</div>

<button type="button" class="btn btn-dark" id="editBåuilder ${id}">Edit</button>`