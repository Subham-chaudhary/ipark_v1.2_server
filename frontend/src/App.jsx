import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginSignupForm from './components/LoginSignupForm'
import Graph from './components/Graph';
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginSignupForm />
  },
  {
    path: '/homepage',
    element: <HomePage />
  },
  {
    path:'/graph',
    element: <Graph />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
