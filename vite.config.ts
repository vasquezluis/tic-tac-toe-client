import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/socket.io': {
				target: 'https://tic-tac-toe-server-ao4x.onrender.com',
				ws: true,
				changeOrigin: true,
				secure: false,
			},
		},
	},
})
