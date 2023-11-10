const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessangetextElement = document.querySelector(
  "[data-winning-message-text]"
);
const winningMessange = document.querySelector("[data-winning-message]");
const restartbutton = document.querySelector(
  "[data-restart-button]"
);

let iscircleturn;

const winningCombinations =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const startGame = () => {
  for (const cell of cellElements) {
    cell.classList.remove("circle");
    cell.classList.remove("x");
    cell.removeEventListener("click", handleclick);
    cell.addEventListener("click", handleclick, { once: true });
  }

  iscircleturn = false;

  board.classList.add("x");
  winningMessange.classList.remove("show-winning-message");
}

const endGame = (isdraw) => {
  if (isdraw) {
      winningMessangetextElement.innerText = "Empate!";
  }  else {
       winningMessangetextElement.innerText = iscircleturn
        ? "Bolinha venceu!" 
        : "X venceu!";
  }

  winningMessange.classList.add("show-winning-message");
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
          return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [ ... cellElements].every((cell) => {
      return cell.classList.contains("x") || cell.classList.contains("circle")   
    });
}  

const placeMark = (cell, classtoadd) => {
  cell.classList.add(classtoadd);
};

const swapTurns = () => {
  iscircleturn = !iscircleturn;
  board.classList.remove('circle', 'x');
  board.classList.add(iscircleturn ? "circle" : "x");
};

const handleclick = (e) => {
  // Colocar os Elementos (x ou círculo)
  const cell = e.target;
  const classtoadd = iscircleturn ? "circle" : "x";

  placeMark(cell, classtoadd);

  // Verificar por Vitória  
  const iswin = checkForWin(classtoadd);
  
  const isdraw = checkForDraw();
  if (iswin) {
    endGame(false);
  }  else if (isdraw) {
      endGame(true)
  }
  
  // Verificar por Empate 
  const isDraw = checkForDraw();

  if (iswin) {
      endGame(false);
    } else if (isdraw) {
        endGame(true);
    } else {
      swapTurns();
    }
  };

startGame();

restartbutton.addEventListener("click", startGame);
