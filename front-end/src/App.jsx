import LoginPage from './Pages/Login'
import RfidLogs from './Pages/RfidLogs'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/logs" element={<RfidLogs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
