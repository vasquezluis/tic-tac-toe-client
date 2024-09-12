import { cn } from '../lib/utils'
import { type SquareProps } from '../types'

const Square = ({ children, isSelected, updateBoard, index }: SquareProps) => {
	const className = `${cn(
		'w-[100px] h-[100px] border border-neutral-300 rounded-sm grid place-items-center',
		{
			'text-white bg-sky-500': isSelected,
			'text-neutral-300 bg-neutral-800 hover:bg-sky-500/70 cursor-pointer':
				!isSelected,
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
