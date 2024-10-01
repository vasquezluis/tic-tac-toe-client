export type TurnProps = {
	turn: string
}

export type BoardValue = string | null

export type BoardProps = {
	board: Array<string | null>
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
	turnInBoard: string | null
	sendValueToServer: ({ index, value }: SocketValueProps) => void
}

export type ResetGameProps = {
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

export type UseSocketProps = {
	updateBoard: ({ index, value }: { index: number; value: string }) => void
	resetGameLocal: () => void
}

export type UpdateBoardProps = {
	setWinner: (winner: string | false | null) => void
	winner: string | null | boolean
}

type userData = {
	id: string
	name: string
}

export interface IRoomStore {
	id: string
	setRoomData: (id: string) => void
}

export interface IUserStore {
	id: string
	name: string
	setUserData: (data: userData) => void
}

export interface ISocketData {
	roomCode: string
	player: number
}

export type TErrorSocketData = {
	message: string
}

export interface IBoardStore {
	board: Array<string | null>
	turn: string
	setBoard: (board: Array<string | null>) => void
	setTurn: (turn: string) => void
	changeIndexValue: ({
		index,
		value,
	}: {
		index: number
		value: string | null
	}) => void
}
