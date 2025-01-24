import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Home'
import Dashboard from './pages/Dashboard'
import CoinPage from './pages/Coin'
import ComparePage from './pages/ComparePage'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/coin/:id' element={<CoinPage />} />
          <Route path="/compare" element={<ComparePage />} />
          {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
