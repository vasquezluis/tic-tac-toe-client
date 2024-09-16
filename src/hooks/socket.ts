// import { useState, useEffect } from 'react'
// import { io, Socket } from 'socket.io-client'
// import { type SocketValueProps, type UseSocketReturn } from '../types'

// const socket: Socket = io('')

// export const useSocket = (): UseSocketReturn => {
// 	const [value, setValue] = useState<SocketValueProps | undefined>(undefined)

// 	const sendValue = ({ index, value }: SocketValueProps) => {
// 		socket.emit('value', { index, value })
// 	}

// 	useEffect(() => {
// 		socket.on('value', (data) => {
// 			console.log('value: ', data)
// 			setValue(data)
// 		})

// 		return () => {
// 			socket.off('value')
// 		}
// 	}, [])

// 	return { value, sendValue }
// }
