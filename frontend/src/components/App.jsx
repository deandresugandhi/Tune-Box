import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChordTranslator from './ChordTranslator'
import Home from './Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/chord-translator" element={<ChordTranslator />} />
          <Route path="*" element={<h3>Page Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
