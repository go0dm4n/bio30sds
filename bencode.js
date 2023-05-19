//penis 

// biology 30 sds
// Uday Sandhu & Ben Strawson
// March 10th, 2023

let theBlobs = [];
let theFood = [];
let buttonAR= [];

let gamestate = "title";
let button;

let day = 0; // time passed since stuff was started
let foodamount;
let blobamount;

function setup() {
  createCanvas(windowWidth, windowHeight);

    button = new Button(windowWidth/2,windowHeight/2,200,100,"red","blue", "game", "title","Start")
    buttonAR.push(button);

  spawnFood()
  spawnBlob()
  
}

function draw() {
  background(225);
  if (gamestate === "title"){
  nextDay();
  eatFood();
  }
}


class Button{// button class
    constructor(x,y,width,height,color1,color2,state,display,text){
      this.x = x-width/2;
      this.y = y-height/2;
      this.width = width;
      this.height = height;
      this.color1 = color1;
      this.color2 = color2;
      this.state = state;
      this.displayState = display;
      this.text = text;
    }
  
    display(){
      if (gamestate === this.displayState){//diplays buttons
        if (mouseX > this.x && mouseX < this.x +this.width && mouseY > this.y && mouseY < this.y + this.height){
          fill(this.color1);
        }
        else {
          fill(this.color2);
        }
        rect(this.x,this.y,this.width,this.height);
        fill("black");
        textSize(40);
        text(this.text,this.x+this.width/2-textWidth(this.text)/2,this.y+this.height/2);
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
  
  function buttonsupdate(){// displays buttons
    for(let i = buttonAR.length-1; i >= 0; i --){
      buttonAR[i].display();
    }
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
