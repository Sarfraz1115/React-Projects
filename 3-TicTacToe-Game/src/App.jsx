import { useState } from "react";


function App() {

  const [board, setboard] = useState(Array(9).fill(null));
  const [isxturn, setisxturn] = useState(true);
  const [winner, setwinner] = useState(null);


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
    setboard(myboard);
    setisxturn(!isxturn);
    const checkwinner = winnercheck(myboard);

    if (isboardFull(myboard)) {
      setwinner();
      return;  // game is over, no winner
    }
    if (checkwinner) {
      setwinner("winner " + myboard[checkwinner[0]]);
    }
  }


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

  const rendrevalue = (index) => {
    return (
      <button onClick={() => handleclick(index)}
        className="w-16 h-16 text-2xl rounded-2xl border-solid border-2 border-sky-500 m-1 font-bold "
      >{board[index]}</button>
    )
  }

  const reset = () => {
    setboard(Array(9).fill(null));
    setisxturn(true);
    setwinner(null);
  }


  return (
    <>
      <h1 className="heading text-2xl font-bold justify-center flex">Tic Tac Toe</h1>


      <div className="main flex justify-center items-center ">
        <div className="board  justify-center ">
          <div className="firstrow">
            {rendrevalue(0)}
            {rendrevalue(1)}
            {rendrevalue(2)}
          </div>
          <div className="secondRow">
            {rendrevalue(3)}
            {rendrevalue(4)}
            {rendrevalue(5)}
          </div>
          <div className="Thirdrow">
            {rendrevalue(6)}
            {rendrevalue(7)}
            {rendrevalue(8)}
          </div>
        </div>
      </div>
      <button onClick={reset} className="font-bold text-2xl block m-auto mt-8 rounded-2xl border-solid border-2 border-black w-36">Restart</button>
      <div className="text-2xl font-bold text-center mt-8">{winner ? "The winner is " + winner : ""}</div>
      <div className="text-2xl font-bold text-center mt-8">{isboardFull(board) ? "The Game is Tie " : ""}</div>



    </>
  )
}

export default App
