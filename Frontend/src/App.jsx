import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//importing components
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'



const appRouter = createBrowserRouter([
 
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
