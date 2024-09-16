import { useState, Dispatch, SetStateAction } from 'react'
import { TURNS } from '../lib/constants'

export const useTurn = (): [string, Dispatch<SetStateAction<string>>] => {
	const [turn, setTurn] = useState<string>(() => {
		const turnFromStorage = window.localStorage.getItem('board')
		return turnFromStorage ?? TURNS.X
	})

	return [turn, setTurn]
}
