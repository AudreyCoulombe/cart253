"use strict";

/*****************

Project 3
Audrey Coulombe

A generative and interactive art software where shapes are displayed in spiral.
User can change the width and height of the shape by moving the mouse on the screen.
RGB colors can be changed with the keys "Z", "X" and "C".
Click one time to begin your creation and a second time to stop the animation and contemplate your artwork.
******************/

// Class that displays the shapes in spiral
let spiralMovement;
// Initial states of the game
let animationStarted = false;
let creationDone = false;

// setup()
// Creates an object for the spiral
// Creates a canvas and translate its origin to the center
// Fills the background with black
function setup() {
  spiralMovement = new SpiralMovement();
  createCanvas(1000, 700, WEBGL);
  translate(width / 2, height / 2);
  background(0);
}

// draw()
// Once user have clicked, displays the shapes in spiral and handles inputs
// Stops the loop when user clicks a second time
function draw() {
  // If the animation has not started yet...
  if (animationStarted) {
    // Display the spiral
    spiralMovement.displaySpiral();
    // And handle inputs
    spiralMovement.changeColor();
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
