import { useState, useEffect } from 'react'
import { checkWinner, checkEndGame } from '../lib/utils'
import confetti from 'canvas-confetti'
import { TURNS } from '../lib/constants'
import {
	type UpdateBoardProps,
	type ResetGameProps,
	SocketValueProps,
} from '../types'
import { getSocketInstance } from './socket'

export const useBoard = (): [
	Array<string | null>,
	React.Dispatch<React.SetStateAction<Array<string | null>>>,
] => {
	const [board, setBoard] = useState(Array(9).fill(null))

	return [board, setBoard]
}

export const useUpdateBoard = ({
	board,
	setBoard,
	setTurn,
	setWinner,
	winner,
}: UpdateBoardProps) => {
	const updateBoard = ({ index, value, player }: SocketValueProps) => {
		if (board[index] || winner) return

		setBoard((prevBoard) => {
			const newBoard = [...prevBoard]
			newBoard[index] = value
			return newBoard
		})

		// change turn
		const newTurn = player === TURNS.X ? TURNS.O : TURNS.X
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
	const { socket } = getSocketInstance()

	const handleResetGame = () => {
		resetGameLocal()
		socket.emit('resetGame')
	}

	const resetGameLocal = () => {
		setBoard(Array(9).fill(null))
		setTurn(TURNS.X)
		setWinner(null)
	}

	return { handleResetGame, resetGameLocal }
}
