import Square from './Square'
import { TURNS } from '../lib/constants'

type Props = {
	turn: string
}

const Turn = ({ turn }: Props) => {
	return (
		<section className='relative mx-auto my-4 flex w-fit flex-col justify-center gap-1 rounded-lg'>
			<div className='flex items-center justify-center font-bold'>
				<span className='text-white'>TURN</span>
			</div>
			<div className='flex flex-row gap-x-1'>
				<Square isSelected={turn === TURNS.X} isInBoard={false} turn={TURNS.X}>
					<span className='text-xl font-bold'>{TURNS.X}</span>
				</Square>
				<Square isSelected={turn === TURNS.O} isInBoard={false} turn={TURNS.O}>
					<span className='text-xl font-bold'>{TURNS.O}</span>
				</Square>
			</div>
		</section>
	)
}

export default Turn
