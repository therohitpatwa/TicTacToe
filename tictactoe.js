const prompt = require("prompt-sync")();

let gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

let currentPlayer = "❎";

let gameActive = true;

function printBoard() {
    console.log(`
        ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        -----------
        ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        -----------
        ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `);
}



function handleMove(position) {
    if (gameBoard[position] === " ") {
        gameBoard[position] = currentPlayer;
    }
    else {
        console.log("Cell already taken,choose one.");
        return false;
    }
    if (checkWin()) {
        printBoard();
        console.log(`Player ${currentPlayer} wins!`)
        gameActive = false;
        return true;
    }

    if (gameBoard.every((cell) => cell !== " ")) {
        printBoard();
        console.log("It's a Draw!");
        gameActive = false;
        return true;
    }

    currentPlayer = currentPlayer === "❎" ? "0️⃣" : "❎";
    return true;

}


function checkWin()
{
    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 9]
    ];
    return conditions.some((condition) => {
        const [a, b, c] = condition;
        return (
            gameBoard[a] === currentPlayer &&
            gameBoard[b] === currentPlayer &&
            gameBoard[c] === currentPlayer
        );
    });
}



while (gameActive) {
  printBoard();
  const position = prompt(`Player ${currentPlayer}, enter your move (1-9): `);

  if (position-1 >= 0 && position-1 <= 8) {
    handleMove(parseInt(position-1));
  } else {
    console.log("Invalid position, enter a number between 1 and 9.");
  }
}






