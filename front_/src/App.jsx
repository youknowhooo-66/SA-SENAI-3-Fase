import './App.css'

function App() {

    const handleSend = async () => {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.text);
  };
  
  return (
    <>
  
    </>
  )
}

export default App
