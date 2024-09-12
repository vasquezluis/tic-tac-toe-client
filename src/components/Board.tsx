import { type BoardProps } from '../types'
import Square from './Square'

const Board = ({ board, updateBoard }: BoardProps) => {
	return (
		<section className='grid grid-cols-3 gap-1'>
			{board.map((_, index) => {
				return (
					<Square key={index} index={index} updateBoard={updateBoard}>
						<span>{board[index]}</span>
					</Square>
				)
			})}
		</section>
	)
}

export default Board
