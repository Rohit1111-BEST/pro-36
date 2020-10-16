//Create variables here
var dog,happyDog;
var database;
var foodS,foodStock,addFood,labFed
var upArrow,downArrow
var fedTime,lastFed
var foodObj

function preload()
{

  //load images here
  dog1 = loadImage("Dog.png");
  dog2 = loadImage("happydog.png");

}


function setup() {
	createCanvas(500, 500);
  database=firebase.database();


  foodObj = new Food();

  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  

  foodstock=database.ref('Food')
  foodstock.on("value", readStock)
  dog = createSprite(200,200,40,40);
  dog.addImage("Dog",dog1)
  dog.addImage("happydog",dog2)
  dog.scale= 0.3;
}


function draw() {  
background(46, 139, 87);



fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
    lastFed=data.val();
})

  drawSprites();
  textSize(25);
  fill("black");
  stroke("black");
  //add styles here
text("Press up arrow to feed the dog", 150,20)

foodObj.display();

if(lastFed>12){
  text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }
  else if(lastFed==0){
  text("Last Fed : 12 AM", 350, 30)
  }
  else{
      text("Last Fed : "+ lastFed +"AM", 350,30)
  }
  }

function feedDog(){
  dog.changeImage("happydog",dog2)
foodS--
database.ref('/').update({
  Food:foodS,
  FeedTime:hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(){
  var foodref = database.ref("Food")
  foodref.on("value",function(data){
      foodS=data.val()
  })
}



function deductFoodCount(){
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

