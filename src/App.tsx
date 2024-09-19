import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToasterComponent } from './components/Loaders'

import Home from './pages/Home'
import Room from './pages/Room'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/room',
		element: <Room />,
	},
])

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<ToasterComponent />
		</>
	)
}

export default App
