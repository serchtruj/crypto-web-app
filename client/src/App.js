import './App.css';
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get(`/api/v1`)
      .then(res => console.log(res.data))
  }, [])
  return (
    <div className="App">
      <h1>Crypto web app</h1>
    </div>
  );
}

export default App;
