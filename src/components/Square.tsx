import { cn } from '../lib/utils'
import { type SquareProps, type SquareBoardProps } from '../types'
import { TURNS } from '../lib/constants'
import { useBoardStore } from '../lib/stores/board.store'

export const Square = ({
	children,
	isSelected,
	turn,
	isWinner,
}: SquareProps) => {
	const className = `${cn(
		'w-[100px] h-[100px] grid place-items-center text-white rounded-md border border-neutral-300',
		{
			'bg-sky-500 pointer-events-none cursor-not-allowed':
				isSelected && turn === TURNS.O,
			'bg-green-500 pointer-events-none cursor-not-allowed':
				isSelected && turn === TURNS.X,
			'bg-yellow-500 border-2 border-yellow-600': isWinner,
		}
	)}`

	return <div className={className}>{children}</div>
}

export const SquareBoard = ({
	children,
	updateBoard,
	index,
	turnInBoard,
	sendValueToServer,
}: SquareBoardProps) => {
	const turn = useBoardStore((state) => state.turn)

	const className = `${cn(
		'w-[100px] h-[100px] grid place-items-center text-white rounded-md border border-neutral-300 cursor-pointer',
		{
			'bg-sky-500/80': turnInBoard === TURNS.O,
			'bg-green-500/80': turnInBoard === TURNS.X,
		}
	)}`

	const board = useBoardStore((state) => state.board)

	const handleClick = () => {
		if (board[index]) return

		// send value to server
		sendValueToServer({
			index,
			value: turn,
		})
		updateBoard({ index, value: turn })
	}

	return (
		<div className={className} onClick={handleClick}>
			{children}
		</div>
	)
}
