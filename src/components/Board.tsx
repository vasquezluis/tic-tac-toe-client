import { type BoardProps } from '../types'
import { SquareBoard } from './Square'
import { useBoardStore } from '../lib/stores/board.store'

const Board = ({ updateBoard, sendValueToServer }: BoardProps) => {
	const board = useBoardStore((state) => state.board)

	return (
		<section className='grid grid-cols-3 gap-1'>
			{board.map((_, index) => {
				return (
					<SquareBoard
						key={index}
						index={index}
						updateBoard={updateBoard}
						turnInBoard={board[index]}
						sendValueToServer={sendValueToServer}
					>
						<span>{board[index]}</span>
					</SquareBoard>
				)
			})}
		</section>
	)
}

export default Board
