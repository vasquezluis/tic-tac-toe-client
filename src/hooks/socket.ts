import { FormEvent, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import {
	ISocketData,
	TErrorSocketData,
	type SocketValueProps,
	type UseSocketProps,
} from '../types'
import { successToast, errorToast } from '../components/Loaders'
import { useNavigate } from 'react-router-dom'
import { useRoomStore } from '../lib/stores/room.store'
import { usePlayerStore } from '../lib/stores/player.store'
import { TURNS } from '../lib/constants'

const socket: Socket = io('')

export const useRoomSocketEvents = ({
	updateBoard,
	resetGameLocal,
}: UseSocketProps) => {
	const sendValueToServer = ({ index, value }: SocketValueProps) => {
		socket.emit('board', { index, value })
	}

	useEffect(() => {
		socket.on('player', (data) => {
			successToast(`Player ${data.player} joined`)
		})

		socket.on('board', (data) => {
			const { index, value } = data.body

			updateBoard({ index, value })
		})

		socket.on('resetGame', () => {
			resetGameLocal()
		})

		return () => {
			socket.off('player')
			socket.off('resetGame')
			socket.off('board')
		}
	}, [socket])

	return { sendValueToServer }
}

export const useHomeSocketEvents = (roomCode: string) => {
	const setRoomData = useRoomStore.getState().setRoomData
	const navigate = useNavigate()

	const handleCreateRoom = () => {
		socket.emit('createRoom')

		const setPlayerData = usePlayerStore.getState().setPlayerData
		setPlayerData({ player: TURNS.X })
	}

	const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		socket.emit('joinRoom', roomCode)

		const setPlayerData = usePlayerStore.getState().setPlayerData
		setPlayerData({ player: TURNS.O })
	}

	useEffect(() => {
		const handleRoomCreated = (data: ISocketData) => {
			successToast(`Room ${data.roomCode} created`)
			setRoomData(data.roomCode)
			navigate('/room')
		}

		const handleRoomJoined = (data: ISocketData) => {
			console.log(`Room entered: ${data.roomCode} Player: ${data.player}`)
			successToast(`Joined room ${data.roomCode}`)
			setRoomData(data.roomCode)
			navigate('/room')
		}

		const handleError = (data: TErrorSocketData) => {
			console.error(`error: ${data.message}`)
			errorToast(data.message)
		}

		socket.on('roomCreated', handleRoomCreated)
		socket.on('roomJoined', handleRoomJoined)
		socket.on('error', handleError)

		return () => {
			socket.off('roomCreated', handleRoomCreated)
			socket.off('roomJoined', handleRoomJoined)
			socket.off('error', handleError)
		}
	}, [socket])

	return { handleCreateRoom, handleJoinRoom }
}

export const getSocketInstance = () => {
	return { socket }
}
