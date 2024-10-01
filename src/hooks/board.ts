import { useEffect } from 'react'
import { checkWinner, checkEndGame } from '../lib/utils'
import confetti from 'canvas-confetti'
import { TURNS } from '../lib/constants'
import {
	type UpdateBoardProps,
	type ResetGameProps,
	SocketValueProps,
} from '../types'
import { getSocketInstance } from './socket'
import { useBoardStore } from '../lib/stores/board.store'

export const useUpdateBoard = ({ setWinner, winner }: UpdateBoardProps) => {
	const board = useBoardStore((state) => state.board)
	const setTurn = useBoardStore((state) => state.setTurn)
	const changeIndexValue = useBoardStore((state) => state.changeIndexValue)

	const updateBoard = ({ index, value }: SocketValueProps) => {
		if (board[index] || winner) return

		changeIndexValue({ index, value })

		// change turn
		const newTurn = value === TURNS.X ? TURNS.O : TURNS.X
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

export const useResetGame = ({ setWinner }: ResetGameProps) => {
	const { socket } = getSocketInstance()
	const setBoard = useBoardStore((state) => state.setBoard)
	const setTurn = useBoardStore((state) => state.setTurn)

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
