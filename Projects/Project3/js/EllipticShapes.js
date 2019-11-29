// EllipticShapes
// A class that displays an ellipse according to the mouse location when you press the space bar.
// As long as the space bar is down, ellipses are displayed from the same center position each frame and you can move the mouse to change width and height
// RGB colors can be changed with "Z", "X" and "C" keys.
class EllipticShapes {
  // constructor()
  // Sets the initial values for the shapes's properties
  constructor() {
    // Center position
    this.x = 1;
    this.y = 1;
    // State of the position
    this.positionIsGiven = false;
    // Size
    this.width = 1;
    this.height = 1;
    // Colors
    this.red = 50;
    this.green = 0;
    this.blue = 0;
    // State of the RGB colors
    this.decreaseRed = true;
    this.decreaseGreen = true;
    this.decreaseBlue = true;
    // color increment or decrement
    this.colorChangeValue = 2;
  }

  // changeColor()
  // Changes colors with the "Z", "X" and "C" keys
  changeColor() {
    // If the key "Z" is down, change the red value
    if (keyIsDown(90)) {
      // Keep the red value between 0 and 255
      this.red = constrain(this.red, 0, 255);
      // If decrease red is true, decrease red
      if(this.decreaseRed) {
        this.red -= this.colorChangeValue;
        // If red is smaller or equal to 0, change decrease red to false
        if(this.red <= 0) {
          this.decreaseRed = false;
        }
      }
      // If decrease red is false, increase red
      else if(!this.decreaseRed) {
        this.red += this.colorChangeValue;
        // If red is greater or equal to 255, change decrease red to true
        if(this.red >= 255) {
        this.decreaseRed = true;
        }
      }
    }
    // If the key "X" is down, change the green value
    if (keyIsDown(88)) {
      // Keep the green value between 0 and 255
      this.green = constrain(this.green, 0, 255);
      // If decrease green is true, decrease green
      if(this.decreaseGreen) {
        this.green -= this.colorChangeValue;
        // If green is smaller or equal to 0, change decrease green to false
        if(this.green <= 0) {
          this.decreaseGreen = false;
        }
      }
      // If decrease green is false, increase green
      else if(!this.decreaseGreen) {
        this.green += this.colorChangeValue;
        // If green is greater or equal to 255, change decrease green to true
        if(this.green >= 255) {
        this.decreaseGreen = true;
        }
      }
    }
    // If the key "C" is down, change the blue value
    if (keyIsDown(67)) {
      // Keep the blue value between 0 and 255
      this.blue = constrain(this.blue, 0, 255);
      // If decrease blue is true, decrease blue
      if(this.decreaseBlue) {
        this.blue -= this.colorChangeValue;
        // If blue is smaller or equal to 0, change decrease blue to false
        if(this.blue <= 0) {
          this.decreaseBlue = false;
        }
      }
      // If decrease blue is false, increase blue
      else if(!this.decreaseBlue) {
        this.blue += this.colorChangeValue;
        // If blue is greater or equal to 255, change decrease blue to true
        if(this.blue >= 255) {
        this.decreaseBlue = true;
        }
      }
    }
  }

  // displayShapes()
  // When we press space bar, sets the central position of the ellipse and handles mouse and keys inputs to change size and colors
  displayShapes() {
    // Display shapes when the space bar is pressed
    if (keyIsDown(32)) {
      // If the central position of the shape is not given...
      if(this.positionIsGiven === false) {
        // Set it to the mouse position
        this.x = mouseX;
        this.y = mouseY;
        // And change state so the central position stays the same as long as the space bar is pressed
        this.positionIsGiven = true;
      }
      // If the central position is given...
       else if (this.positionIsGiven === true) {
         // Change width and height according to the mouse position
         this.width = 2*(mouseX - this.x);
         this.height = 2*(mouseY - this.y);
         // Handle inputs to change the color of the stroke
         this.changeColor();
         stroke(this.red, this.green, this.blue);
         noFill();
         // Display the ellipse from the center and draw it
         ellipseMode(CENTER);
         ellipse(this.x,this.y,this.width,this.height);
       }
    }
    // If the space bar is released, change the state of positionIsGiven to false to be able to set a new position when we press space bar again
    else {
      this.positionIsGiven = false;
    }
  }
}
