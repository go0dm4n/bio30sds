// biology 30 sds
// Uday Sandhu & Ben Strawson
// March 10th, 2023

let theBlobs = [];
let theFood = [];

let currentday = 0; // time passed since stuff was started

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(225);
  doTime();
}

function spawnFood() {

}

function doTime() {
  if (theFood.length === 0) { // they run outta food
    currentday += 1
  }

  if (theBlobs.length === 0) {
    // end it
  }

}

function checkHunger() {
  
}