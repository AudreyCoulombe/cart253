// SpiralMovement
// A class that displays a child shape (either Ellipse or Spray) in spiral
// Width and height of the shape are controlled by the mouse position
// Pan and rate of the sound are also controlled by the mouse position
// RGB colors can be changed with the keys "Z", "X" and "C"
// I started from the code of this example to do the spiral: https://editor.p5js.org/hyershin/sketches/SkG_S5K3W
class SpiralMovement {
  // constructor()
  // Sets the initial values for the spiral's properties
  // Either sets default values or uses the arguments provided
  constructor(sound) {
    // Angle from the center of the spiral that tells where to put the next shape
    this.angle = 2.0;
    // The radius of the spiral to say at what distance from the center the shape has to be displayed
    this.spiralRadius = 1;
    // Speed
    this.speed = 0.1;
    // Position of the shape
    this.x = 1;
    this.y = 1;
    // RGB colors filling the shape
    this.red = random(0, 255);
    this.green = random(0, 255);
    this.blue = random(0, 255);
    // State of the RGB colors
    this.decreaseRed = true;
    this.decreaseGreen = true;
    this.decreaseBlue = true;
    this.colorChangeValue = 2;
    // Sound
    this.sound = sound;
    // Where the artboard starts on X axe (end of the menu)
    this.artboardStartX = 189;
  }

  // changeColor()
  // Changes colors with the "Z", "X" and "C" keys
  changeColor() {
    // If the key "Z" is down, change the red value
    if (keyIsDown(90)) {
      // Keep the red value between 0 and 255
      this.red = constrain(this.red, 0, 255);
      // If decrease red is true, decrease red
      if (this.decreaseRed) {
        this.red -= this.colorChangeValue;
        // If red is smaller or equal to 0, change decrease red to false
        if (this.red <= 0) {
          this.decreaseRed = false;
        }
      }
      // If decrease red is false, increase red
      else if (!this.decreaseRed) {
        this.red += this.colorChangeValue;
        // If red is greater or equal to 255, change decrease red to true
        if (this.red >= 255) {
          this.decreaseRed = true;
        }
      }
    }
    // If the key "X" is down, change the green value
    if (keyIsDown(88)) {
      // Keep the green value between 0 and 255
      this.green = constrain(this.green, 0, 255);
      // If decrease green is true, decrease green
      if (this.decreaseGreen) {
        this.green -= this.colorChangeValue;
        // If green is smaller or equal to 0, change decrease green to false
        if (this.green <= 0) {
          this.decreaseGreen = false;
        }
      }
      // If decrease green is false, increase green
      else if (!this.decreaseGreen) {
        this.green += this.colorChangeValue;
        // If green is greater or equal to 255, change decrease green to true
        if (this.green >= 255) {
          this.decreaseGreen = true;
        }
      }
    }
    // If the key "C" is down, change the blue value
    if (keyIsDown(67)) {
      // Keep the blue value between 0 and 255
      this.blue = constrain(this.blue, 0, 255);
      // If decrease blue is true, decrease blue
      if (this.decreaseBlue) {
        this.blue -= this.colorChangeValue;
        // If blue is smaller or equal to 0, change decrease blue to false
        if (this.blue <= 0) {
          this.decreaseBlue = false;
        }
      }
      // If decrease blue is false, increase blue
      else if (!this.decreaseBlue) {
        this.blue += this.colorChangeValue;
        // If blue is greater or equal to 255, change decrease blue to true
        if (this.blue >= 255) {
          this.decreaseBlue = true;
        }
      }
    }
  }

  // displaySpiral()
  // Displays the shape in spiral
  displaySpiral() {
    // Add speed to the angle and the spiral radius so the shapes are displayed in spiral
    this.angle += this.speed;
    this.spiralRadius += this.speed;
    // Set x and y positons of the shape so that it is displayed in spiral from the center of the artboard
    this.x = (width + this.artboardStartX) / 2 + cos(this.angle) * this.spiralRadius;
    this.y = height / 2 + sin(this.angle) * this.spiralRadius;
  }

  // changeSound()
  // Changes the rate and pan of the sound according to the mouse position
  changeSound() {
    // Set the sound rate according to the Y position of the mouse
    this.sound.rate(map(mouseY, 0, height, 0.8, 1.2));
    // Set the sound pan according to the X position of the mouse
    this.sound.pan(map(mouseX, this.artboardStartX, width, -1.0, 1.0));
  }
}
