// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Prey {

  // constructor()
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, preyImage) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
    this.preyImage = preyImage;
    // Keeping track of the number of times this prey has been eaten
    this.numberOfDeath = 0;
  }

  // move()
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = map(noise(this.tx), 0, 1, -this.speed, this.speed);
    this.vy = map(noise(this.ty), 0, 1, -this.speed, this.speed);
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.01;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping()
  // Checks if the prey has gone off the canvas and
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

  // display()
  // Draw the prey as an image
  // with a radius the same size as its current health.
  display() {
    this.radius = this.health;
    if (this.radius > 0) {
      push();
      imageMode(CENTER);
      image(this.preyImage, this.x, this.y, this.radius * 2, this.radius * 2);
      pop();
      this.displayHealthBar();
    }
  }

  // reset()
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }

  // displayHealthBar()
  //diplay the preys's health on a visual bar
  displayHealthBar() {
    let healthValue;
    //map the preys's health with the width of the bar
    healthValue = map(this.health, 0, this.maxHealth, 0, 50);
    //setup the bar visuals
    fill(255, 0, 0);
    rect(this.x - 25, this.y - this.radius - 15, 50, 10);
    //display health loss on a red bar
    fill(0, 255, 0);
    rect(this.x - 25, this.y - this.radius - 15, healthValue, 10);
  }
}
