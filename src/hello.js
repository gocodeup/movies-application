import {$} from './index'
export default () => $("body").prepend('<div id="preloader">Loading...</div>');
$(document).ready( () => {
    $("#preloader").remove();
});






