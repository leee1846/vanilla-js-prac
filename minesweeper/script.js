const tile_dataStatus = {
  hidden: "hidden",
  mine: "mine",
  number: "number",
  marked: "marked",
};

const createBoard = (boardSize, numberOfMines) => {
  const board = [];

  for (let x = 0; x < boardSize; x++) {
    const row = [];
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div");
      element.dataset.status = tile_dataStatus.hidden;

      const tile = {
        element,
        x,
        y,
      };

      row.push(tile);
    }
    board.push(row);
  }

  return board;
};

const board_Size = 10;
const number_Of_Mines = 2;
const board = createBoard(board_Size, number_Of_Mines);
const boardElement = document.querySelector(".board");
boardElement.style.setProperty("--size", board_Size);

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});
