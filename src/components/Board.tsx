import { type BoardProps } from '../types'
import { SquareBoard } from './Square'

const Board = ({ board, updateBoard, sendValueToServer, turn }: BoardProps) => {
	return (
		<section className='grid grid-cols-3 gap-1'>
			{board.map((_, index) => {
				return (
					<SquareBoard
						key={index}
						index={index}
						updateBoard={updateBoard}
						turn={turn}
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
