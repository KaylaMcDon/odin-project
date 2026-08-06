import { useState } from 'react'
import Input from './Input'
import Display from './Display.jsx'
import './App.css'

function App() {
  const [showInputs, setShowInputs] = useState(true);
  const [formData, setFormData] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>CV Creator</h1>
        <p className="app-subtitle">Fill in your details to build a clean, shareable resume.</p>
      </header>

      {showInputs &&
        <form
          className="cv-form"
          onSubmit={(event) => { event.preventDefault(); setFormData(new FormData(event.target)); setShowInputs(false) }}
        >
          <Input />
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      }

      {!showInputs && <div className="cv-result">
        <div className="cv-result-actions">
          <button className="btn btn-secondary" onClick={() => { setShowInputs(true) }}>Edit</button>
        </div>
        <Display formData={formData} />
      </div>
      }
    </div>

  )
}

export default App
