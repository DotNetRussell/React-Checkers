import Checker from './Checker'
import * as React from 'react';
import ReactDOM from 'react-dom';

function CheckerBoard({ playerPieces, setPieces }) {
  let _selectedCell = -1;
  let _playersTurn = 1;


  function drawBoard() {
    var cells = document.getElementsByTagName("td");
    for (var x = 0; x < cells.length; x++) {
      cells[x].id = x;
      playerPieces.forEach((piece) => {
        var [pieceRow, pieceColumn] = piece.location;

        var pieceCell = (parseInt(pieceRow) * 8) + parseInt(pieceColumn);
        if (pieceCell === x) {
          let checker = React.createElement(Checker, { color: piece.player === "1" ? "red" : "black" }, '');
          ReactDOM.render(checker, document.getElementById(cells[pieceCell].id));
        }
      });
    };
    console.log("Board Drawn");
  }

  function getPlayerPiece(selectedCell) {
    let playerPiece = null;
    let checkerCell = null;
    playerPieces.forEach((piece) => {
      let [row, column] = piece.location;
      let cellTranslation = (row * 8) + column;
      if (parseInt(cellTranslation) === parseInt(selectedCell)) {
        playerPiece = piece;
        checkerCell = cellTranslation;
      }
    });
    return [playerPiece, checkerCell];
  }

  function canPlayerMoveChecker(playerPiece) {
    let isPlayersTurn = parseInt(_playersTurn) === parseInt(playerPiece.player);
    console.log("Selected Current Player's Checker: " + isPlayersTurn);
    console.log("Current Player: " + _playersTurn);
    return isPlayersTurn;
  }

  function canCheckerMoveToSelectedSpace(pieceCell, selectedCell) {
    console.log("Player Piece Cell: " + pieceCell);
    console.log("Selected Cell: " + selectedCell);
    let canPlayerMove = false;
    if (parseInt(_playersTurn) === 1) {
      let adjacentSpaceLower = pieceCell + 7;
      let adjacentSpaceUpper = pieceCell + 9;
      let lowerAdjacentCell = document.getElementById(adjacentSpaceLower);
      let upperAdjacentcell = document.getElementById(adjacentSpaceUpper);

      // is testSpace adjacent and in the correct direction 
      // is testSpace empty
      if (selectedCell === lowerAdjacentCell.id && lowerAdjacentCell.children.length === 0) {
        canPlayerMove = true;
      }
      else if (selectedCell === upperAdjacentcell.id && upperAdjacentcell.children.length === 0) {
        canPlayerMove = true;
      }
      else if (canPlayerJump(pieceCell, selectedCell)){
        canPlayerMove = true;
      }

    }
    else if (parseInt(_playersTurn) === 2) {
      let adjacentSpaceLower = pieceCell - 7;
      let adjacentSpaceUpper = pieceCell - 9;
      let lowerAdjacentCell = document.getElementById(adjacentSpaceLower);
      let upperAdjacentcell = document.getElementById(adjacentSpaceUpper);

      // is testSpace adjacent and in the correct direction 
      // is testSpace empty
      if (selectedCell === lowerAdjacentCell.id && lowerAdjacentCell.children.length === 0) {
        canPlayerMove = true;
      }
      else if (selectedCell === upperAdjacentcell.id && upperAdjacentcell.children.length === 0) {
        canPlayerMove = true;
      }
      else if (canPlayerJump(pieceCell, selectedCell)) {
        canPlayerMove = true;
      }
    }


    console.log("Player allowed to move to selected space: " + canPlayerMove);
    return canPlayerMove;
  }

  function isSpaceVacant(spaceNumber) {
    return document.getElementById(spaceNumber).children.length == 0;
  }

  function checkIsSpaceAdjacent(rootSpace, adjacentSpace) {
    let _adjacentSpace = parseInt(adjacentSpace);
    return rootSpace + 9 === _adjacentSpace || rootSpace + 7 === _adjacentSpace || rootSpace - 7 === _adjacentSpace || rootSpace - 9 === _adjacentSpace;
  }

  function canPlayerJump(startingSpace, endingSpace) {
    let _endingSpace = parseInt(endingSpace);
    let canJumpLowerAdjacent = false;
    let canJumpUpperAdjacent = false;
    let canPlayerJump = false;
    if (parseInt(_playersTurn) === 1) {
      let adjacentSpaceLower = startingSpace + 7;
      let adjacentSpaceUpper = startingSpace + 9;
      let adjacentCellLower = document.getElementById(adjacentSpaceLower);
      let adjacentCellUpper = document.getElementById(adjacentSpaceUpper);
      let adjacentLowerSpaceContainsEnemyPlayer = adjacentCellLower.children.length > 0 && adjacentCellLower.children[0].style.backgroundColor === "black";
      let adjacentUpperSpaceContainsEnemyPlayer = adjacentCellUpper.children.length > 0 && adjacentCellUpper.children[0].style.backgroundColor === "black";


      if (adjacentLowerSpaceContainsEnemyPlayer) {
        let isEndingSpaceVacant = isSpaceVacant(_endingSpace);
        let isSpaceAdjacent = checkIsSpaceAdjacent(adjacentSpaceLower, _endingSpace);
        canJumpLowerAdjacent = (_endingSpace === (parseInt(adjacentCellLower.id) + 7)) && isEndingSpaceVacant && isSpaceAdjacent;
        console.log("Player 1 allowed to jump lower adjacent: " + canJumpLowerAdjacent + " Space: " + (parseInt(adjacentCellLower.id) + 7) + " Ending Space: " + _endingSpace);
      }

      if (adjacentUpperSpaceContainsEnemyPlayer) {
        let isEndingSpaceVacant = isSpaceVacant(_endingSpace);
        let isSpaceAdjacent = checkIsSpaceAdjacent(adjacentSpaceUpper, _endingSpace);
        canJumpUpperAdjacent = (_endingSpace === (parseInt(adjacentCellUpper.id) + 9)) && isEndingSpaceVacant && isSpaceAdjacent;
        console.log("Player 1 allowed to jump upper adjacent: " + canJumpLowerAdjacent + " Space: " + (parseInt(adjacentCellUpper.id) + 9) + " Ending Space: " + _endingSpace);
      }

      canPlayerJump = canJumpLowerAdjacent || canJumpUpperAdjacent;
    }
    else if (parseInt(_playersTurn) === 2) {
      let adjacentSpaceLower = startingSpace - 7;
      let adjacentSpaceUpper = startingSpace - 9;
      let adjacentCellLower = document.getElementById(adjacentSpaceLower);
      let adjacentCellUpper = document.getElementById(adjacentSpaceUpper);
      let adjacentLowerSpaceContainsEnemyPlayer = adjacentCellLower.children.length > 0 && adjacentCellLower.children[0].style.backgroundColor === "red";
      let adjacentUpperSpaceContainsEnemyPlayer = adjacentCellUpper.children.length > 0 && adjacentCellUpper.children[0].style.backgroundColor === "red";

      if (adjacentLowerSpaceContainsEnemyPlayer) {
        let isEndingSpaceVacant = isSpaceVacant(_endingSpace);
        let isSpaceAdjacent = checkIsSpaceAdjacent(adjacentSpaceLower, _endingSpace);
        canJumpLowerAdjacent = (_endingSpace === (parseInt(adjacentCellLower.id) - 7)) && isEndingSpaceVacant && isSpaceAdjacent;
        console.log("Player 2 allowed to jump lower adjacent: " + canJumpLowerAdjacent + " Space: " + (parseInt(adjacentCellLower.id) - 7) + " Ending Space: " + _endingSpace);
      }

      if (adjacentUpperSpaceContainsEnemyPlayer) {
        let isEndingSpaceVacant = isSpaceVacant(_endingSpace);
        let isSpaceAdjacent = checkIsSpaceAdjacent(adjacentSpaceUpper, _endingSpace);
        canJumpUpperAdjacent = (_endingSpace === (parseInt(adjacentCellUpper.id) - 9)) && isEndingSpaceVacant && isSpaceAdjacent;
        console.log("Player 2 allowed to jump upper adjacent: " + canJumpUpperAdjacent + " Space: " + (parseInt(adjacentCellUpper.id) - 9) + " Ending Space: " + _endingSpace);
      }

      canPlayerJump = canJumpLowerAdjacent || canJumpUpperAdjacent;
    }
    return canPlayerJump;
  }

  function movePlayer(playerPiece, startingSpace, endingSpace) {
    let playerWasMoved = false;

    if (parseInt(_playersTurn) === 1) {
      let adjacentSpaceLower = startingSpace + 7;
      let adjacentSpaceUpper = startingSpace + 9;

      if (parseInt(endingSpace) === adjacentSpaceLower) {
        console.log("Moving space to adjacent lower space")
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            row = row + 1;
            column = column - 1;
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;
          }
          return piece;
        }));
      }
      else if (parseInt(endingSpace) === adjacentSpaceUpper) {
        console.log("Moving space to adjacent upper space")
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            row = row + 1;
            column = column + 1;
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;
          }
          return piece;
        }));
      }
      else if (canPlayerJump(startingSpace, endingSpace)) {
        console.log("Jumping Player");
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            var tempStartPosition = startingSpace - (row * 8)
            row = Math.floor(endingSpace / 8);
            var tempEndPosition = endingSpace - (row * 8);
            column = column + ((tempEndPosition > tempStartPosition) ? 2 : -2);
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;


            let adjacentSpaceLower = startingSpace + 7;
            let adjacentSpaceUpper = startingSpace + 9;
            let adjacentCellLower = document.getElementById(adjacentSpaceLower);
            let adjacentCellUpper = document.getElementById(adjacentSpaceUpper);
            let adjacentLowerSpaceContainsEnemyPlayer = adjacentCellLower.children.length > 0 && adjacentCellLower.children[0].style.backgroundColor === "black";
            let adjacentUpperSpaceContainsEnemyPlayer = adjacentCellUpper.children.length > 0 && adjacentCellUpper.children[0].style.backgroundColor === "black";

            if ((tempEndPosition < tempStartPosition) && adjacentLowerSpaceContainsEnemyPlayer) {
              ReactDOM.unmountComponentAtNode(adjacentCellLower);
            }
            else if ((tempEndPosition > tempStartPosition) && adjacentUpperSpaceContainsEnemyPlayer) {
              ReactDOM.unmountComponentAtNode(adjacentCellUpper);
            }
          }
          return piece;
        }));
      }
    }
    else if (parseInt(_playersTurn) === 2) {
      let adjacentSpaceLower = startingSpace - 7;
      let adjacentSpaceUpper = startingSpace - 9;

      if (parseInt(endingSpace) === adjacentSpaceLower) {
        console.log("Moving space to adjacent lower space")
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            row = row - 1;
            column = column + 1;
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;
          }
          return piece;
        }));
      }
      else if (parseInt(endingSpace) === adjacentSpaceUpper) {
        console.log("Moving space to adjacent upper space")
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            row = row - 1;
            column = column - 1;
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;
          }
          return piece;
        }));
      }
      else if (canPlayerJump(startingSpace, endingSpace)) {
        console.log("Jumping Player");
        setPieces(playerPieces.map((piece) => {
          if (piece === playerPiece) {
            let [row, column] = piece.location;
            console.log("DEBUG: " + row + " " + column);
            var tempStartPosition = startingSpace - (row * 8)
            row = Math.floor(endingSpace / 8);
            var tempEndPosition = endingSpace - (row * 8);

            column = column + ((tempEndPosition > tempStartPosition) ? 2 : -2);
            console.log("DEBUG: " + row + " " + column);
            console.log("Adjusting piece location: " + row + " " + column);
            piece.location = [row, column];
            playerWasMoved = true;


            let adjacentSpaceLower = startingSpace - 7;
            let adjacentSpaceUpper = startingSpace - 9;
            let adjacentCellLower = document.getElementById(adjacentSpaceLower);
            let adjacentCellUpper = document.getElementById(adjacentSpaceUpper);
            let adjacentLowerSpaceContainsEnemyPlayer = adjacentCellLower.children.length > 0 && adjacentCellLower.children[0].style.backgroundColor === "red";
            let adjacentUpperSpaceContainsEnemyPlayer = adjacentCellUpper.children.length > 0 && adjacentCellUpper.children[0].style.backgroundColor === "red";

            if ((tempEndPosition > tempStartPosition) && adjacentLowerSpaceContainsEnemyPlayer) {
              ReactDOM.unmountComponentAtNode(adjacentCellLower);
            }
            else if ((tempEndPosition < tempStartPosition) && adjacentUpperSpaceContainsEnemyPlayer) {
              ReactDOM.unmountComponentAtNode(adjacentCellUpper);
            }
          }
          return piece;
        }));
      }
    }
    
    ReactDOM.unmountComponentAtNode(document.getElementById(startingSpace));

    var cells = document.getElementsByTagName("td");
    let checker = React.createElement(Checker, { color: playerPiece.player === "1" ? "red" : "black" }, '');
    ReactDOM.render(checker, document.getElementById(cells[endingSpace].id));

    console.log("Player was moved: " + playerWasMoved);
    return playerWasMoved;
  }


  function onCellSelected(e) {
    console.log('');
    console.log("PLAYER INTERACTION STARTED:")
    let cellSelectedId = -1;
    if (e.target.id)
      cellSelectedId = e.target.id;
    else {
      cellSelectedId = e.target.parentElement.id;
    }

    let cell = document.getElementById(cellSelectedId);

    // A cell with a checker in it was selected
    if (cell.children.length > 0) {

      let [playerPiece, ] = getPlayerPiece(cellSelectedId);
      if (canPlayerMoveChecker(playerPiece)) {
        console.log("Cell has Checker and it's correct player");
        cell.style.backgroundColor = "lightgreen";

        // A new cell was selected, reset the background of the previously selected cell
        if (_selectedCell !== -1 && _selectedCell !== cellSelectedId) {
          document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
          _selectedCell = cellSelectedId
          console.log("Space selected and previous space deselected");
        }
        // Selected cell was already selected, so we need to deselected it 
        else if (_selectedCell === cellSelectedId) {
          document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
          _selectedCell = -1;
          console.log("Space deselected");
        }
        // A new cell was selected
        else {
          _selectedCell = cellSelectedId
          console.log("Space selected")
        }
      }
      else {
        console.log("Not players turn");
      }
    }
    // A cell with no checker was selected
    else {
      let emptySelectedCell = cell.id;
      if (_selectedCell > 0) {

        let [playerPiece, checkerCell] = getPlayerPiece(_selectedCell);

        if (playerPiece !== null && canPlayerMoveChecker(playerPiece)
          && canCheckerMoveToSelectedSpace(checkerCell, emptySelectedCell, playerPiece)) {
          console.log("Player can move");
          let playerWasMoved = movePlayer(playerPiece, checkerCell, emptySelectedCell);

          if (playerWasMoved) {
            document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
            _selectedCell = -1;

            _playersTurn = _playersTurn === 1 ? 2 : 1;
            document.getElementById("player-turn-field").innerHTML = _playersTurn;
            console.log("Player changed to player:  " +  _playersTurn );
          }
        } 
      }
    }
  }

  function startGame() {
    drawBoard();
    var cells = document.getElementsByTagName("td");
    for (var x = 0; x < cells.length; x++) {
      cells[x].onclick = onCellSelected;
    }
    document.getElementById("start-button").style.display = "none";
    console.log("GAME-STARTED");
  }

  return (
    <div>

      <span className="game-header"><h2 className="player-indicator">Current Player's Turn: <span id="player-turn-field"> {_playersTurn}</span></h2><button id="start-button" className="start-button" onClick={startGame}>Start Game</button></span>

      <table>
        <tbody>
          <tr id="row-0" className="even-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-1" className="odd-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-2" className="even-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-3" className="odd-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-4" className="even-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-5" className="odd-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-6" className="even-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
          <tr id="row-7" className="odd-row"><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td><td className="even-space"></td><td className="odd-space"></td></tr>
        </tbody>
      </table>
    </div>
  );
}

export default CheckerBoard;