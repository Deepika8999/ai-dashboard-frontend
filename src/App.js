<<<<<<< HEAD
/* eslint-disable no-unused-vars */
=======
>>>>>>> 269d14a3f903540b733886958e2f2c42dccb62b2
import React, { useState } from "react";
import axios from "axios";
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("bar");

<<<<<<< HEAD
  const BASE_URL = "https://ai-dashboard-backend-wa6t.onrender.com";
=======
  const BASE_URL = "http://localhost:5000";
>>>>>>> 269d14a3f903540b733886958e2f2c42dccb62b2

  // ================= UPLOAD =================
  const handleUpload = async () => {
    if (!file) return alert("Select file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${BASE_URL}/upload`, formData);
      setData(res.data);
    } catch (err) {
      alert("Upload failed");
    }
  };

  // ================= AI =================
  const handleAsk = async (customQuery) => {
    const finalQuery = customQuery || query;

    if (!data || data.length === 0) {
      return alert("Upload data first");
    }

    if (!finalQuery) return;

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post(`${BASE_URL}/ask-ai`, {
        query: finalQuery,
        data,
      });

      setResult(res.data.answer);
    } catch (err) {
      setResult(err.response?.data?.answer || "Error getting AI response");
    }

    setLoading(false);
  };

  // ================= DYNAMIC KEYS =================
  const keys = data.length > 0 ? Object.keys(data[0]) : [];
  const xKey = keys[0];
  const yKey = keys[1];

  return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg,#4f46e5,#9333ea)",
    padding: "30px",
    fontFamily: "Arial"
  }}>
    <div style={{ maxWidth: "900px", margin: "auto" }}>

      <h1 style={{
        textAlign: "center",
        color: "#fff",
        fontSize: "36px",
        fontWeight: "bold"
      }}>
        AI Data Dashboard
      </h1>

      {/* Upload */}
      <div style={card}>
        <h3>Upload CSV</h3>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button style={btnPrimary} onClick={handleUpload}>Upload</button>
      </div>

      {/* Table */}
      {data.length > 0 && (
        <div style={card}>
          <h3>Data Table</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((k) => (
                  <th key={k} style={thtd}>{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((v, j) => (
                    <td key={j} style={thtd}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart */}
      {data.length > 0 && (
        <div style={card}>
          <h3>Chart</h3>
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="age" fill="#4f46e5" />
          </BarChart>
        </div>
      )}

      {/* AI */}
      <div style={card}>
        <h3>Ask AI</h3>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
          style={input}
        />

        <button style={btnSuccess} onClick={handleAsk}>
          Ask
        </button>

        {/* Suggestions */}
        <div style={{ marginTop: "10px" }}>
          <p>Try:</p>
          <ul style={{ cursor: "pointer", color: "#4f46e5" }}>
            <li onClick={() => setQuery("Who is the oldest?")}>Who is the oldest?</li>
            <li onClick={() => setQuery("Who is the youngest?")}>Who is the youngest?</li>
            <li onClick={() => setQuery("Average age")}>Average age</li>
            <li onClick={() => setQuery("Total records")}>Total records</li>
          </ul>
        </div>

        <p style={{ marginTop: "10px", fontWeight: "bold", color: "green" }}>
          {result}
        </p>
      </div>

    </div>
  </div>
);
    
}

/* STYLES */

const mainStyle = {
  minHeight: "100vh",
  fontFamily: "Arial",
  background: "linear-gradient(135deg, #667eea, #764ba2)",
  padding: "40px 20px",
};

const titleStyle = {
  textAlign: "center",
  color: "#fff",
  fontSize: "36px",
};

const subtitleStyle = {
  textAlign: "center",
  color: "#e0e7ff",
  marginBottom: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thtd = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

const btnPrimary = {
  marginLeft: "10px",
  padding: "8px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
};

const btnDanger = {
  marginLeft: "10px",
  padding: "8px",
  background: "#ef4444",
  color: "#fff",
  border: "none",
};

const btnSuccess = {
  marginLeft: "10px",
  padding: "8px",
  background: "#10b981",
  color: "#fff",
  border: "none",
};

const inputStyle = {
  padding: "8px",
  border: "1px solid #ccc",
};

const suggestionStyle = {
  marginTop: "10px",
  cursor: "pointer",
  color: "#4f46e5",
};

const resultBox = {
  marginTop: "10px",
  background: "#dcfce7",
  padding: "10px",
  borderRadius: "8px",
};
const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};
const input = {
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};
export default App;