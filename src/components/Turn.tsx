import Square from './Square'
import { TURNS } from '../lib/constants'

type Props = {
	turn: string
}

const Turn = ({ turn }: Props) => {
	return (
		<section className='relative mx-auto my-4 flex w-fit justify-center rounded-lg'>
			<Square isSelected={turn === TURNS.X}>
				<span className='text-xl font-bold'>{TURNS.X}</span>
			</Square>
			<Square isSelected={turn === TURNS.O}>
				<span className='text-xl font-bold'>{TURNS.O}</span>
			</Square>
		</section>
	)
}

export default Turn
