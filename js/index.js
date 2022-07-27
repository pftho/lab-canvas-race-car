//Create a board
const canvas = document.querySelector("#canvas"); //grabbing the element from the HTML
canvas.style.border = "2px solid grey";
let ctx = canvas.getContext("2d"); //setting up the context

// Grabbing the start streen from the HTML
let startScreen = document.querySelector(".game-intro");

let intervalId = 0;
let isGameOver = false;
let score = 0;

// Setting up background
let background = new Image();
background.src = "images/road.png";

// Setting up music
let music = new Audio();
music.src = "music/music.mp3";

// Setting up the car
let car = new Image();
car.src = "images/car.png";
let carX = 250;
let carY = 400;
let carWidth = 80;
let carLength = 130;

// Setting up the car obstacle
let obCar = new Image();
obCar.src = "images/car.png";
let obCarX = 300;
let obCarY = -400;

//Setting up a dog obstacle
let obDog = new Image();
obDog.src = "images/dog.png";
let obDogX = 100;
let obDogY = -600;
let dogWidth = 100;
let dogLength = 50;

//defining behavior on page load
window.onload = () => {
  canvas.style.display = "none";
  document.getElementById("start-button").onclick = () => {
    startGame();
    music.play();
  };

  //Making sure the car is on the road and enable right and left movement
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 4;
    } else if (event.code === "ArrowLeft" && carX > 50) {
      carX -= 4;
    }
  });

  // generate random X coordonates for obstacles

  // defining what the game does
  function startGame() {
    // hide start panel and display road
    canvas.style.display = "block";
    startScreen.style.display = "none";

    //drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);
    ctx.drawImage(obDog, obDogX, obDogY, dogWidth, dogLength);

    //obCar movement & position X
    let minX = 50;
    let maxX = canvas.width - 150;

    obCarY += 2;
    if (obCarY > canvas.height) {
      obCarY = -400;
      obCarX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
      score++;
    }

    obDogY += 2;
    if (obDogY > canvas.height) {
      obDogY = -400;
      obDogX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
      score++;
    }

    //collision with cars
    if (
      carY < obCarY + carLength &&
      carX < obCarX + carWidth - 5 &&
      carX + carWidth > obCarX &&
      carY + carLength > obCarY
    ) {
      isGameOver = true;
    }

    if (
      carY < obDogY + dogLength &&
      carX < obDogX + dogWidth - 5 &&
      carX + dogWidth > obDogX &&
      carY + dogLength > obDogY
    ) {
      isGameOver = true;
    }

    //scoreboard
    ctx.font = "30px Georgia";
    ctx.fillText(`Score:${score}`, 100, 40);

    // Get the game

    intervalId = requestAnimationFrame(startGame);

    if (isGameOver) {
      music.pause();
      cancelAnimationFrame(intervalId);
      ctx.fillStyle = "rgb(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgb(255,0,0)";
      ctx.fillText("Game Over", 185, 340);
      ctx.fillStyle = "rgb(0,0,0)";

      setTimeout(() => {
        startScreen.style.display = "block";
        canvas.style.display = "none";
        isGameOver = false;
        obDogX = 100;
        obDogY = -600;
        obCarX = 300;
        obCarY = -400;
      }, 2000);
    }
  }
};
