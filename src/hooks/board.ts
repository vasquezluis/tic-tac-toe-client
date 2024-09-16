import { useState, useEffect } from 'react'
import { checkWinner, checkEndGame } from '../lib/utils'
import confetti from 'canvas-confetti'
import { TURNS } from '../lib/constants'
import { resetGameToStorage } from '../lib/utils'
import {
	type UpdateBoardProps,
	type ResetGameProps,
	SocketProps,
} from '../types'

export const useBoard = (): [
	Array<string | null>,
	React.Dispatch<React.SetStateAction<Array<string | null>>>,
] => {
	const [board, setBoard] = useState(Array(9).fill(null))

	return [board, setBoard]
}

export const useUpdateBoard = ({
	board,
	turn,
	setBoard,
	setTurn,
	setWinner,
	winner,
}: UpdateBoardProps) => {
	const updateBoard = ({ index, value }: SocketProps) => {
		if (board[index] || winner) return

		console.log({ index, value })

		setBoard((prevBoard) => {
			const newBoard = [...prevBoard]
			newBoard[index] = value
			return newBoard
		})

		// change turn
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)
	}

	useEffect(() => {
		// check for a winner
		const newWinner = checkWinner(board)
		if (newWinner !== null) {
			confetti()
			setWinner(newWinner)
		} else if (checkEndGame(board)) {
			setWinner(false)
		}
	}, [board])

	return { updateBoard }
}

export const useResetGame = ({
	setBoard,
	setTurn,
	setWinner,
}: ResetGameProps) => {
	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)

		resetGameToStorage()
	}

	return resetGame
}
