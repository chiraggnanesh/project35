var dog, happyDog;
var database;
var foodS, foodStock;
var x=0;

function preload(){
  normalDogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup(){
	createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 250);
  dog.scale = 0.2;
  dog.addImage(normalDogImg);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    console.log("I AM HERE");
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }
  drawSprites();

  textSize(20);
  fill("black")
  text("Food Remaining: " + foodS, 100, 150);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  console.log(x);
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
