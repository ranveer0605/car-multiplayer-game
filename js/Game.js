class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage(car1Image);
    car2 = createSprite(300, 200);
    car2.addImage(car2Image);
    car3 = createSprite(500, 200);
    car3.addImage(car3Image);
    car4 = createSprite(700, 200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if (allPlayers !== undefined) {
      //var display_position = 100;
      background(groundImage);
      image(trackImage, 0, -windowHeight * 4, windowWidth, windowHeight * 5);
      //index of the array
      var index = 0;


      //x and y position of the cars
      var x = 375;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        x = x + 300;
        //use data form the database to display the cars in y direction
        y = windowHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          textSize(20);
          fill("white");
          text(allPlayers[plr].name, x, y - 60)
          fill("blue");
          ellipse(x, y, 60, 60)
          camera.position.x = windowWidth / 2;
          camera.position.y = cars[index - 1].y
        }

      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50
      player.update();
    }
    if (player.distance >= 5230) {
      gameState = 2
      player.rank += 1
      Player.updateCarsAtEnd(player.rank);
      textSize(30);
      fill("black")
      text(" Your Rank Is " + player.rank, width / 2 - 100, y - 250)
    }

    drawSprites();
  }
  end() {
    console.log(player.rank)
  }
}
