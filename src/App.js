import React, { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const handleAsk = async () => {
    if (!query) {
      setResult("Please enter a question");
      return;
    }

    try {
      const res = await axios.post(
        "https://ai-dashboard-backend-wa6t.onrender.com/ask",
        { query }
      );
      setResult(res.data.answer);
    } catch (error) {
      setResult("Server error. Check backend.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Dashboard</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something..."
        style={{ padding: 10, width: 250 }}
      />

      <br /><br />

      <button onClick={handleAsk} style={{ padding: 10 }}>
        Ask
      </button>

      <br /><br />

      <p><b>Result:</b> {result}</p>
    </div>
  );
}

export default App;