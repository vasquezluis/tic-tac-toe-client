import { useState } from 'react'

import { TURNS } from './lib/constants'
import Board from './components/Board'
import Turn from './components/Turn'
import {
	saveGameToStorage,
	checkEndGame,
	checkWinner,
	resetGameToStorage,
} from './lib/utils'
import confetti from 'canvas-confetti'
import Winner from './components/Winner'

function App() {
	const [winner, setWinner] = useState<string | null | boolean>(null)
	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem('board')
		return turnFromStorage ?? TURNS.X
	})
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem('board')
		if (boardFromStorage !== null) return JSON.parse(boardFromStorage)
		return Array(9).fill(null)
	})

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)

		resetGameToStorage()
	}

	const updateBoard = (index: number) => {
		// don't update if index has something
		if (board[index] || winner) return

		// update board
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)
		console.log(newBoard)

		// change turn
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)

		// save board to localStorage
		saveGameToStorage({
			board: newBoard,
			turn: newTurn,
		})

		// check for a winner
		const newWinner = checkWinner(newBoard)
		if (newWinner !== null) {
			confetti()
			setWinner(newWinner)
		} else if (checkEndGame(newBoard)) {
			setWinner(false)
		}
	}

	return (
		<main className='flex h-screen w-full flex-col items-center justify-center bg-neutral-800'>
			<h1 className='text-3xl font-bold text-white'>Tic Tac Toe</h1>

			<button
				className='m-3 rounded-md border border-neutral-500 px-3 py-2 font-bold text-neutral-300 transition-all hover:border-white hover:bg-neutral-950 hover:text-white'
				onClick={resetGame}
			>
				Resetear juego
			</button>

			<Turn turn={turn} />

			<Board board={board} updateBoard={updateBoard} />

			<Winner resetGame={resetGame} winner={winner} />
		</main>
	)
}

export default App
