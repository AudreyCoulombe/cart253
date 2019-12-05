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

// Position of the spiral option in the menu
let spiralOption = {
  leftX: 11,
  rightX: 177,
  topY: 156,
  bottomY: 313
}
// Position of the drops option in the menu
let dropsOption = {
  topY: 366,
  bottomY: 522
}

let ellipticShapesOption = {
  topY: 569,
  bottomY: 726
}

// preload()
// Preload images and sounds
function preload() {
  // Load images for the menu and instuctions
  menuImage = loadImage("assets/images/optionsMenu.png");
  startPageImage = loadImage("assets/images/startPage.png");
  spiralInstructionsImage = loadImage("assets/images/spiralInstructionsMenu.png");
  dropsInstructionsImage = loadImage("assets/images/dropsInstructionsMenu.png");
  ellipticShapesInstructionsImage = loadImage("assets/images/ellipticShapesInstructionsMenu.png");
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
  ellipticShapes = new EllipticShapes();
  // Create the canvas...
  createCanvas(1400, 750);
  // Draw a black background
  background(0);
}

// draw()
// Shows the start page, the menu and animes the shapes.
function draw() {
  //console.log("X: " + mouseX + ", Y: " + mouseY);
  // If state is title, display the start page
  if (state === "TITLE") {
    displayTitlePage();
  }
  // Else do all these things and draw the menu image over it
  else {
    // If state is Drawing, show the menu
    if (state === "DRAWING") {
      image(menuImage, 0, 0, width, height);
    }
    // If the state is Spiral...
    else if (state === "SPIRAL") {
      // Move the shapes in spiral and handle inputs to change color
      for (let i = 0; i < movingShapes.length; i++) {
        movingShapes[i].displaySpiral();
        movingShapes[i].changeColor();
      }
      // If the space bar is down, display the shape as a spray
      if (keyIsDown(32)) {
        spray.displayShape();
      }
      // If the space bar is not down, display the shape as a regular ellipse
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
          let drop = new Drop;
          drops.push(drop);
          drops[i].displayShape();
        }
        // Change state so drops move and are no longer displayed
        dropsMoving = true;
      }
      // If the drops are displayed and ready to move...
      else if (dropsMoving === true) {
        // Move all of them
        for (let i = 0; i < drops.length; i++) {
          drops[i].moveDrop();
        }
      }
      // Display the instructions over the drawing
      image(dropsInstructionsImage, 0, 0, width, height);
    }
    // If the state is elliptic shapes...
    else if (state === "ELLIPTICSHAPES") {
        // Display the shapes
        ellipticShapes.displayShapes();
        // Display the instructions over the drawing
        image(ellipticShapesInstructionsImage, 0, 0, width, height);
    }
  }
}

// mousePressed()
// Passes from start page to the menu, handles which option is clicked in the menu to start and pause animation
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
      // And if you click in the same Y range as the spiral option, change state to "spiral" and run the animation
      if (mouseY > spiralOption.topY && mouseY < spiralOption.bottomY) {
        loop(); // Start the loop
        state = "SPIRAL";
      }
      // Or if you click in the same Y range as the drops option, change state to "drops" and run the animation
      else if (mouseY > dropsOption.topY && mouseY < dropsOption.bottomY) {
        loop(); // Start the loop
        state = "DROPS";
      }
      else if (mouseY > ellipticShapesOption.topY && mouseY < ellipticShapesOption.bottomY) {
        loop();
        state = "ELLIPTICSHAPES";
      }
    }
  }
  // If the state is either "spiral" or "drops", pause the animation and change state to "drawing"
  else if (state === "SPIRAL" || state === "DROPS" || state === "ELLIPTICSHAPES") {
    noLoop(); // Stop the loop
    state = "DRAWING";
  }
}

// displayTitlePage()
// Displays the start page as an image
function displayTitlePage() {
  image(startPageImage, 0, 0, width, height);
}
