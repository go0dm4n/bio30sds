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
let imgGameBackGround;
let sandor;
let evo;
let Dna;

let day = 0; // time passed since stuff was started
let foodamount = 5;
let blobamount = 5;


function preload(){
  imgGameBackGround = loadImage("lab.jpg")
  sandor = loadImage("mr sandor.png");
  evo = loadImage("evo_pic.jpg")
  Dna = loadImage("DNA.png")
  title_font = loadFont("EVOFONT.ttf");
  basic_font = loadFont("Minimal Performance.ttf")

  textData = loadStrings("info.txt");
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
  button = new Button(windowWidth-60, windowHeight-60,60,60,"blue","red","info","title","i",basic_font);
  buttonAR.push(button);
}

function draw() {
  image(imgGameBackGround, 0, 0, windowWidth, windowHeight);
  buttonsupdate();
  changeValues();
  if (gamestate === "title"){
    draw_Title_Screen();
    draw_Title();
  }
  if (gamestate ==="info"){
    info_screen();
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
  textSize(50)
  text("Evolution Simulator", windowWidth/2, 40)
  textAlign(CENTER,CENTER);
  textSize(30)
  text("By Uday and Ben", windowWidth/2, 80)
  textFont(basic_font);
  textSize(30)
  text(blobamount + " Blobs",windowWidth/3,windowHeight/10*7);
  text(foodamount + " Foods",windowWidth/3*2,windowHeight/10*7);
}

function draw_Title_Screen(){
  image(sandor,0,height-sandor.height);
  image(Dna,0,0);
  image(evo,windowWidth-evo.width,0);
}

function info_screen(){
  textSize(20)
  for (let i = 0; i < textData.length; i++) {
    text(textData[i], width / 2, 20 + (i * 30));
  }
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
      foodamount-=5;
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
      textAlign(CENTER);
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
      food = new Sprite(random(400, windowWidth - 400), random(400, windowHeight - 400), 20, 'circle', 'd'); // make food
      food.color = 'blue'
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

    blob = new Sprite(blobx, bloby, 'k'); // make blob
    blob.spawnx = blobx;
    blob.spawny = bloby;
    blob.hunger = 2;

    blob.go = random(1, 1.5); // speed, cant call it 'move' or 'speed' for some reason
    blob.sense = random(250, 400);

    blob.color = (255, 0, 0, 255) // speed, sense, size? REMOVE THIS IF WE DONT IMPLEMENT THOSE

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
            findFood(theBlobs[i]);
            theBlobs[i].vel.x === 0;
            theBlobs[i].vel.y === 0;
          }
      }
  }
}

function nextDay() {
  if (theFood.length === 0) { // they run outta food
    day += 1
    pushData(); // pushes population data into list
    checkHunger(); // checks if blobs still hungry
    resetBlob(); // move to starting positions
    spawnFood();
  }
}

function findFood(blob) {
  let closestfood;
  for (let k = theFood.length - 1; k >= 0; k--) {
    if(blob.vel.x === 0 && blob.vel.y === 0) {
      randomMove(blob);
      closestfood = "nope";
    }

    
    
    else if (blob.target !== "nope") {
      if(dist(blob.x, blob.y, theFood[k].x, theFood[k].y) < dist(blob.x, blob.y, closestfood.x, closestfood.y) 
      && dist(blob.x, blob.y, closestfood.x, closestfood.y) <= blob.sense) {
        closestfood = theFood[k];
    }
    }  
  }
  return closestfood;
}

function movetoFood() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    theBlobs[i].target = findFood(theBlobs[i]) // find closest blob
    console.log(theBlobs[i].target, i)
    if(theBlobs[i].target !== "nope") {
      theBlobs[i].moveTowards(theBlobs[i].target, theBlobs[i].go / dist(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y)); // move towards closest blob
      line(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y)
      fill(200, 200, 200, 100);
      circle(theBlobs[i].x, theBlobs[i].y, theBlobs[i].sense);
    }
  }
}

function randomMove(blob){
  newx = blob.x + random(-100, 100);
  newy = blob.y + random(-100, 100);
  if(newx > width || newy > height || newx < 0 || newy < 0) {
    blob.moveTowards(newx, newy, blob.go / dist(blob.x, blob.y, newx, newy));
  }
  else {
    randomMove(blob);
  }
}

function checkHunger() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    if (theBlobs[i].hunger <= 0) { // if blob is really full, blob will reproduce
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
    theBlobs[i].x = theBlobs[i].spawnx; // reset place
    theBlobs[i].y = theBlobs[i].spawny;
    theBlobs[i].vel.x = 0; //stop moving
    theBlobs[i].vel.y = 0;
    theBlobs[i].hunger = 2; // make hungry again
  }
}

function blobReproduce(blob) {
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

  new_blob = new Sprite(blobx, bloby, 'k'); // make blob
  new_blob.go = blob.go + random(-0.1,0.1);    
  new_blob.spawnx = blobx;
  new_blob.spawny = bloby;
  new_blob.hunger = 2;
  new_blob.color = color(blob.go*255,0,0); // speed, sense, size? REMOVE THIS IF WE DONT IMPLEMENT THOSE
  theBlobs.push(new_blob);

  console.log("sex!");
}

function drawUI() { // draws misc game stuff
  textSize(20);
  text("day:" + day, 50, 20);
  text("population:" + (theBlobs.length), 105, 50);
}

function pushData() {

}