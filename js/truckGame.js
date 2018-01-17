// Create canvas container for game
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 768;
document.body.appendChild(canvas);

// Initialize background image
var bgIsReady = false;
var bgImg = new Image();
bgImg.onload = function () {
    bgIsReady = true;
};
bgImg.src = "images/racing_background.png";

// Initialize truck image
var truckIsReady = false;
var truckImg = new Image();
truckImg.onload = function () {
    truckIsReady = true;
};
truckImg.src = "images/truck.png";

// Initialize obsticle image
var obsticleIsReady = false;
var obsticleImg = new Image();
obsticleImg.onload = function () {
    obsticleIsReady = true;
};
obsticleImg.src = "images/brick.png";

// Initialize game objects
var truck = {
    width: 256,
    height: 256,
    speed: 256,
    x: 0,
    y: 0
};
var obsticle = {
    width: 256,
    height: 256,
    speed: 256,
    x: 1024,
    y: 0
};
var obsticles_dodged = 0;
var running = false;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function(e) {
    keysDown[e.keyCode] = true;
});

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
});

// Initialize game
var init = function () {
    obsticle.x = canvas.width;
    obsticle.y = Math.floor((Math.random() * 10) % 4) * 256;
    running = true;
};

// Update game objects
var update = function (time_modifier) {
    // Update truck position
    if (38 in keysDown) {           // Up
        truck.y -= truck.speed * time_modifier;
    }
    if (40 in keysDown) {           // Down
        truck.y += truck.speed * time_modifier;
    }
    if (37 in keysDown) {           // Left
        truck.x -= truck.speed * time_modifier;
    }
    if (39 in keysDown) {           // Right
        truck.x += truck.speed * time_modifier;
    }

    // Update obsticle position
    if (0 > obsticle.x + 200) {
        obsticle.x = canvas.width;
        obsticle.y = Math.floor((Math.random() * 10) % 4) * 256;
        ++obsticles_dodged;
    }
    else {
        obsticle.x -= obsticle.speed * time_modifier;
    }

    // Check end game conditions
    if (
        truck.x <= (obsticle.x + obsticle.width)
        && obsticle.x <= (truck.x + truck.width)
        && truck.y <= (obsticle.y + obsticle.height)
        && obsticle <= (truck.y + truck.height)
    ) {
        running = false;
    }
};

// Draw output
var render = function () {
    if (bgIsReady) {
        context.drawImage(bgImg, 0, 0);
    }
    if (truckIsReady) {
        context.drawImage(truckImg, truck.x, truck.y);
    }
    if (obsticleIsReady) {
        context.drawImage(obsticleImg, obsticle.x, obsticle.y);
    }

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Obsticles dodged: " + obsticles_dodged, 32, 32);
};

var gameover = function() {
    context.textAlign = "center";
    context.textBaseline = "center";
    context.fillText("GAME OVER\n Score: " + obsticles_dodged);
};

// Main game looped via requestAnimationFrame()
var main = function () {
    var now = Date.now();
    var delta_time = now - then;

    while (running == true) {
        update(delta_time / 1000);
        render();
    }



    gameover();

    then = now;

    // requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame
                        || w.webkitRequestAnimationFrame
                        || w.msRequestAnimationFrame
                        || w.mozRequestAnimationFrame;

var then = Date.now();
init();
main();
