import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginSignupForm from './components/LoginSignupForm'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginSignupForm />
  },
  {
    path: '/',
    element: <HomePage />
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
