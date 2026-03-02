import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600">
        Netflix Clone
      </h1>
    </div>
    </>
  )
}

export default App
