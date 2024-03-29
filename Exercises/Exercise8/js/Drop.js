// Drops
// A class that displays a drop on the screen.
// The user can control the x position and the size of the drop with the mouse
class Drop {
  // constructor()
  // Sets the initial values for the drop's properties
  // Either sets default values or uses the arguments provided
  constructor() {
    // X and Y positions
    this.x = 1;
    this.y = 1;
    // Size
    this.dropSize = 100;
    // X and Y velocities
    this.vy = 1;
    this.vx = 1;
    // Time variable
    this.ty = 1;
    // Colors and opacity
    this.redAndGreen = 1;
    this.alpha = 10;
  }

// displayShape()
// Set the drop properties and draw it as an ellipse
  displayShape() {
    // Set red, green and alpha to a random value
    this.redAndGreen = random(0,3);
    this.alpha = random(0,100);
    // Set x and y position to random a random value
    this.x = random(-200,width);
    this.y = random(0, height/2);
    // Set the color, stroke and display properties for the ellipse
    fill(this.redAndGreen, this.redAndGreen, 8, this.alpha);
    noStroke();
    ellipseMode(CENTER);
    // Draw the ellipse
    ellipse(this.x, this.y, this.dropSize);
  }

  // moveDrop()
  //
  moveDrop() {
    // Y axis movement:
    // Set time y to a random value
    this.ty = random(0,3000);
    // Set y velocity to a noise value and map it
    this.vy = map(noise(this.ty),0,1,0,4);
    // Add the y velocity to the y position
    this.y += this.vy;

    // Set x velocity according to the mouse's x position and map it
    this.vx = map(mouseX, 0, width, -5, 5);
    // Add the x velocity to the x position
    this.x += this.vx;
    // Keep the x position in the canvas
    this.x = constrain(this.x,0,width);
    // Set the size of the drop according to the y position of the mouse and maps it
    this.dropSize = map(mouseY, 0, height, 20, 100);
    // Set opacity, red and green to a random value
    this.alpha = random(0,100);
    this.redAndGreen = random(0,255);
    // Set the color, stroke and display properties for the ellipse
    fill(this.redAndGreen, this.redAndGreen, 255, this.alpha);
    noStroke();
    ellipseMode(CENTER);
    // Draw the ellipse with the changed position and size
    ellipse(this.x, this.y, this.dropSize);
    // Handles the ellipse going off the canvas
    this.handleWrapping();
  }

  // handleWrapping()
  // Checks if the drop has gone off the bottom of the canvas and wraps it to the top if so
  handleWrapping() {
    // When the drop's Y position is passed the end of the canvas
    if (this.y > height+50) {
      // Move it above the the canvas (so it is already moving when it gets in the canvas)
      this.y = -50;
      // Reset the x position
      this.x = random(-200,width);
    }
  }
}
