// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Home from './pages/Home'
import About from './pages/About'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
import Signup, { loader as signupLoader, action as signupAction } from './pages/Signup'
import Logout, { loader as logoutLoader } from './pages/Logout'
import Town2 from './pages/town2/Town2'
import Profile, { action as profileAction } from './pages/town2/Profile'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import TownLayout from './components/TownLayout'
import Error from './components/Error'
// import { UserContext } from './context/UserContext'

import { checkAuth } from './utils'

import { 
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
  Route, 
} from 'react-router-dom'


const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path="/" element={<Layout/>} errorElement={<Error/>}>
      <Route index element={<Home/>}/>
      <Route path="about" element={<About />} />
      <Route 
        path="login" 
        element={<Login />} 
        loader={loginLoader}
        action={loginAction} 
      />
      <Route 
        path="signup"
        element={<Signup />} 
        loader={signupLoader} 
        action={signupAction} 
      />
      <Route 
        path="logout"
        element={<Logout />} 
        loader={logoutLoader} 
      />
      <Route path="*" element={<NotFound />}/>
    </Route>
    <Route 
      path="town2" 
      element={<TownLayout />} 
      loader={async ({ request }) => {
        await checkAuth(request)
        return null
      }}
      errorElement={<Error/>}
    >
      <Route index element={<Town2/>}/>
      <Route 
        path="profile" 
        element={<Profile/>}
        action={profileAction}
      />
    </Route>
  </Route>
))

function App() {
    
  return (
    <RouterProvider router={router}/>
  )
}

export default App
