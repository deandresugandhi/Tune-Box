import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChordTranslator from './ChordTranslator'
import ChordTransposer from './ChordTransposer'
import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import InstantTranslate from './InstantTranslate'
import InstantTranspose from './InstantTranspose'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools/chord-translator" element={<ChordTranslator />} />
          <Route path="/tools/chord-transposer" element={<ChordTransposer />} />
          <Route path="/tools/instant-translate" element={<InstantTranslate />} />
          <Route path="/tools/instant-transpose" element={<InstantTranspose />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
