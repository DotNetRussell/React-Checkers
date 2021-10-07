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

    }

    console.log("Player allowed to move to selected space: " + canPlayerMove);
    return canPlayerMove;
  }

  function movePlayer(playerPiece, startingSpace, endingSpace) {

    let adjacentSpaceLower = startingSpace + 7;
    let adjacentSpaceUpper = startingSpace + 9;
    if (endingSpace == adjacentSpaceLower) {
      console.log("Moving space to adjacent lower space")
      setPieces(playerPieces.map((piece) => {
        if (piece === playerPiece) {
          let [row, column] = piece.location;
          row = row + 1;
          column = column - 1;
          console.log("Adjusting piece location: " + row + " " + column);
          piece.location = [row, column];
        }
      }));
    }
    else if (endingSpace == adjacentSpaceUpper) {
      console.log("Moving space to adjacent upper space")
      setPieces(playerPieces.map((piece) => {
        if (piece === playerPiece) {
          let [row, column] = piece.location;
          row = row + 1;
          column = column + 1;
          console.log("Adjusting piece location: " + row + " " + column);
          piece.location = [row, column];
        }
      }));
    }

    ReactDOM.unmountComponentAtNode(document.getElementById(startingSpace));

    var cells = document.getElementsByTagName("td");
    let checker = React.createElement(Checker, { color: playerPiece.player === "1" ? "red" : "black" }, '');
    ReactDOM.render(checker, document.getElementById(cells[endingSpace].id));

    console.log("Player moved");
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

      let [playerPiece, checkerCell] = getPlayerPiece(cellSelectedId);
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
          movePlayer(playerPiece, checkerCell, emptySelectedCell);
          document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
          _selectedCell = -1;
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
  }

  return (
    <div>
      <button className="start-button" onClick={startGame}>Start Game</button>
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