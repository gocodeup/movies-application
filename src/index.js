/**
 * This file is the "entrypoint" into your application
 */


import 'bootstrap'
let $ = require('jquery');
"use strict";
    $(window).load(function() {
        // Animate loader off screen
        $(".se-pre-con").fadeOut("slow");
    });

    $(() => {
      $('[data-toggle="popover"]').popover()
    })

