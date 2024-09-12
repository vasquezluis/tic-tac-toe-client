import Square from './Square'

const Winner = ({
	winner,
	resetGame,
}: {
	winner: string | null | boolean
	resetGame: () => void
}) => {
	if (winner === null) return null

	const winnerText = winner === false ? 'Empate' : 'Ganador'

	return (
		<section className='absolute left-0 top-0 grid h-screen w-full place-items-center bg-black/80'>
			<div className='flex h-[300px] w-[320px] flex-col items-center justify-center gap-5 rounded-md border bg-neutral-900 text-xl font-semibold text-white'>
				<h2 className='font-bold'>🎉 {winnerText} 🎉</h2>

				<header className='mx-auto my-0 flex w-fit gap-4 rounded-md'>
					{winner && typeof winner === 'string' && (
						<Square isInBoard={false} turn={winner} isWinner={true}>
							{winner}
						</Square>
					)}
				</header>

				<footer>
					<button
						className='rounded-md border bg-neutral-800 px-3 py-2 hover:bg-neutral-700'
						onClick={resetGame}
					>
						Empezar de nuevo
					</button>
				</footer>
			</div>
		</section>
	)
}

export default Winner
