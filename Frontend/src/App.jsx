import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//importing components
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Jobs from './components/Jobs/Jobs.jsx'
import Browse from './components/Browse/Browse.jsx'
import Profile from './components/Profile/Profile.jsx'
import JobDescription from './components/JobDescription/JobDescription.jsx'


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
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/job/:jobId",
    element:<JobDescription/>
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
