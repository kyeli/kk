//20210694 서지혜
//20210695 김예린
//20210702 강민영

let snowflakes = [];
let song;
let img;
var video;
var button;
var flip;
var a;
var b;

function preload(){
  song = loadSound("carol.mp3");
  img = loadImage("tree.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(240);
  noStroke();
  a=0;
  b=0;
  video = createCapture(VIDEO);
  video.hide();

initialize();
animate();


}

function draw() {

  if(mouseIsPressed){
    b=1;
  }

  a=a+1;
  console.log(a);
  
  if(b==0){
  song.play();
  image(img,0,0,windowWidth,windowHeight)
  let t = frameCount/60;
  
  for(let i = 0; i <random(5); i++){
    snowflakes.push(new snowflake());
  }

  for(let flake of snowflakes){
  flake.update(t);
  flake.display();
  }
  }
  
  else if(b==1){
  button=createButton('FLIP');
  button.position(0,0);
  button.mousePressed(flipCamera);
  song.stop();
  // scale(-1,1);
  image(video,0,0, width, height);

  }
}

function snowflake(){
  this.posX = 0;
  this.posY = random(-50,0);
  this.initialangle = random(0,2*PI);
  this.size = random(2,5);
  
  this.radius = sqrt(random(pow(width/2,2)));
  
  this.update = function(time){
    let w = 0.6;
    let angle = w*time + this.initialangle;
    this.posX = width/2+this.radius*sin(angle);
    this.posY += pow(this.size,0.5);
    
    if(this.posY > height){
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index,1);
    }
  };
  
  this.display = function(){
    ellipse(this.posX, this.posY, this.size);
  };
}


function flipCamera(){
  console.log("FlipCamera is working");
  flip =!flip;
  if(flip === true){
    video.remove();
    options = {
      video: {
        facingMode: {
          exact: "environment"
        }
      }
    };
  }else{
    
    video.remove();
    options = {
      video: {
        facingMode: {
          exact: "user"
        }
      }
    };
  }
  video = createCapture(options);
  // video.opsition(0,0);
}