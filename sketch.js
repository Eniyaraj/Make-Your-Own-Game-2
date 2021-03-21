 var fishie, tubes1, tubes, tube1Image, tube2Image, fishieImage, ground, groundImage;
 var score=0;
 var clouds, cloudsImage, cloudsGroup;
 var coins;
var tubesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImage, restartImage
var backgroundImage;

function preload(){
 fishieImage= loadImage("Img/plane.png");
  groundImage= loadImage("Img/ground2.png");
  tube1Image= loadImage("Img/tube.png");
  tube2Image= loadImage("Img/tube2.png");
  backgroundImage= loadImage("Img/backgroundImg.png");
  restartImage= loadImage("Img/restart.png");
  cloudsImage= loadImage("Img/cloud.png");
  jumpSound = loadSound("Sounds/jump.wav");
  collidedSound = loadSound("Sounds/collided.wav");
}


function setup() {
  createCanvas(500,400);
    
    fishie= createSprite(100,200,20,20);
    fishie.addImage(fishieImage);
    fishie.scale=0.5;
  
    ground =createSprite(400,400,800,20);
    ground.addImage(groundImage);
    ground.velocityX=-4;
   ground.x = ground.width /2;
  
  restart = createSprite(300,190);
  restart.addImage(restartImage);
  restart.scale=0.5;

   tubesGroup= new Group();
   cloudsGroup= new Group();
}

function draw() {
  background(backgroundImage);
 fill("black");
 textSize(20);
  text("Score: "+ score, 20, 20);
  
  if (gameState===PLAY){
    if(fishie.isTouching(cloudsGroup)){
      score= score+20;
    }
    restart.visible=false;

    if(keyDown(UP_ARROW)){
    fishie.velocityY= -10;
    jumpSound.play();
    }
    if(keyDown(RIGHT_ARROW)){
      fishie.velocityX = 5;
    }
  fishie.velocityY = fishie.velocityY+0.5;
    
  if (ground.x < 0){
  ground.x = ground.width/2;
   }

  fishie.collide(ground);
  spawnUpTubes();
  spawnDownTubes();
  spawnClouds();
    
    if(fishie.isTouching(tubesGroup)){
          gameState = END;
          collidedSound.play();
      }
    }
    else if (gameState === END) {
      restart.visible = true;

      ground.velocityX = 0;
      fishie.velocityY = 0;
      fishie.velocityX = 0;
      tubesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);

     tubesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);

     fill("Red");
     text("Game Over!",250,160);
     textSize(40);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
  drawSprites();
}
function spawnUpTubes() {
    if (frameCount % 80 === 0){
      tubes1 = createSprite(500,45,500,280);
      tubes1.addImage(tube2Image);
      tubes1.scale=0.4;
      tubes1.velocityX= -4;
      tubes1.lifetime= 200;
      tubesGroup.add(tubes1)
       }
  }

function spawnDownTubes() {
    if (frameCount % 80 === 0){
      tubes = createSprite(500,350,600,580);
      tubes.addImage(tube1Image);
      tubes.scale=0.4;
      tubes.velocityX= -4;
      tubes.lifetime= 200;
      tubesGroup.add(tubes)
       }
  }

  function spawnClouds() {
    if (frameCount % 60 === 0){
      clouds = createSprite(500,200,600,580);
     clouds.y = Math.round(random(50,350));
      clouds.addImage(cloudsImage);
      clouds.scale=0.3;
      clouds.velocityX= -4;
      clouds.lifetime= 200;
      cloudsGroup.add(clouds)
       }
  }

function reset(){
  gameState = PLAY;
  restart.visible = false;
  
 tubesGroup.destroyEach();
 cloudsGroup.destroyEach();
  score = 0;
}