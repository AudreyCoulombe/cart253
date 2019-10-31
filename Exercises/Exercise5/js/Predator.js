// Predator
//
// A class that represents a simple predator
// controlled by the A,W,S,D,F and the arrows with the shift keys.
// It can move around the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, sprintKey,predatorImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.predatorImage = predatorImage;
    // Input properties are used as arguments
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;
    //keeping track of the score property
    this.numberOfPreyEaten = 0;
  }

  // handleInput
  //
  // Checks if a key is pressed and sets the predator's velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
    // Sprinting speed
    if (keyIsDown(this.sprintKey)) {
      this.speed += 2;
    } else {
      this.speed = 5;
    }
  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 0, this.maxHealth);
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.
  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;
      // Check if the prey died. If so, resets it and change the score
      if (prey.health < 0) {
        prey.reset();
        // Change the score when a prey is fully eaten and display it on the console
        this.numberOfPreyEaten += 1;
        console.log("Number of prey eaten:" + this.numberOfPreyEaten);
      }
    }
  }

  // display
  //
  // Draw the predators as images with a size corresponding to its current health.
  //displays the number of prey eaten
  display(predatorName, textX, textY) {
    this.radius = this.health;
    // If the predator is not dead, draw it as an image
    if (this.radius > 0) {
      image(this.predatorImage, this.x, this.y, this.radius * 2, this.radius * 2);
    }
    push();
    // Set up the font & display text from the center
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255);
    // Display the score
    text(predatorName + this.numberOfPreyEaten, textX, textY);
    pop();
  }
}
