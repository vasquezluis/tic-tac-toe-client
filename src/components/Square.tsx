import { cn } from '../lib/utils'
import { type SquareProps, type SquareBoardProps } from '../types'
import { TURNS } from '../lib/constants'
import { useBoardStore } from '../lib/stores/board.store'
import { usePlayerStore } from '../lib/stores/player.store'

export const Square = ({
	children,
	isSelected,
	turn,
	isWinner,
}: SquareProps) => {
	const className = `${cn(
		'w-[100px] h-[100px] grid place-items-center text-white rounded-md border border-neutral-300',
		{
			'bg-sky-500': isSelected && turn === TURNS.O,
			'bg-green-500': isSelected && turn === TURNS.X,
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
	const player = usePlayerStore((state) => state.player)

	const className = `${cn(
		'w-[100px] h-[100px] grid place-items-center text-white rounded-md border border-neutral-300 cursor-pointer',
		{
			'bg-sky-500/80 pointer-events-none': turnInBoard === TURNS.O,
			'bg-green-500/80 pointer-events-none': turnInBoard === TURNS.X,
			'bg-none pointer-events-none': player !== turn,
		}
	)}`

	const board = useBoardStore((state) => state.board)

	const handleClick = () => {
		if (board[index] || player !== turn) return

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
