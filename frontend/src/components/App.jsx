import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChordTranslator from './ChordTranslator'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/chord-translator" element={<ChordTranslator />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
