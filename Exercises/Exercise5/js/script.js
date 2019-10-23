// Predator-Prey Simulation
// by Audrey Coulombe
//
// Creates two predators and three prey (of different sizes and speeds)
// The predators chase the preys and consume them using the A,W,S,D,F and the arrows with the shift keys.
// The predators loose health over time, so must keep eating to survive.

// Our predators
let tiger;
let lion;

// The three prey
let antelope;
let zebra;
let bee;

// Images for predators and preys
let tigerImage;
let lionImage;
let antelopeImage;
let zebraImage;
let beeImage;

// preload()
//
// Preloads the images for predators and preys
function preload() {
  tigerImage = loadImage("assets/images/tigerPredator.png");
  lionImage = loadImage("assets/images/lionPredator.png");
  antelopeImage = loadImage("assets/images/antelopePrey.png");
  zebraImage = loadImage("assets/images/zebraPrey.png");
  beeImage = loadImage("assets/images/beePrey.png");
}

// setup()
//
// Sets up a canvas
// Creates objects for two predators and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(width - 100, 100, 5, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16);
  lion = new Predator(100, 100, 5, 40, 87, 83, 65, 68, 70);
  antelope = new Prey(100, 100, 10, 50);
  zebra = new Prey(100, 100, 8, 60);
  bee = new Prey(100, 100, 20, 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  // Handle input for the predators
  tiger.handleInput();
  lion.handleInput();

  // Move all the "animals"
  tiger.move();
  lion.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Handle the lion eating any of the prey
  lion.handleEating(antelope);
  lion.handleEating(zebra);
  lion.handleEating(bee);

  // Display all the "animals" and the score of each predator
  tiger.display(tigerImage, "Tiger: ", width - 100, 50); //values in parenthesis are respectively: (predatorName, textX, textY)
  lion.display(lionImage, "Lion: ", 100, 50); //values in parenthesis are respectively: (predatorName, textX, textY)
  antelope.display(antelopeImage);
  zebra.display(zebraImage);
  bee.display(beeImage);
}
