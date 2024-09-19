import { useState } from 'react'
import { useHomeSocketEvents } from '../hooks/socket'

const Home = () => {
	const [roomCode, setRoomCode] = useState<string>('')
	const { handleCreateRoom, handleJoinRoom } = useHomeSocketEvents(roomCode)

	return (
		<main className='flex min-h-screen w-full items-center justify-center bg-neutral-800'>
			<section className='flex flex-col gap-y-3'>
				<button
					className='custom-button shadow-md shadow-black'
					onClick={handleCreateRoom}
				>
					Create new room
				</button>

				<form
					onSubmit={handleJoinRoom}
					className='flex flex-col items-center justify-center gap-y-2 rounded-md bg-neutral-700 p-2 shadow-md shadow-black'
				>
					<h2 className='text-white'>Enter room</h2>
					<input
						className='rounded-md px-2 py-1 text-black outline-none'
						type='text'
						onChange={(e) => {
							setRoomCode(e.target.value)
						}}
						placeholder='095dfa'
					/>
					<button className='rounded-md bg-neutral-500 px-2 py-1 text-white hover:bg-neutral-800'>
						Entrar
					</button>
				</form>
			</section>
		</main>
	)
}

export default Home
