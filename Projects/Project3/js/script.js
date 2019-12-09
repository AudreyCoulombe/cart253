"use strict";

/*****************
Project 3
by Audrey Coulombe

Relax and Draw
A generative and interactive art software made to relax and just concentrate on a simple, beautiful thing.
User can either display shapes in spiral, display drops or elliptic shapes and change some properties like sound, color and/or size with different inputs.
******************/

// Initial states of the game
let state = "TITLE";
let dropsMoving = false;
// Classes & array for the shapes/drops
let circle;
let spray;
let movingShapes = [];
let drops = [];
let ellipticShapes;
// Images
let startPageImage;
let menuImage;
let spiralInstructionsImage;
let dropsInstructionsImage;
let ellipticShapesInstructionsImage;
// Sounds
let lofiSound;
let waveSound;
let inhaleSound;
let exhaleSound;
// Position of the spiral option in the menu
let spiralOption = {
  leftX: 11,
  rightX: 177,
  topY: 108,
  bottomY: 265
}
// Position of the drops option in the menu
let dropsOption = {
  topY: 280,
  bottomY: 437
}
// Position of the elliptic shapes option in the menu
let ellipticShapesOption = {
  topY: 452,
  bottomY: 608
}
// Position of the reset option in the menu
let resetOption = {
  topY: 622,
  bottomY: 740
}

// preload()
// Preloads images and sounds
function preload() {
  // Load images for the start page, menu and instuctions
  startPageImage = loadImage("assets/images/startPage.png");
  menuImage = loadImage("assets/images/optionsMenu.png");
  spiralInstructionsImage = loadImage("assets/images/spiralInstructionsMenu.png");
  dropsInstructionsImage = loadImage("assets/images/dropsInstructionsMenu.png");
  ellipticShapesInstructionsImage = loadImage("assets/images/ellipticShapesInstructionsMenu.png");
  lofiSound = loadSound("assets/sounds/relaxingLofi.mp3");
  waveSound = loadSound("assets/sounds/waves.mp3");
  inhaleSound = loadSound("assets/sounds/inhale.mp3");
  exhaleSound = loadSound("assets/sounds/exhale.mp3");
}

// setup()
// Creates objects for the different drawing options
// Creates a canvas and fills the background with black
function setup() {
  // Create a circle object...
  circle = new Ellipse(lofiSound);
  // And put it in the movingShapes array
  movingShapes.push(circle);
  // Create a spray object...
  spray = new Spray(lofiSound);
  // And put it in the movingShapes array
  movingShapes.push(spray);
  // Create an elliptic shapes object
  ellipticShapes = new EllipticShapes(inhaleSound, exhaleSound);
  // Create the canvas
  createCanvas(1400, 750);
  // Draw a black background
  background(0);
}

// draw()
// Shows the start page, the menu and instructions
// Animes shapes for the different drawing options
function draw() {
  // If state is Title, display the start page
  if (state === "TITLE") {
    displayTitlePage();
  }
  // If state is Drawing, show the menu
  else if (state === "DRAWING") {
    image(menuImage, 0, 0, width, height);
  }
  // If the state is Spiral...
  else if (state === "SPIRAL") {
    // Move the shapes in spiral and handle inputs to change color and sound
    for (let i = 0; i < movingShapes.length; i++) {
      movingShapes[i].displaySpiral();
      movingShapes[i].changeColor();
      movingShapes[i].changeSound();
    }
    // If the space bar is down, display the shape as a spray
    if (keyIsDown(32)) {
      spray.displayShape();
    }
    // If the space bar is not down, display the shape as an ellipse
    else {
      circle.displayShape();
    }
    // Display the instructions over the drawing
    image(spiralInstructionsImage, 0, 0, width, height);
  }
  // If the state is Drops...
  else if (state === "DROPS") {
    // And if the drops are not moving yet...
    if (dropsMoving === false) {
      // Create 3 drop objects, add them in the array and display them on screen
      for (let i = 0; i < 3; i++) {
        let drop = new Drop();
        drops.push(drop);
        drops[i].displayShape();
      }
      // Change state so drops move and are no longer displayed with initial values
      dropsMoving = true;
    }
    // If the drops are displayed and ready to move or already moving...
    else if (dropsMoving === true) {
      // Move all of them
      for (let i = 0; i < drops.length; i++) {
        drops[i].moveDrop();
      }
    }
    // Display the instructions over the drawing
    image(dropsInstructionsImage, 0, 0, width, height);
  }
  // If the state is Elliptic Shapes...
  else if (state === "ELLIPTICSHAPES") {
    // Display the shapes
    ellipticShapes.displayShapes();
    // Display the instructions over the drawing
    image(ellipticShapesInstructionsImage, 0, 0, width, height);
  }
}

// mousePressed()
// When mouse is pressed, passes from start page to the menu, handles which option is clicked in the menu to start and pause animations
function mousePressed() {
  // If we are on the start page...
  if (state === "TITLE") {
    // Draw a black background
    background(0);
    // Change the state so that the drawing option menu is displayed
    state = "DRAWING";
  }
  // If you click on an option in the menu, the animation of this option starts
  else if (state === "DRAWING") {
    // If you click in the same X range as the options in the menu (they all have same X postion)
    if (mouseX > spiralOption.leftX && mouseX < spiralOption.rightX) {
      // And if you click in the same Y range as the spiral option, run the animation in loop, change state to "spiral" and play the music in loop
      if (mouseY > spiralOption.topY && mouseY < spiralOption.bottomY) {
        loop(); // Start the loop
        state = "SPIRAL";
        lofiSound.loop();
      }
      // Or if you click in the same Y range as the drops option, run the animation, change state to "drops" and play sound in loop
      else if (mouseY > dropsOption.topY && mouseY < dropsOption.bottomY) {
        loop(); // Start the loop
        state = "DROPS";
        waveSound.loop();
      }
      // Or if you click in the same Y range as the elliptic shapes option, run the animation and change state to "elliptic shapes"
      else if (mouseY > ellipticShapesOption.topY && mouseY < ellipticShapesOption.bottomY) {
        loop();
        state = "ELLIPTICSHAPES";
      }
      // Or if you click in the same Y range as the reset option, reset the drawing and change state to "drawing"
      else if (mouseY > resetOption.topY && mouseY < resetOption.bottomY) {
        resetDrawing();
        state = "DRAWING";
      }
    }
  }
  // If the state is either "spiral", "drops" or "elliptic shapes", pause the loop, change state to "drawing" and stop the souds
  else if (state === "SPIRAL" || state === "DROPS" || state === "ELLIPTICSHAPES") {
    noLoop(); // Stop the loop
    state = "DRAWING";
    lofiSound.stop();
    waveSound.stop();
  }
}

// displayTitlePage()
// Displays the start page as an image
function displayTitlePage() {
  image(startPageImage, 0, 0, width, height);
}

// resetDrawing()
// Erases the drawing on screen
function resetDrawing() {
  // Draw a black background over the drawing to hide it
  background(0);
  // Display the menu image over it
  image(menuImage, 0, 0, width, height);
}
