export type TurnProps = {
	turn: string
}

export type BoardValue = string | null

export type SocketProps = {
	index: number
	value: string
}

export type BoardProps = {
	board: Value[]
	turn: string
	updateBoard: (SocketProps) => void
	sendValueToServer: (SocketValueProps) => void
}

export type SquareProps = {
	children: ReactNode
	isSelected?: boolean
	turn: string
	isWinner?: boolean
}

export type SquareBoardProps = {
	children: ReactNode
	updateBoard: ({ index, value }: SocketValueProps) => void
	index: number
	turn: string
	turnInBoard: string
	sendValueToServer: ({ index, value }: SocketValueProps) => void
}

export type ResetGameProps = {
	setBoard: React.Dispatch<React.SetStateAction<Array<string | null>>>
	setTurn: React.Dispatch<React.SetStateAction<string>>
	setWinner: React.Dispatch<React.SetStateAction<string | boolean | null>>
}

export type WinnerProps = {
	winner: string | null | boolean
	resetGame: () => void
}

export type SocketValueProps = {
	index: number
	value: string
}

export type UseSocketReturn = {
	value?: SocketValueProps
	sendValue: ({ index, value }: SocketValueProps) => void
}

export type UpdateBoardProps = {
	board: Array<string | null>
	turn: string
	setBoard: React.Dispatch<React.SetStateAction<Array<string | null>>>
	setTurn: (turn: string) => void
	setWinner: (winner: string | false | null) => void
	winner: string | null | boolean
}
