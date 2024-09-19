import { create } from 'zustand'
import { type IRoomStore } from '../../types'

const initialValues = {
	id: '',
}

export const useRoomStore = create<IRoomStore>((set) => ({
	...initialValues,
	setRoomData: (id) => {
		set({
			id,
		})
	},
}))
