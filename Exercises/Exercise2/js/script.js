/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;

//initial Ennemy Size
let initialEnemySize = 50;
let enemySize = initialEnemySize;
//enemy size increasment
let enemySizeInc = 15;

// The initial speed and velocity of our enemy circle
let initialEnemySpeed = 5;
let enemyVX = 5;
let enemySpeed = initialEnemySpeed;
//The speed increasement of enemy
let enemySpeedInc = 2;

// How many dodges the player has made
let dodges = 0;

//naming my font variable
let myFont;

//Naming my ennemy and background images
let rocketImgEnnemy;
let skyBg;
let spaceskyBg;
let moonskyBg;

//Loading my font
function preload(){
  //preload ennemy and background images to avoid delay
  rocketImgEnnemy = loadImage ("assets/images/rocket.png");
  skyBg = loadImage ("assets/images/sky.jpg");
  spaceskyBg =loadImage ("assets/images/space.jpeg");
  moonskyBg =loadImage ("assets/images/moon.jpg");
  myFont = loadFont("assets/Font/dotFont.otf");

}
// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);
  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {


  //background images
  imageMode(CORNER);
  background(skyBg);

  //Change backgroud image depending on number of dodges
  if (dodges >= 3) {
    background(spaceskyBg);
    }
  if (dodges>= 6) {
    background(moonskyBg);
    }
  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately


  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii

  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    //Reset enemy size to initial enemy size and speed
    enemySize = initialEnemySize;
    enemySpeed = initialEnemySpeed;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0
    //Reset enemy size to initial enemy size and speed
    enemySize = initialEnemySize;
    enemySpeed = initialEnemySpeed;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    //increase enemy size and speed
    enemySize += enemySizeInc;
    enemySpeed += enemySpeedInc;
  }



  // Display the number of successful dodges in the console
  console.log(dodges);

// Display the number of successful dodges in the canvas
fill(0, 102, 153);
noStroke()
textSize(32);
textFont("dotFont");
text('Dodges:', width-170,40);
text(dodges,width-50,40);

  // The player is black
  //fill(0);
  // Draw the player as a circle
  fill(255,255,0);
  strokeWeight(10);
  stroke(0,0,255);
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  //fill(255,0,0);
  // Draw the enemy as a circle
  //ellipse(enemyX,enemyY,enemySize,enemySize);
  //draw the ennemy as a rocket image
  imageMode(CENTER);
  image (rocketImgEnnemy,enemyX,enemyY,enemySize,enemySize);
}
