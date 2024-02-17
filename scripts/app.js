// The setup:
//  This is where I am going to create the canvas for the animated background I want.
// Making a grid for main game and next piece

const playGrid = document.querySelector(".play-grid");
const playWidth = 10;
const playHeight = 20;
const playCellCount = playWidth * playHeight;
const playCells = [];

const nextGrid = document.querySelectorAll(".grid-4x4");
const nextWidth = 4;
const nextHeight = 4;
const nextCellCount = nextWidth * nextHeight;
const nextCells = [];



// Creating the shapes: I O T S Z J L
// define the shapes
// function to draw the shapes randomly
//
// core game mechanics / logic:
// // start the game
// creates variables such as score, level, lines cleared highscore etc.
// create functions for moving and rotating the shapes
// collision detection for the borders + placement
// function to update the board and clear complete lines
//
//
// game loop:
// track time - remember setInterval & clearInterval when game is over.
// update score
// store / update highscore
//
//
// controls
// event listeners for keyboard inputs (left, right, rotation, dropping down)
//
//
//


//////////////// CANVAS - MATRIX THEME /////////////////

const canvas = document.getElementById("tetris-matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tetrisShapes = ["I", "O", "T", "S", "Z", "J", "L"];
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px arial";

  for (let i = 0; i < drops.length; i++) {
    const text = tetrisShapes[Math.floor(Math.random() * tetrisShapes.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(draw, 85);

