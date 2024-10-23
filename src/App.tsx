import { useState } from 'react'
import './App.css'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Signup/>
      <Login/>
    </div>
  )
}

export default App
