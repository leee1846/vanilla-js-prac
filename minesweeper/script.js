const board_Size = 10;
const number_Of_Mines = 2;
const tile_dataStatus = {
  hidden: "hidden",
  mine: "mine",
  number: "number",
  marked: "marked",
};

//0부터 가로 갯수보다 적은 숫자만큼의 랜덤숫자만드는 함수
function randomNumber(size) {
  return Math.floor(Math.random() * size);
}

function positionMatch(a, b) {
  return a.x === b.x && a.y === b.y;
}

//중복되지 않는 랜덤으로 x,y값 array만드는 함수
function getMinePositions(boardSize, numberOfMines) {
  const positions = [];

  while (positions.length < numberOfMines) {
    const position = {
      x: randomNumber(boardSize),
      y: randomNumber(boardSize),
    };

    if (!positions.some(positionMatch.bind(null, position))) {
      positions.push(position);
    }
  }

  return positions;
}

const createBoard = (boardSize, numberOfMines) => {
  const board = [];
  const minePositions = getMinePositions(boardSize, numberOfMines);

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = tile_dataStatus.hidden;

      const tile = {
        element,
        x,
        y,
        mine: minePositions.some(positionMatch.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };

      row.push(tile);
    }
    board.push(row);
  }

  return board;
};

//minesweeper ui화면에 구현
const board = createBoard(board_Size, number_Of_Mines);
const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", board_Size);

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});
console.log(board);
