import { useState, useEffect } from 'react'

import { io, Socket } from 'socket.io-client'
const socket: Socket = io('')
import { type SocketValueProps } from './types'

import Board from './components/Board'
import Turn from './components/Turn'
import Winner from './components/Winner'

import { useBoard, useResetGame, useUpdateBoard } from './hooks/board'
import { useTurn } from './hooks/turn'

function App() {
	const [turn, setTurn] = useTurn()
	const [winner, setWinner] = useState<string | null | boolean>(null)
	const [board, setBoard] = useBoard()
	const { updateBoard } = useUpdateBoard({
		board,
		turn,
		setBoard,
		setTurn,
		setWinner,
		winner,
	})

	const resetGame = useResetGame({ setBoard, setTurn, setWinner })

	const sendValueToServer = ({ index, value }: SocketValueProps) => {
		socket.emit('value', { index, value })
	}

	useEffect(() => {
		socket.on('value', (data) => {
			const { index, value } = data.body

			updateBoard({ index, value })
		})

		return () => {
			socket.off('value')
		}
	}, [])

	return (
		<main className='flex h-screen w-full flex-col items-center justify-center bg-neutral-800'>
			<h1 className='text-3xl font-bold text-white'>TIC TAC TOE</h1>

			<button
				className='m-3 rounded-md border border-neutral-500 px-3 py-2 font-bold text-neutral-300 transition-all hover:border-white hover:bg-neutral-950 hover:text-white'
				onClick={resetGame}
			>
				Resetear juego
			</button>

			<Turn turn={turn} />

			<Board
				board={board}
				updateBoard={updateBoard}
				sendValueToServer={sendValueToServer}
				turn={turn}
			/>

			<Winner resetGame={resetGame} winner={winner} />
		</main>
	)
}

export default App
