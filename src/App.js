import CheckerBoard from './Components/CheckerBoard'
import React, { useState } from 'react';

function App() {

  // This is hardcoded for the intializing state of the board 
  // It will be updated at runtime as the game is played 
  const [pieces, setPieces] = useState([
    {
      "player": "1",
      "location": [0, 1],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [0, 3],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [0, 5],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [0, 7],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [1, 0],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [1, 2],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [1, 4],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [1, 6],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [2, 1],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [2, 3],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [2, 5],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "1",
      "location": [2, 7],
      "isKing": false,
      "isCaptured": false
    },


    {
      "player": "2",
      "location": [5, 0],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [5, 2],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [5, 4],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [5, 6],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [6, 1],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [6, 3],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [6, 5],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [6, 7],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [7, 0],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [7, 2],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [7, 4],
      "isKing": false,
      "isCaptured": false
    },
    {
      "player": "2",
      "location": [7, 6],
      "isKing": false,
      "isCaptured": false
    },
  ]);

  return ( 
    <div className="App">
      <center>
      <h1>React Checker Game</h1>
        <CheckerBoard playerPieces={pieces} setPieces={setPieces} />
      </center>
    </div>
  );
}

export default App;
