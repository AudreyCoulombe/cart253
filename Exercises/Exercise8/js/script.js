"use strict";

/*****************

Project 3
Audrey Coulombe

A generative and interactive art software where shapes are displayed in spiral.
User can change the width and height of the shape by moving the mouse on the screen.
RGB colors can be changed with the keys "Z", "X" and "C".
Click one time to begin your creation and a second time to stop the animation and contemplate your artwork.
******************/

// Class for the shapes
let circle;
let spray;
// Array to store the shapes
let movingShapes = [];
// Initial states of the game
let animationStarted = false;
let creationDone = false;

// setup()
// Creates objects for the shapes put it in the movingShapes array
// Creates a canvas and translate its origin to the center
// Fills the background with black
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
  createCanvas(1000, 700, WEBGL);
  // And put its origin to the center of the canvas
  translate(width / 2, height / 2);
  // Draw a black background
  background(0);
}

// draw()
// Once user have clicked, displays the shapes in spiral and handles inputs
// Stops the loop when user clicks a second time
function draw() {
  // If the animation is strated...
  if (animationStarted) {
    // display the spiral movement and change color for all my moving shapes
    for (let i = 0; i < movingShapes.length; i++) {
        movingShapes[i].displaySpiral();
        movingShapes[i].changeColor();
    }
    if (keyIsDown(13)) {
      spray.displayShape();
    }
    else {
      circle.displayShape();
    }
  }
}

// mousePressed()
// When we click a first time, animation starts
// When we click a second time, animation stops
function mousePressed() {
  // If the animation has not started and you click...
  if (!animationStarted) {
    // Change the state so that the animation starts
    animationStarted = true;
    loop();
  }
  // If the animation has started and you click...
  else if (animationStarted) {
    // Stop the loop and change the state
    noLoop();
    creationDone = true;
  }
}
