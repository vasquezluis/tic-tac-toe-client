import { useState, useEffect } from 'react'

import Board from '../components/Board'
import Turn from '../components/Turn'
import Winner from '../components/Winner'

import { useBoard, useResetGame, useUpdateBoard } from '../hooks/board'
import { useRoomSocketEvents } from '../hooks/socket'
import { useTurn } from '../hooks/turn'

import { useRoomStore } from '../lib/stores/room.store'
import { useNavigate } from 'react-router-dom'

function Room() {
	const [winner, setWinner] = useState<string | null | boolean>(null)
	const [turn, setTurn] = useTurn()
	const [board, setBoard] = useBoard()
	const { handleResetGame, resetGameLocal } = useResetGame({
		setBoard,
		setTurn,
		setWinner,
	})
	const { updateBoard } = useUpdateBoard({
		board,
		setBoard,
		setTurn,
		setWinner,
		winner,
	})
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

			<Turn turn={turn} />

			<Board
				board={board}
				updateBoard={updateBoard}
				sendValueToServer={sendValueToServer}
				turn={turn}
			/>

			<Winner resetGame={handleResetGame} winner={winner} />
		</main>
	)
}

export default Room
