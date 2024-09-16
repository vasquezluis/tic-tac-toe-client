import { useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { type SocketValueProps, type UseSocketProps } from '../types'

const socket: Socket = io('')

export const useSocket = ({ updateBoard }: UseSocketProps) => {
	const sendValueToServer = ({ index, value, player }: SocketValueProps) => {
		socket.emit('board', { index, value, player })
	}

	useEffect(() => {
		socket.on('board', (data) => {
			const { index, value, player } = data.body

			updateBoard({ index, value, player })
		})

		return () => {
			socket.off('board')
		}
	}, [])

	return { sendValueToServer }
}
