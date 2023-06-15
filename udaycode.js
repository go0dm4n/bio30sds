//penis 

// biology 30 sds
// Uday Sandhu & Ben Strawson
// March 10th, 2023

let theBlobs = [];
let theFood = [];
let buttonAR= [];

let blobdata = [];
let average_speed = []
let final_pop = []

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
let sensey = 200

let endtext;



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

  frameRate(50);

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
  button = new Button(windowWidth-60, windowHeight-90,90,90,"blue","red","end","game","stop",basic_font);
  buttonAR.push(button);
}

function draw() {
  image(imgGameBackGround, 0, 0, windowWidth, windowHeight);
  buttonsupdate();
  changeValues();

  if (gamestate === "title"){ // main menu
    draw_Title_Screen();
    draw_Title();
  }

  if (gamestate ==="info"){ // info screen
    info_screen();
  }

  if (gamestate === "game"){
    nextDay(); // check if food is gone and switch the day
    drawUI(); // draws general game menu stuff
    movetoFood(); // makes blobs move towards food
    eatFood(); // checks if blobs and food collided
    spawnnums();
  }

  if (gamestate === "end" && theBlobs === []){ // end game screen if extinction
    endscreen();
    theFood = [];
    endtext === "extinct";
  }

  if (gamestate === "end"){ // end game screen
    endscreen();
    theBlobs = []; // reset
    theFood = [];
  }

  gameEnd() // check if game end
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

function endscreen(){
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    theBlobs[i].visible = false
  }
  for (let k = theFood.length - 1; k >= 0; k--){
    theFood[k].visible = false
  }
  display_info()
}

function display_info(){
  average_speed = []
  final_pop = []
  for (let i = 0 ; i <=  blobdata.length-1; i++) {
    average_speed.push (doAverage(blobdata[i]))
    final_pop.push (blobdata[i].length-1)
  }
  drawLineGraph_right(average_speed,"Average speed")
  drawLineGraph_left(final_pop,"popultaion")
  if(endtext === "extinct") {
    text("extinction! :(", windowwidth/2, 10);
  }
}

function doAverage(data){
  let average = 0
  for (let i =1; i  <= data.length-1; i++) {
    average += data[i]
  }
  return (average/(data.length-1))
}


function drawLineGraph_right(data,the_text) {
  let minX = 0;
  let maxX = data.length - 1;
  let minY = 0;
  let maxY = 10
  
  // Calculate the width and height of the graph area
  let graphWidth = width / 2-50;
  let graphHeight = height - 100;
  
  // Draw x and y axes
  line(graphWidth + 50, height - 50, graphWidth + 50, 50); // y-axis
  line(graphWidth+50, height - 50, width - 40, height - 50); // x-axis
  
  
  // Plot data points and connect them with lines
  let stepX = graphWidth / maxX;
  let stepY = graphHeight / (maxY - minY);
  for (let i = data.length; i >=-1; i--) {
    let x = graphWidth + 50 + i * stepX;
    let y = height - 50 - (data[i] - minY) * stepY;
    
    // Draw data point as a circle
    textSize(10)
    text(round(data[i],2),x+6,y+6)
    circle(x, y, 5);
    
    // Connect data points with lines
    if (i < data.length - 1) {
      let nextX = graphWidth + 50 + (i + 1) * stepX;
      let nextY = height - 50 - (data[i + 1] - minY) * stepY;
      line(x, y, nextX, nextY);
    }
  }
  textSize(20)
  textAlign(LEFT,BOTTOM)
  text(the_text,graphWidth+textWidth(the_text),height)
}

function drawLineGraph_left(data,the_text) {
  let minX = 0;
  let maxX = data.length - 1;
  let minY = 0;
  let maxY = (Math.max(...data))+2;
  
  // Calculate the width and height of the graph area
  let graphWidth = width / 2-70;
  let graphHeight = height - 100;
  
  // Draw x and y axes
  line(0 + 50, height - 50, 0 + 50, 50); // y-axis
  line(50, height - 50, graphWidth , height - 50); // x-axis
  
  // Plot data points and connect them with lines
  let stepX = graphWidth / maxX;
  let stepY = graphHeight / (maxY - minY);
  for (let i = data.length; i >=0; i--) {
    let x = 0 + 50 + i * stepX;
    let y = height - 50 - (data[i] - minY) * stepY;
    
    // Draw data point as a circle
    textSize(10)
    text(round(data[i]),x+6,y+6)
    circle(x, y, 5);
    
    // Connect data points with lines
    if (i < data.length - 1) {
      let nextX = 0 + 50 + (i + 1) * stepX;
      let nextY = height - 50 - (data[i + 1] - minY) * stepY;
      line(x, y, nextX, nextY);
    }
  }
  textSize(20)
  textAlign(LEFT,BOTTOM)
  text(the_text,0+textWidth(the_text),height)
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
      food = new Sprite(random(200, windowWidth - 200), random(200, windowHeight - 200), 20, 'circle', 'd'); // make food
      food.color = 'blue'
      theFood.push(food);
  }
}

function spawnBlob() {
  for (let i = blobamount; i > 0; i--) {
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
    blob.energy = 30000
    blob.spawnx = blobx;
    blob.spawny = bloby;
    blob.hunger = 2;

    blob.go = 5//random(4, 6); // speed, cant call it 'move' or 'speed' for some reason
    blob.sense = sensey

    blob.color = (255, 0, 0, 255) // speed, sense, size? REMOVE THIS IF WE DONT IMPLEMENT THOSE
    randomMove(blob)
    theBlobs.push(blob);
    for (let k = theFood.length - 1; k >=0; k--) {
      blob.overlaps(theFood[k]);
    }
  }
}

function eatFood() {
  for (let i = theBlobs.length - 1; i >= 0; i--) {
      for (let k = theFood.length - 1; k >= 0; k--){
          if (theBlobs[i].overlaps(theFood[k])) { // if blob touches food
            theFood[k].remove(); // delete food
            theFood.splice(k, 1);

            theBlobs[i].hunger -= 1; // reduce hunger
            findFood(theBlobs[i]); // find new food

            theBlobs[i].vel.x === 0;
            theBlobs[i].vel.y === 0;
            randomMove(theBlobs[i]) // start randomly moving
          }
      }
  }
}

function nextDay() {
  everyonetired = true;
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    if(theBlobs[i].energy > 0){
      everyonetired = false
    }
  }

  if (theFood.length === 0 || everyonetired === true) { // they run outta food or get tired
    //doAverage();
    pushData(); // pushes population data into list
    day += 1
    checkHunger(); // checks if blobs still hungry
    resetBlob(); // move to starting positions
    killFood(); 
    spawnFood();
    
  }
}

function findFood(blob) {
  let closestfood = "nope";
  for (let k = theFood.length - 1; k >= 0; k--) {
    if (dist(blob.x,blob.y,theFood[k].x,theFood[k].y) <= blob.sense){
      //console.log("balls")
      if(closestfood === "nope"){

        closestfood = theFood[k];
        blob.target= theFood[k];
        blob.targetType = "food"

      }
      else if (dist(blob.x,blob.y,theFood[k].x,theFood[k].y) < dist(blob.x,blob.y,closestfood.x,closestfood.y)){
        closestfood = theFood[k];
        blob.target= theFood[k];
        blob.targetType = "food"
      }
    }
 

      


      // if(dist(blob.x, blob.y, theFood[k].x, theFood[k].y) < dist(blob.x, blob.y, closestfood.x, closestfood.y) 
      // && dist(blob.x, blob.y, closestfood.x, closestfood.y) <= blob.sense) {
      //   closestfood = theFood[k];
    
  }
}

function movetoFood() {
  for (let i = theBlobs.length -1; i >= 0; i--) {
    if(theBlobs[i].energy <= 0){
      theBlobs[i].vel.x = 0
      theBlobs[i].vel.y = 0
      theBlobs[i].color = (0, 0 ,0)
    }
    fill(200, 200, 200, 100);
    circle(theBlobs[i].x, theBlobs[i].y, theBlobs[i].sense*2);
    theBlobs[i].energy -= theBlobs[i].go * 20 + theBlobs[i].sense * 20;

    if(theBlobs[i].energy >= 0){
      findFood(theBlobs[i]) // find closest blob
      if(theBlobs[i].target !== "nope") {
        if(dist(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y) <= theBlobs[i].go && theBlobs[i].targetType !== "food"){
          //console.log("ass")
          randomMove(theBlobs[i])
        }
        theBlobs[i].moveTowards(theBlobs[i].target, theBlobs[i].go / dist(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y)); // move towards closest blob
        line(theBlobs[i].x, theBlobs[i].y, theBlobs[i].target.x, theBlobs[i].target.y)
        fill(200, 200, 200, 100);
      }
    }

  }
}

function randomMove(blob) {
  if(blob.energy >= 0); {
    let target = {
      x: random(0, windowWidth),
      y: random(0, windowHeight)
    };
    //console.log(target.x)
    blob.target = target;
    blob.targetType = "ran"
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
    theBlobs[i].energy = 30000;
    theBlobs[i].color = (255, 255, 255)
    randomMove(theBlobs[i])
  }
}

function killFood() {
  for(i = theFood.length -1; i >= 0; i--){
    theFood[i].remove();
    theFood.splice(i, 1);
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
  new_blob.go = blob.go + random(-1,1);
  if (new_blob.go >= 10){
    new_blob.go =10
  }   
  if (new_blob.go <= 0){
    new_blob.go = 0.1
  }  
  new_blob.spawnx = blobx;
  new_blob.spawny = bloby;
  new_blob.hunger = 2;
  new_blob.sense = sensey
  new_blob.color = color(blob.go*25,0,0); // speed, sense, size? REMOVE THIS IF WE DONT IMPLEMENT THOSE
  theBlobs.push(new_blob);

  //console.log("sex!");
}

function drawUI() { // draws misc game stuff
  textSize(20);
  text("day:" + day, 50, 20);
  text("population:" + (theBlobs.length), 105, 50);
}

function pushData() {
  let temp = []
    temp.push(day)
   for (let i = theBlobs.length - 1; i >=0; i--) {
     temp.push(round(theBlobs[i].go,2))
   }
   blobdata.push(temp)
}

function spawnnums(){
  for (let i = theBlobs.length - 1; i >= 0; i--) {
    fill("black")
    textAlign(LEFT,CENTER)
    textSize(10)
    text(round(theBlobs[i].go,2),theBlobs[i].x+30,theBlobs[i].y)
  }
}

function gameEnd(){
  if(theBlobs === []){
    gamestate = "end";
  }
}