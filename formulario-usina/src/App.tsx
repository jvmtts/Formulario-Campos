import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpedicaoLanding from './pages/ExpedicaoLanding'
import ExpedicaoForm from './pages/ExpedicaoForm'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpedicaoLanding />} />
        <Route path="/inscricao" element={<ExpedicaoForm />} />
      </Routes>
    </BrowserRouter>
  )
}