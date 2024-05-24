"use strict";

const gameInfo = document.querySelector("#game-info"); //fetch gameInfo element
const boxes = document.querySelectorAll(".box"); // fetch all boxes
const newGameBtn = document.querySelector(".btn"); // fetch newGame Btn

let currentPlayer; // Current Player initail
let gameGrid; // gameGrid initailize
// winning Position Declare
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// initGame new Game me krne function call hoga
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // UI pr remove the old element, bgcolor and enable pointer
  boxes.forEach((box) => {
    box.innerText = "";
    // remove green color remove, initalse with css property again
    box.classList.remove("bg-[rgba(0,225,0,0.3)]");
    // Enable pointer
    box.style.pointerEvents = "auto";
  });
  // initial game me newGame btn show nhi hoga
  newGameBtn.classList.add("scale-0");
  // starting current player Info
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
// call initGame
initGame();

// newGameBtn click krne pr initGame call hoga
newGameBtn.addEventListener("click", initGame);

// each boxes pr click event
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// each box pr ye function chalega
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    // Swap turn
    swapTrun();

    // Check win, Tie
    checkGameOver();
  }
}

// Swapping the Turn
function swapTrun() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// Check the Win and Tie
function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) => {
    // each box non empty ho or each box ka element match kre
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // Agar X winner Hota hai
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      // Winner Hone ke bad box pr element nh aye [Disable pointer]
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // now we kown is a winner bgcolor
      boxes[position[0]].classList.add("bg-[rgba(0,225,0,0.3)]");
      boxes[position[1]].classList.add("bg-[rgba(0,225,0,0.3)]");
      boxes[position[2]].classList.add("bg-[rgba(0,225,0,0.3)]");
    }
  });

  //  it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.remove("scale-0");
    return;
  }

  // let's check whether there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  // board is filled, game is TIE
  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.remove("scale-0");
  }
}
