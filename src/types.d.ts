export type BoardValue = string | null

export type BoardProps = {
	board: Value[]
	updateBoard: (index: number) => void
}

export type SquareProps = {
	children: ReactNode
	isSelected?: boolean
	updateBoard?: (index: number) => void
	index?: number
	isInBoard: boolean
	turn: string
	isWinner?: boolean
}
