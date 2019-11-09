// Boost
//
// A class that represents a boost.
// When the predator overlaps it, it gives him max health for 5 seconds

class Boost {
  // constructor()
  // Sets the initial values for the Boost's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, width, height, speed, boostImage) {
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
    // Display properties
    this.boostImage = boostImage;
    this.width = width;
    this.height = height;
    // Time properties for when you get a boost
    this.boostTime = 0;
    this.timeZero = 0;
  }

  // move()
  // Sets velocity based on the noise() function and the Boost's speed
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
  // Checks if the boost has gone off the canvas and
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
  // Draw the boost as an image
  display() {
    push();
    imageMode(CENTER);
    image(this.boostImage, this.x, this.y, this.width, this.height);
    pop();
  }

  // checkPredatorCollision()
  // Verifies if the boost and the predator have touched
  // If so, the predator will have max health for 5 seconds (5000 milliseconds)
  checkPredatorCollision(predator) {
    // Calculate distance between the X positions of the boost and predator
    let distanceX = dist(this.x, 0, predator.x, 0);
    // Calculate distance between the Y positions of the boost and predator
    let distanceY = dist(0, this.y, 0, predator.y);
    // Checks if they overlap
    if (distanceX < predator.radius + this.width / 2 && distanceY < predator.radius + this.height / 2) {
      // If so, set time zero to the actual time
      this.timeZero = millis();
      //change the state to «boosting»
      boosting = true;
      // Set the boost time to 5 seconds (5000 milliseconds)
      this.boostTime = 5000;
      // Write on the console when they overlap
      console.log("boost and predator collision");
    }
    // If the state is boosting...
    if (boosting) {
      // And if the 5 seconds have not passed yet
      if (millis() < this.boostTime + this.timeZero) {
        // Make the predator health its max health
        predator.health = predator.maxHealth;
        // if the 5 seconds have passed
      }
      else {
        // Change the boosting state to false
        boosting = false;
      }
    }
  }
}
