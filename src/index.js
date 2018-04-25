/**
 * This file is the "entrypoint" into your application
 */


import 'bootstrap'
let $ = require('jquery');
import getMovies from './api.js';
"use strict";

    $(document).ready(function() {
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");
    });

    // $(() => {
    //   $('[data-toggle="popover"]').popover()
    // });

    $('#movies').html('<p>' + {getMovies} + '</p>');

