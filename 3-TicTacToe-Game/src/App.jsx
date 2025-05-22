import { useState } from "react";


function App() {

  const [board, setboard] = useState(Array(9).fill(null));
  const [isxturn, setisxturn] = useState(true);
  const [winner, setwinner] = useState(null);


  const winnercheck = () => {
    const combinations = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],

    ]
    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (board[a] && board[a] == board[b] && board[b] == board[c]) {
        return combinations[i];
      }
    }
    return null;
  }


  const isboardFull = (board) => {
    return board.every(square => square != null);
  }

  const handleclick = (index) => {
    // Add your logic here to update the game state and check for win conditions
    if (board[index] != null) {
      return;  // game is already over
    }

    const myboard = [...board];
    myboard[index] = isxturn ? "X" : "O";

    const checkwinner = winnercheck(myboard);
    if (checkwinner) {
      setboard(myboard);
      setwinner("winner " + myboard[checkwinner[0]]);
      return;
    }

    
    if (isboardFull(myboard)) {
      setwinner();
      return;  // game is over, no winner
    }
    
    setboard(myboard);
    setisxturn(!isxturn);
  }


  

  const rendrevalue = (index) => {
    return (
      <button onClick={() => handleclick(index)}
        className="w-16 h-16 text-2xl rounded-2xl border-solid border-2 border-sky-500 m-1 font-bold focus:outline-none focus:border-sky-500"
      >{board[index]}</button>
    )
  }

  const reset = () => {
    setboard(Array(9).fill(null));
    setisxturn(true);
    setwinner(null);
  }


  return (

    <div className="min-h-screen flex flex-col justify-center items-center border-4 p-4">
      <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => rendrevalue(index))}
      </div>

      {/* Restart Button */}
      <button
        onClick={reset}
        className="mt-8 px-6 py-2 text-2xl font-bold border-2 border-black rounded-2xl"
      >
        Restart
      </button>

      {/* Result Display */}
      {winner && (
        <div className="text-2xl font-bold mt-4 text-center text-green-600">
          {winner}
        </div>
      )}
    </div>
  )
}

export default App
