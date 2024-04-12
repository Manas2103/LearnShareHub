import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import RightBar from './components/Home/RightBar.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Container from './Container/Container.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div>
      <AuthProvider>
        <Header/>
        <Container child={<Outlet/>}/>
        <Footer/>
      </AuthProvider>
    </div>
  )
}

export default App
