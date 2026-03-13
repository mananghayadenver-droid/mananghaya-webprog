import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="App-header">\
      <header className="App-header">
        <h1>Welcome to My React App!</h1>
        <p>
          Name: [Denver Mananghaya]<br />
          Email: [Your Email]<br />
          Other Personel Info:<br />
          <a href="https://github.com/mananghayadenver-droid/mananghaya-webprog">https://github.com/mananghayadenver-droid/mananghaya-webprog</a>
        </p>
      </header>
    </div>

    </>
  )
}

export default App
