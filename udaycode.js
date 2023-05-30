//penis 

// biology 30 sds
// Uday Sandhu & Ben Strawson
// March 10th, 2023

let theBlobs = [];
let theFood = [];
let buttonAR= [];

let blobdata = [];

let gamestate = "title";
let button;
let title_font;
let basic_font;

let day = 0; // time passed since stuff was started
let foodamount = 5;
let blobamount = 5;


function preload(){
  title_font = loadFont("EVOFONT.ttf");
  basic_font = loadFont("Minimal Performance.ttf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  button = new Button(windowWidth/2,windowHeight/3*2,200,100,"red","blue", "game1", "title","Start",title_font);//start
  buttonAR.push(button);
  button = new Button(windowWidth/3,windowHeight/5*3,50,50,"red","blue","+blob","title","+",basic_font);//
  buttonAR.push(button);
  button = new Button(windowWidth/3,windowHeight/5*4,50,50,"red","blue","-blob","title","-",basic_font);//
  buttonAR.push(button);
  button = new Button(windowWidth/3*2,windowHeight/5*3,50,50,"red","blue","+food","title","+",basic_font);//
  buttonAR.push(button);
  button = new Button(windowWidth/3*2,windowHeight/5*4,50,50,"red","blue","-food","title","-",basic_font);//
  buttonAR.push(button);

}

function draw() {
  background(225);
  buttonsupdate();
  changeValues();
  if (gamestate === "title"){
    draw_Title();
  }

  if (gamestate === "game"){
    nextDay(); // check if food is gone and switch the day
    drawUI(); // draws general game menu stuff
    movetoFood(); // makes blobs move towards food
    eatFood(); // checks if blobs and food collided
  }

}

function mousePressed(){
  for(let i = buttonAR.length-1; i >= 0; i --){ //clicks buttons
    buttonAR[i].clicked();
  }
}

function draw_Title(){
  textFont(title_font);
  text("working title", windowWidth/2, 40)
  textAlign(CENTER,CENTER);
  textFont(basic_font);
  text(blobamount + " Blobs",windowWidth/3,windowHeight/10*7);
  text(foodamount + " Foods",windowWidth/3*2,windowHeight/10*7);
  
}

function changeValues(){
  if (gamestate === "+blob"){
    if(blobamount < 99){
    blobamount+=5
    }
    gamestate = "title"
  }
  if (gamestate === "-blob"){
    if(blobamount > 6){
    blobamount-=5
    }
    gamestate = "title"
  }
  if (gamestate === "+food"){
    if (foodamount < 99){
    foodamount+=5
    }
    gamestate = "title"
  }
  if (gamestate === "-food"){
    if (foodamount > 6){
    foodamount-=5
    }
    gamestate = "title"
  }
  if (gamestate === "game1"){//for game start
    spawnFood();
    spawnBlob();
    gamestate = "game"
  }
}


class Button{// button class
  constructor(x,y,width,height,color1,color2,state,display,text,font){
    this.x = x-width/2;
    this.y = y-height/2;
    this.width = width;
    this.height = height;
    this.color1 = color1;
    this.color2 = color2;
    this.state = state;
    this.displayState = display;
    this.text = text;
    this.font = font;
  }

  display(){
    if (gamestate === this.displayState){//diplays buttons
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height){
        fill(this.color1);
      }
      else {
        fill(this.color2);
      }
      ellipse(this.x + this.width/2,this.y + this.height/2,this.width,this.height);
      textFont(this.font);
      fill("black");
      textSize(40);
      text(this.text,this.x+this.width/2,this.y+this.height/2);
    }
  }

  clicked(){//when mouse is pressed checks to see if mouse is on the button andnif the gamestate is in the correct state
    if (gamestate === this.displayState){
      if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height && mouseIsPressed){
        gamestate = this.state;
      }
    }
  }
}

  
function buttonsupdate(){ // displays buttons
  for(let i = buttonAR.length-1; i >= 0; i --){
    buttonAR[i].display();
  }
}

function spawnFood() { // make food around the place
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
    blob.spawnpoint = blobx, bloby
    blob.hunger = 2;
    blob.go = random(1, 3); // speed, cant call it 'move' or 'speed' for some reason

    theBlobs.push(blob);
    for (let k = theFood.length - 1; k >=0; k--) {
      blob.overlaps(theFood[k]);
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
    pushData(); // pushes population data into list
    resetBlob(); // move to starting positions
    checkHunger(); // checks if blobs still hungry
  }
}

function findFood(blob) {
  for (let k = theFood.length - 1; k >= 0; k--) {
    if (k === theFood.length - 1) { // set an inital blob to compare other blobs too
      closestfood = theFood[k];
    }

    if (dist(blob.x, blob.y, theFood[k].x, theFood[k].y) < dist(blob.x, blob.y, closestfood.x, closestfood.y)) {
      closestfood = theFood[k];
    }
  }
  return closestfood;
}

function movetoFood() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    if(theBlobs[i].vel.x === 0 && theBlobs[i].vel.y === 0 || !theBlobs[i].target) { // if blob not moving
      theBlobs[i].target = findFood(theBlobs[i]) // find closest blob
      theBlobs[i].moveTowards(theBlobs[i].target, theBlobs[i].go / dist(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y)); // move towards closest blob
    }
  }
}

function checkHunger() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    console.log(theBlobs[i].hunger);

    if (theBlobs[i].hunger === 0) { // if blob is really full, blob will reproduce
      blobReproduce(theBlobs[i]);
    }
    
    if (theBlobs[i].hunger === 2) { // hungry blob, kill it
      theBlobs[i].remove();
      theBlobs.splice(i, 1);
    }
  }
}

function resetBlob() { // put blobs back to where they spawned at end of day
  for (let i = theBlobs.length - 1; i >=0; i--) {
    theBlobs[i].x, theBlobs[i].y = theBlobs[i].spawnpoint;
    theBlobs[i].vel.x, theBlobs[i].vel.y = 0, 0;
  }
}

function blobReproduce(blob) {

}

function drawUI() { // draws misc game stuff
  textSize(20);
  text("day:" + day, 50, 20);
  text("population:" + (theBlobs.length - 1), 105, 50);
}

function pushData() {

}