// Obstacle
// A class that represents an obstacle that moves horizontally a
// Makes the predator die when they touch

class Obstacle {

  // constructor()
  // Sets the initial values for the Obstacle's properties
  // Either sets default values or uses the arguments provided
  constructor(y, width, height, speed, obstacleImage) {
    // Position
    this.x = 0;
    this.y = y;
    // Speed & velocity in X
    this.speed = speed;
    this.vx = this.speed;
    // Width and height
    this.width = width;
    this.height = height;
    // Image
    this.obstacleImage = obstacleImage;
  }

  // move()
  // Moves based on the velocity and handles wrapping
  move() {
    // Moves the obstacle horizontally by adding velocity to its x position
    this.x += this.vx;
    // Handles wrapping
    this.handleWrapping();
  }

  // handleWrapping()
  // Checks if the obstacle has gone off the sides of the canvas
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left
    if (this.x < 0) {
      this.x += width;
    }
    // Off the right
    else if (this.x > width) {
      this.x -= width;
    }
  }

  // display()
  // Displays the obstacle as an image
  display() {
    push();
    imageMode(CENTER);
    image(this.obstacleImage, this.x, this.y, this.width, this.height);
    pop();
  }

  //checkPredatorCollision()
  // Verifies if the obstacle and the predator have touched
  // If so, predator dies (game is over)
  checkPredatorCollision(predator) {
    // Calculate distance between the X positions of the obstacle and predator
    let distanceX = dist(this.x, 0, predator.x, 0);
    // Calculate distance between the Y positions of the obstacle and predator
    let distanceY = dist(0, this.y, 0, predator.y);
    // Checks if they overlap
    if (distanceX < predator.radius + this.width / 2 && distanceY < predator.radius + this.height / 2) {
      // If so, the game is over
      gameOver = true;
      console.log("obstacle and predator collision");
    }
  }
}
