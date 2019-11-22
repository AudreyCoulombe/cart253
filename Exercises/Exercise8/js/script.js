"use strict";

/*****************

Project 3
Audrey Coulombe

Art therapy
A generative and interactive art software made to relax and just concentrate on a simple, beautiful thing.
User can either display shapes in spiral, in drops or randomly.
******************/

// Initial states of the game
let state = "TITLE";
// Classes & array for the shapes
let circle;
let spray;
let movingShapes = [];
// Image fot the options menu
let menuImage;
// Position of the spiral option in the menu
let spiralOption = {
  leftX: 9,
  rightX: 188,
  topY: 170,
  bottomY: 322
}

// preload()
// Preload images and sounds
function preload() {
  // Load image for the menu
  menuImage = loadImage("assets/images/optionsMenu.png");
  //music = loadSound("assets/sounds/music.mp3");
}

// setup()
// Creates objects for the shapes put it in the movingShapes array
// Creates a canvas, fills the background with black and displays the menu as an image
function setup() {
  // Create a circle object...
  circle = new Ellipse();
  // And put it in the movingShapes array
  movingShapes.push(circle);
  // Create a spray object...
  spray = new Spray();
  // And put it in the movingShapes array
  movingShapes.push(spray);
  // Create the canvas...
  createCanvas(1500, 800);
  // Draw a black background
  background(0);
  // Display the menu image
  image(menuImage, 0, 0);
}

// draw()
// Shows the start page, the menu and animes the shapes.
function draw() {
  // If state is title, display the start page
  if (state === "TITLE") {
    displayTitlePage();
  }
  // If state is Drawing, show the menu
  else if (state === "DRAWING") {
    image(menuImage, 0, 0);
  }
  // If the state is Spiral...
  else if (state === "SPIRAL") {
    // Move the shapes in spiral and handle inputs to change color
    for (let i = 0; i < movingShapes.length; i++) {
      movingShapes[i].displaySpiral();
      movingShapes[i].changeColor();
    }
    // If the key "enter" is down, display the shape as a spray
    if (keyIsDown(13)) {
      spray.displayShape();
    }
    // If the key "enter" is not down, display the shape as a regular ellipse
    else {
      circle.displayShape();
    }
  }
  // Display the menu
  image(menuImage, 0, 0);
}

// mousePressed()
// Clicking changes states of the game so the software does what the user wants
// When we click a first time, twe pass from title state to drawing state
// When we click on an option in the menu, the animation begins
function mousePressed() {
  // If we are on the start page...
  if (state === "TITLE") {
    // Change the state so that the drawing option menu is displayed
    state = "DRAWING";
  }
  // If you click on an option in the menu, the animation of this option starts
  else if (state === "DRAWING") {
    // If the x position of the mouse is in the same range as the x position of the options...
    if (mouseX > spiralOption.leftX && mouseX < spiralOption.rightX) {
      // And if the y position of the mouse is in the same range as the y position of the spiral option, change state to "spiral"
      if (mouseY > spiralOption.topY && mouseY < spiralOption.bottomY) {
        state = "SPIRAL";
      }
      // Stop the loop and change the state
      //noLoop();
      // loop();
    }
  }
}

// displayTitlePage()
// Displays the start page as an image
function displayTitlePage() {
  console.log("Put start page here");
}
