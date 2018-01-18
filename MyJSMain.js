"use strict";
var slideIndex = 1;

// Scroll to top on To-Top button click
function toTopFunction() {
    document.body.scrollTop = 0;
}

$(document).ready(function() {
    // Toggle fading of To-Top button if not at max height
    $(window).scroll(function() {
    if ($(window).scrollTop() == 0) {
        $(".tb_h1").slideDown();
        $(".top_btn").fadeOut();
    }
    else {
        $(".tb_h1").slideUp();
        $(".top_btn").fadeIn();
    }
    });
});