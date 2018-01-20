// Create canvas container for game
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 1024;
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

// Initialize obstacle image
var obstacleIsReady = false;
var obstacleImg = new Image();
obstacleImg.onload = function () {
    obstacleIsReady = true;
};
obstacleImg.src = "images/brick.png";

// Initialize game objects
var truck = {
    width: 256,
    height: 256,
    speed: 256,
    x: 0,
    y: 0,
    lane: 0
};
var obstacle = {
    width: 256,
    height: 256,
    speed: 256,
    x: 1024,
    y: 0,
    lane: 0
};
var obstacles_dodged = 0;
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
    obstacle.x = canvas.width;
    obstacle.lane = Math.floor((Math.random() * 10) % 4)
    obstacle.y = obstacle.lane * 256;
    running = true;
};

// Update game objects
var update = function (time_modifier) {
    // Update truck position
    if (38 in keysDown) {           // Up
        if (truck.y >= 0 && truck.lane >= 0) {
            truck.y -= truck.speed;
            truck.lane -= 1;
        }
    }
    if (40 in keysDown) {           // Down
        if (truck.y <= 1024 && truck.lane <= 3) {
            truck.y += truck.speed;
            truck.lane += 1;
        }
    }
    //if (37 in keysDown) {           // Left
    //    truck.x -= truck.speed * time_modifier;
    //}
    //if (39 in keysDown) {           // Right
    //    truck.x += truck.speed * time_modifier;
    //}

    // Update obstacle position
    if (0 > obstacle.x + obstacle.width) {
        obstacle.x = canvas.width;
        obstacle.y = Math.floor((Math.random() * 10) % 4) * 256;
        ++obstacles_dodged;
    }
    else {
        obstacle.x -= obstacle.speed * time_modifier;
    }

    // Check end game conditions
    if ((truck.lane == obstacle.lane) && (obstacle.x < truck.width)) {
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
    if (obstacleIsReady) {
        context.drawImage(obstacleImg, obstacle.x, obstacle.y);
    }

    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("obstacles dodged: " + obstacles_dodged, 32, 32);
};

var gameover = function() {
    context.textAlign = "center";
    context.textBaseline = "center";
    context.fillText("GAME OVER\n Score: " + obstacles_dodged, 64, 64);
};

// Main game looped via requestAnimationFrame()
var main = function () {
    var now = Date.now();
    var delta_time = now - then;

    if (running == true) {
        update(delta_time / 1000);
        render();
    }
    else {
        gameover();
    }
    then = now;

    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame
                        || w.webkitRequestAnimationFrame
                        || w.msRequestAnimationFrame
                        || w.mozRequestAnimationFrame;

var then = Date.now();
init();
main();
