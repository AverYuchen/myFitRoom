import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'antd';
import { Sparkles, Wand2 } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import myLogo from './assets/myFitRoomLogo_250.png'

// other pages
// import GenerateClothes from './pages/GenerateClothes'
// import VirtualRoom from './pages/VirtualRoom'

function Home() {
  const navigate = useNavigate()
  
  return (
    <div className="app">
      <header className="header">
        <div className="logo-section">
          <img src={myLogo} alt="MyFitRoom Logo" className="header-logo" />
          <span className="title">MyFitRoom</span>
        </div>
      </header>
      
      <main className="main-content">
        <div className="button-container">
          <Button
            type="primary"
            size="large"
            className="nav-button"
            onClick={() => navigate('/generate-clothes')}
          >
            Generate my clothes
            <Wand2 className="button-icon" size={20} />
          </Button>
          
          <Button
            type="primary"  
            size="large"
            className="nav-button"
            onClick={() => navigate('/virtual-room')}
          >
            Enter my fitting room
            <Sparkles className="button-icon" size={20} />
          </Button>
        </div>
      </main>
    </div>
  )
}

// temporary page components
function GenerateClothes() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Generate Clothes Page</h1>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  )
}

function VirtualRoom() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Virtual Room Page</h1>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  )
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-clothes" element={<GenerateClothes />} />
        <Route path='/virtual-room' element={<VirtualRoom />} />
      </Routes>
    </Router>
  )
  
}

export default App
