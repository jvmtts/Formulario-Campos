import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpedicaoForm from './pages/ExpedicaoForm'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpedicaoForm />} />
        <Route path="/inscricao" element={<ExpedicaoForm />} />
      </Routes>
    </BrowserRouter>
  )
}