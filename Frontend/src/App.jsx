
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//importing components
import Home from './components/Home/Home.jsx'
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'



const appRouter = createBrowserRouter([
  {
    path : '/',
    element:<Home/>
  },
  {
    path : '/signup',
    element: <Signup/>
  },
  {
    path : "/login",
    element : <Login/>
  }
])



function App() {

  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
