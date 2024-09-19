import { create } from 'zustand'
import { type IUserStore } from '../../types'

const initialValues = {
	id: '',
	name: '',
}

export const useUserStore = create<IUserStore>((set) => ({
	...initialValues,
	setUserData: ({ id, name }) => {
		set({
			id,
			name,
		})
	},
}))
