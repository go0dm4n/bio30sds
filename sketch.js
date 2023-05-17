// biology 30 sds
// Uday Sandhu & Ben Strawson
// March 10th, 2023

let theBlobs = [];
let theFood = [];

let day = 0; // time passed since stuff was started
let foodamount = 20;
let blobamount = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnFood()
  spawnBlob()
}

function draw() {
  background(225);
  nextDay();
  eatFood();
}

function spawnFood() {
  for (let i = foodamount; i >= 0; i--) {
      food = new Sprite(random(0, windowWidth), random(0, windowHeight), 'k'); // make food
      theFood.push(food);
  }
}

function spawnBlob() {
  for (let i = blobamount; i >= 0; i--) {
    blob = new Sprite(0, random(0, windowHeight), 'd'); // make blob
    blob.hunger = 2;
    blob.speed = random(1, 3);
    console.log(blob.speed);
    theBlobs.push(blob);
    for (let k = theFood.length - 1; k >=0; k--) {
      blob.overlaps(theFood[i]);
    }
  }
}

function eatFood() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
      for (let k = theFood.length - 1; k >= 0; k--){
          if (theBlobs[i].overlaps(theFood[k])) {
            theFood[k].remove();
            theFood.splice(k, 1);
            theBlobs[i].hunger -= 1;
          }
      }
  }
}

function nextDay() {
  if (theFood.length === 0) { // they run outta food
    day += 1
    resetBlob() // move to starting positions
  }
}

function checkHunger() {
  
}

function resetBlob() {

}