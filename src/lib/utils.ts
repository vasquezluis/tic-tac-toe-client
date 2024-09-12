import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { WINNER_COMBOS } from './constants'
import { type BoardValue } from '../types'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const saveGameToStorage = ({
	board,
	turn,
}: {
	board: BoardValue[]
	turn: string
}) => {
	window.localStorage.setItem('board', JSON.stringify(board))
	window.localStorage.setItem('turn', turn)
}

export const resetGameToStorage = () => {
	window.localStorage.removeItem('board')
	window.localStorage.removeItem('turn')
}

export const checkWinner = (boardToCheck: BoardValue[]) => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo

		if (
			boardToCheck[a] &&
			boardToCheck[a] === boardToCheck[b] &&
			boardToCheck[a] === boardToCheck[c]
		) {
			return boardToCheck[a]
		}
	}

	// no winner
	return null
}

export const checkEndGame = (newBoard: BoardValue[]) => {
	return newBoard.every((square) => square !== null)
}
