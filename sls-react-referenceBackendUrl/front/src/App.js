import React, { useEffect, useState} from 'react'
import './App.css'

function App() {
  const [data, updateData] = useState({ data: 'loading' })

  useEffect(() => { 
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + '/')
      .then(x => x.json())
      .then(x => { 
          updateData(x)
      })
      .catch(e => { 
          updateData({data: 'error'})
      })
  }, [])


  return (
    <div className="App">
      <p>{JSON.stringify(data.data)}</p>
    </div>
  );
}

export default App
