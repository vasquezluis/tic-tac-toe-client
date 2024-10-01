import { create } from 'zustand'
import { type IPlayerStore } from '../../types'

const initialValues = {
	player: '',
}

export const usePlayerStore = create<IPlayerStore>((set) => ({
	...initialValues,
	setPlayerData: ({ player }) => {
		set({
			player,
		})
	},
}))
