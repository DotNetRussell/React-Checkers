import Checker from './Checker'
import * as React from 'react';
import ReactDOM from 'react-dom';

function CheckerBoard({ playerPieces }) {

  function drawBoard() {
    var cells = document.getElementsByTagName("td");
    for (var x = 0; x < cells.length; x++) {
      cells[x].id = x;
      playerPieces.forEach((piece) => {
        var [pieceRow, pieceColumn] = piece.location;

        var pieceCell = (parseInt(pieceRow) * 8) + parseInt(pieceColumn);
        if (pieceCell == x) {
          let checker = React.createElement(Checker, { color: piece.player === "1" ? "red" : "black" }, '');
          ReactDOM.render(checker, document.getElementById(cells[pieceCell].id));
        }

      });
    };
  }

  let _selectedCell = -1;

  function onCellSelected(e) {
    let cellSelectedId = -1;
    if (e.target.id)
      cellSelectedId = e.target.id;
    else {
      cellSelectedId = e.target.parentElement.id;
    }

    let cell = document.getElementById(cellSelectedId);
    if (cell.children.length > 0) {
      console.log("Has Checker");
      cell.style.backgroundColor = "lightgreen";

      // No cell was selected yet
      if (_selectedCell != -1 && _selectedCell != cellSelectedId) {
        document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
      }
      // Selected cell was already selected
      else if (_selectedCell == cellSelectedId) {
        document.getElementById(_selectedCell).style.backgroundColor = "lightgray";
        _selectedCell = -1;
        return;
      }
      // A new cell was selected
      _selectedCell = cellSelectedId
    }
    else {
      if (_selectedCell > 0) {

      }
      console.log("Has no Checker");
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