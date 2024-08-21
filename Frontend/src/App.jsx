import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//importing components
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Jobs/Jobs.jsx'
import Browse from './components/Browse/Browse.jsx'



const appRouter = createBrowserRouter([
 {
  path: '/',
  element: <Home/>
 },
  {
    path : '/signup',
    element: <Signup/>
  },
  {
    path : "/login",
    element : <Login/>
  },
  {
    path:"/jobs",
    element : <Jobs/>
  },
  {
    path:"/browse",
    element : <Browse/>
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
