import { useState } from 'react'
import Input from './Input'
import Display from './Display.jsx'
import './App.css'

function App() {
  const [showInputs, setShowInputs] = useState(true);
  const [formData, setFormData] = useState(false)

  return (
    <>
      {showInputs &&
        <form onSubmit={(event) => { event.preventDefault(); setFormData(new FormData(event.target)); setShowInputs(false) }}>
          <Input />
          <button type="submit">Submit</button>
        </form>
      }

      {!showInputs && <div>
        <button onClick={() => { setShowInputs(true) }}>Edit</button>
        <Display formData={formData} />
      </div>
      }
    </>

  )
}

export default App
