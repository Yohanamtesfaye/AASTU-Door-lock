import { useState } from 'react'
import './App.css'
import RfidLogs from './Pages/RfidLogs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RfidLogs />
    </>
  )
}

export default App
