import { create } from 'zustand'
import { type IBoardStore } from '../../types'
import { TURNS } from '../constants'

const initialValues = {
	board: Array(9).fill(null),
	turn: TURNS.X,
	winner: null,
}

export const useBoardStore = create<IBoardStore>((set) => ({
	...initialValues,
	setBoard: (board) => {
		set({
			board,
		})
	},
	setTurn(turn) {
		set({
			turn,
		})
	},
	setWinner(value) {
		set({
			winner: value,
		})
	},
	changeIndexValue({ index, value }) {
		set((state) => {
			const newBoard = [...state.board]
			newBoard[index] = value
			return { board: newBoard }
		})
	},
}))
