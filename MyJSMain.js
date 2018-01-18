"use strict";
var slideIndex = 0;

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


function slideCount(n) {
    slideIndex = slideIndex + n;
    var slides = document.getElementsByClassName("slides");
    if (slideIndex >= slides.length) {slideIndex = 0}
    else if(slideIndex < 0) {slideIndex = 1}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}
