"use strict";

// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

////////////////////
// 10 ERRORS IN HERE
////////////////////

// Our predator
let tiger;

// The three prey
let antelope; // Fixed: (typo) it was written «antelop» instead of «antelope»
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
//Fixed: a space was missing between function and setup()
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40); //Fixed: there was an extra coma in the arguments
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60); // Fixed: there was a missing value in the arguments
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0); // Fixed: (typo) background was missing a «d» at the end

  // Handle input for the tiger
  tiger.handleInput(); // Fixed: we couldn't move the tiger with the arrows because the handleInput() function hadn't been called in draw()
  // Move all the "animals"
  tiger.move();
  antelope.move();
  zebra.move();
  bee.move(); // Fixed: the bee wasn't moving because the function move() hadn't been called for it

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  antelope.display(); // Fixed: (typo) it was written antelop instead of antelope
  zebra.display(); // Fixed: (typo) it was written disploy instead of display
  bee.display(); // Fixed: (typo) it was written b instead of bee
}
