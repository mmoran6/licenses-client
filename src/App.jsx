import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/NavBar'
import AppRoutes from './routes/AppRoutes'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/Footer/Footer';

function App() {
 
  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App
