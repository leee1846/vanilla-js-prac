const board_Size = 2;
const number_Of_Mines = 1;
const tile_dataStatus = {
  hidden: "hidden",
  mine: "mine",
  number: "number",
  marked: "marked",
};

//0부터 가로 갯수보다 적은 숫자만큼의 랜덤숫자만드는 함수
const randomNumber = (size) => {
  return Math.floor(Math.random() * size);
};

const positionMatch = (a, b) => {
  return a.x === b.x && a.y === b.y;
};

//중복되지 않는 랜덤으로 x,y값 array만드는 함수
const getMinePositions = (boardSize, numberOfMines) => {
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
};

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

const markTile = (tile) => {
  if (
    tile.status !== tile_dataStatus.hidden &&
    tile.status !== tile_dataStatus.marked
  ) {
    return;
  }

  if (tile.status === tile_dataStatus.marked) {
    tile.status = tile_dataStatus.hidden;
  } else {
    tile.status = tile_dataStatus.marked;
  }
};

const revealTile = (tile, board) => {
  if (tile.status !== tile_dataStatus.hidden) {
    return;
  }

  if (tile.mine) {
    tile.status = tile_dataStatus.mine;
    return;
  }

  tile.status = tile_dataStatus.number;
  const adjacentTiles = nearbyTiles(board, tile);
  const mines = adjacentTiles.filter((t) => t.mine);
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
};

const nearbyTiles = (board, { x, y }) => {
  const tiles = [];

  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset];
      if (tile) tiles.push(tile);
    }
  }

  return tiles;
};

const board = createBoard(board_Size, number_Of_Mines);
const boardElement = document.querySelector(".board");
const messageText = document.querySelector(".subtext");
const minesLeftText = document.querySelector("[mine-count]");
boardElement.style.setProperty("--size", board_Size);

//minesweeper ui화면에 구현
board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);

    //클릭이벤트 적용
    tile.element.addEventListener("click", () => {
      revealTile(tile, board);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

//상단 minesLeft값 적용
minesLeftText.textContent = number_Of_Mines;

const listMinesLeft = () => {
  const markedTilesCount = board.reduce((acc, row) => {
    return (
      acc + row.filter((tile) => tile.status === tile_dataStatus.marked).length
    );
  }, 0);

  minesLeftText.textContent = number_Of_Mines - markedTilesCount;
};

const checkWin = (board) => {};

const checkLose = (board) => {
  return true;
};

const stopProp = (e) => e.stopImmediatePropagation();

const checkGameEnd = () => {
  const win = checkWin(board);
  const lose = checkLose(board);
  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You Win";
  }

  if (lose) {
    messageText.textContent = "You Lose";
  }
};
