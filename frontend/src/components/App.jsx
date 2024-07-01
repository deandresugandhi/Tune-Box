import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NumberToNotation from './NumberToNotation'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/number-notation" element={<NumberToNotation />} />
          <Route path="*" element={<h3>Page Not Found</h3>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
