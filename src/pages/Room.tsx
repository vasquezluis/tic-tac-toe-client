import { useEffect } from 'react'

import Board from '../components/Board'
import Turn from '../components/Turn'
import Winner from '../components/Winner'

import { useResetGame, useUpdateBoard } from '../hooks/board'
import { useRoomSocketEvents } from '../hooks/socket'

import { useRoomStore } from '../lib/stores/room.store'
import { useNavigate } from 'react-router-dom'

function Room() {
	const { handleResetGame, resetGameLocal } = useResetGame()
	const { updateBoard } = useUpdateBoard()
	const { sendValueToServer } = useRoomSocketEvents({
		updateBoard,
		resetGameLocal,
	})

	const roomId = useRoomStore((state) => state.id)
	const navigate = useNavigate()

	useEffect(() => {
		if (roomId === '') {
			navigate('/')
		}
	}, [])

	return (
		<main className='flex h-screen w-full flex-col items-center justify-center bg-neutral-800'>
			<h1 className='text-3xl font-bold text-white'>TIC TAC TOE</h1>
			<span className='text-white'>room id: {roomId}</span>

			<button
				className='m-3 rounded-md border border-neutral-500 px-3 py-2 font-bold text-neutral-300 transition-all hover:border-white hover:bg-neutral-950 hover:text-white'
				onClick={handleResetGame}
			>
				Reset game
			</button>

			<Turn />

			<Board updateBoard={updateBoard} sendValueToServer={sendValueToServer} />

			<Winner resetGame={handleResetGame} />
		</main>
	)
}

export default Room
