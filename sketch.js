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
      food = new Sprite(random(200, windowWidth - 200), random(200, windowHeight - 200), 20, 'circle', 'k'); // make food
      theFood.push(food);
  }
}

function spawnBlob() {
  for (let i = blobamount; i >= 0; i--) {
    let blobx, bloby;
    choice = random(0,20);

    if (choice < 5) {
      blobx = 30; 
      bloby = random(30,windowHeight - 30);  // left wall
    }
    else if (choice < 10) {
      blobx  = windowWidth - 30; 
      bloby = random(30,windowHeight - 30); // right wall
    }
    else if (choice < 15) {
      blobx = random(30, windowWidth - 30), 
      bloby = 30; // top wall
    }
    else if (choice < 20) {
      blobx = random(30, windowWidth - 30); 
      bloby = windowHeight - 30; // bottom wall
    }

    blob = new Sprite(blobx, bloby, 'd'); // make blob
    blob.spawnpoint = (blobx, bloby)
    blob.hunger = 2;
    blob.go = random(1, 3); // speed, cant call it 'move' or 'speed' for some reason
    console.log(blob.velx)

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