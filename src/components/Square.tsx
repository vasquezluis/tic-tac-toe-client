import { cn } from '../lib/utils'
import { type SquareProps } from '../types'
import { TURNS } from '../lib/constants'

const Square = ({
	children,
	isSelected,
	updateBoard,
	index,
	isInBoard,
	turn,
	isWinner,
}: SquareProps) => {
	const className = `${cn(
		'w-[100px] h-[100px] grid place-items-center text-white rounded-md border border-neutral-300',
		{
			'bg-sky-500': isSelected && turn === TURNS.O,
			'bg-green-500': isSelected && turn === TURNS.X,
			'bg-sky-500/80': isInBoard && turn === TURNS.O,
			'bg-green-500/80': isInBoard && turn === TURNS.X,
			'cursor-pointer': isInBoard && turn !== TURNS.X && turn !== TURNS.O,
			'bg-yellow-500 border-2 border-yellow-600': isWinner,
		}
	)}`

	const handleClick = () => {
		if (updateBoard !== undefined && index !== undefined) {
			updateBoard(index)
		}

		return
	}

	return (
		<div className={className} onClick={handleClick}>
			{children}
		</div>
	)
}

export default Square
