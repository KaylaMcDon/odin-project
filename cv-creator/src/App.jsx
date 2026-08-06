import { useState } from 'react'
import Input from './Input'
import Display from './Display.jsx'
import './App.css'

function App() {
  const [showInputs, setShowInputs] = useState(true);
  const [formData, setFormData] = useState(false)

  return (
    <>
    <form onSubmit={(event) => {event.preventDefault(); setFormData(new FormData(event.target))}}>
      <Input />
      <button>Submit</button>
    </form>
    
    <Display formData={formData}/>
    </>
    
  )
}

export default App
