var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;
var ground;
var score =0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);

  ground = createSprite(250, 420, 600, 20);
  ground.x = ground.width / 2;

  monkey = createSprite(50, 380, 20, 50);
  monkey.addAnimation("monkey_run", monkey_running);
  monkey.scale = 0.15;
  monkey.debug = true;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();

}


function draw() {
  background(40, 80, 60);

  ground.velocityX = -4;
  if (ground.x < 600) {
    ground.x = ground.width / 2;
  }
  monkey.collide(ground);

  if (keyDown("Space") && monkey.y >= 363) {
    monkey.velocityY = -12;

  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();    
    score = score + 2  ;
  }
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
  monkey.velocityY = monkey.velocityY + 0.5;
  console.log(monkey.y)

  food();
  obstacles();


  drawSprites();
  
  stroke = ("white");
  textSize(18);
  fill("white");
  text("Survival Time :" + survivalTime , 350, 50);
  
    
  stroke = ("yellow");
  textSize(18);
  fill("yellow");
  text("Score :" + score , 350, 80);
  
}

function food() {

  if (frameCount % 80 === 0) {
    banana = createSprite(500, 250, 20, 10);
    banana.y = Math.round(random(150, 230));
    banana.addImage(bananaImage);
    banana.scale = 0.13;
    banana.velocityX = -4;
    banana.lifetime = 125;
    FoodGroup.add(banana);
  }
}

function obstacles() {
  
  if (frameCount % 250 === 0) {
    obstacle = createSprite(500, 386, 10, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
    obstacle.lifetime = 125;
    obstacleGroup.add(obstacle);
  }
}