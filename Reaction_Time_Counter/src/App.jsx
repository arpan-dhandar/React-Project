import { useState } from 'react'

const App = () => {
const [status, setStatus] = useState('idle')
const [startTime, setStartTime] = useState(null)
const [reactionTime, setReactionTime] = useState(null)

  return (
    <div>
      { status === 'idle' && (
        <div>
          <h1>Reaction Speed Time</h1>
          <button onClick={()=> setStatus(countdown)}>Start Code</button>
        </div>
      )}
    </div>
  )
}

export default App